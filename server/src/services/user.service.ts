// core reusable services for user operations
import usersModels from "../models/users.models.ts";
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/jwt.ts';
import { CustomError } from '../utils/errors.utils.ts';
import { paginate } from "../utils/pagination.utils.ts";
import { sendResponse } from "../utils/response.utils.ts";



export const register = async(userData:any) => {
    const{email, phoneNumber,password, ...profileData}= userData;

    //check if the user already exists

    const existingUser = await usersModels.findOne({$or: [{email}, {phoneNumber}]});
    if(existingUser){
        throw new CustomError(400, 'User with this email or phone number already exists');
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //create the user
    const user = new usersModels({
        email,
        phoneNumber,
        passwordHash,
        profile: profileData.profile,
        crops: profileData.crops || [],
        preferences: profileData.preferences || {},
        metadata: {
        registrationDate: new Date(),
        accountStatus: 'active', // Or 'pending' if verification needed
        verificationStatus: { phone: false, email: false },
        },
    });
    await user.save();

    //generate token
    const token = generateToken({_id: user._id, email: user.email});
    return {user:user.toObject({versionKey: false,}), token};

}


export const login = async(emailOrPhone:string, password:string) => {
    //find the user by email or phone number
    const user = await usersModels.findOne({
        $or: [
            {email: emailOrPhone}, 
            {phoneNumber: emailOrPhone}
        ]
    })

    if(!user){
        throw new CustomError(401, 'Invalid email/phone number or password');
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
        throw new CustomError(401,'Invalid email/phone number or password');
    }

    //update last login
    user.metadata.lastLogin = new Date();
    await user.save();  

    //generate token
    const token = generateToken({_id: user._id, email: user.email});
    return {user:user.toObject({versionKey: false,}), token};
}

export const getUserById = async (userId: string) => {
  const user = await usersModels.findById(userId).select('-passwordHash');
  if (!user) {
    throw new CustomError(404, 'User not found');
  }
  return user;
};

export const updateProfile = async (userId: string, updateData: any) => {
  const user = await usersModels.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true }).select('-passwordHash');
  if (!user) {
    throw new CustomError(404, 'User not found');
  }
  return user;
};

export const getAllUsers = async (page: number, limit: number) => {
  const query = {}; // Add filters if needed
  return paginate(usersModels, query, page, limit, '-passwordHash');
};

export const verifyEmailToken = async (token: string) => {
  // This is a placeholder implementation. Actual implementation would depend on how tokens are generated and stored.
  const user = await usersModels.findOne({ 'metadata.emailVerificationToken': token }); 
  if (!user) {
    throw new CustomError(400, 'Invalid or expired token');
  }
  user.metadata.verificationStatus.email = true;
  await user.save();
  return user;  
}

export const resendVerificationEmail = async (email: string) => {
  // Placeholder implementation. Actual implementation would involve sending an email.
  const user = await usersModels.findOne({ email });
  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  // This is a placeholder response
  // In a real implementation, you would generate a new token, save it, and send an email.
  return { message: 'Verification email resent successfully' };
}


