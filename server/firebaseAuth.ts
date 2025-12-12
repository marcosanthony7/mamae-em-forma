import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import type { RequestHandler } from "express";
import { storage } from "./storage";

if (getApps().length === 0) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccount) {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY is required for authentication");
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set");
  }
  
  try {
    const parsed = JSON.parse(serviceAccount);
    initializeApp({
      credential: cert(parsed),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Error parsing Firebase service account:", error);
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format");
  }
}

const adminAuth = getAuth();

export interface AuthenticatedRequest extends Express.Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
  };
  decodedToken?: DecodedIdToken;
}

export const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    await storage.upsertUser({
      id: decodedToken.uid,
      email: decodedToken.email || null,
      firstName: decodedToken.name?.split(" ")[0] || null,
      lastName: decodedToken.name?.split(" ").slice(1).join(" ") || null,
      profileImageUrl: decodedToken.picture || null,
    });

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
    req.decodedToken = decodedToken;
    
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
