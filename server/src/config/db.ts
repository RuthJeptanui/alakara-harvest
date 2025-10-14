import mongoose from "mongoose";

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[MongoDB] ❌ Missing MONGODB_URI in environment");
    process.exit(1);
  }

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      await mongoose.connect(uri);

      console.log(`[MongoDB] ✅ Connected on attempt ${attempt + 1}`);
      return;
    } catch (error) {
      attempt++;
      const delay = INITIAL_DELAY_MS * Math.pow(2, attempt); // exponential backoff

      console.error(`[MongoDB] ❌ Connection failed (attempt ${attempt}):`, error);

      if (attempt >= MAX_RETRIES) {
        console.error("[MongoDB] ❌ Max retries reached. Exiting.");
        process.exit(1);
      }

      console.log(`[MongoDB] ⏳ Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};


