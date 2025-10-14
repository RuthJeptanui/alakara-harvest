import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { sendResponse } from '../utils/response.utils';
import { IUser } from '../models/users.models';



// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user: IUser; // Adjust the type as per your user model

    }
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { user, token } = await userService.register(userData);
    sendResponse(res, 201, true, { user, token }, null, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailOrPhone, password } = req.body;
    const { user, token } = await userService.login(emailOrPhone, password);
    sendResponse(res, 200, true, { user, token }, null, 'User logged in successfully');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id; // Now TypeScript recognizes req.user
    const user = await userService.getUserById(userId);
    sendResponse(res, 200, true, user, 'User profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    const updatedUser = await userService.updateProfile(userId, updateData);
    sendResponse(res, 200, true, updatedUser, 'User profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const users = await userService.getAllUsers(Number(page), Number(limit));
    sendResponse(res, 200, true, users, 'Users fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const user = await userService.verifyEmailToken(token);
    sendResponse(res, 200, true, user, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body; // Assuming email is sent in the body
    // Implement the logic to resend verification email
    await userService.resendVerificationEmail(email);
    // This is a placeholder response
        // This is a placeholder response
    sendResponse(res, 200, true, null, 'Verification email resent successfully');
  }
 catch (error) {
  next(error);
}
};