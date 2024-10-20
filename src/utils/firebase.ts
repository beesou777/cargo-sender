import admin from "firebase-admin";
import { NextRequest } from "next/server";
import { CargoSenderUser } from "@/types/eurosender-api-types";
import { HttpException } from "./errors";

const serviceAccount = process.env.SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.SERVICE_ACCOUNT_JSON) : {
  projectId: "",
  clientEmail: "",
  privateKey: "",
}

export const getFirebaseApp = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    return admin.app();
  } catch (e) {
    return admin.app();
  }
};

export const decodeJwtToken = async (
  jwtToken: string,
): Promise<CargoSenderUser> => {
  try {
    const app = getFirebaseApp();
    const decoded = await app.auth().verifyIdToken(jwtToken, true);
    return {
      uid: decoded.uid,
      name: decoded.name!,
      picture: decoded.picture!,
      email: decoded.email!,
    };
  } catch (e) {
    throw new HttpException("Firebase token exception", 500, {
      originalException: (e as Error).message,
    });
  }
};

export const getUser = async (req: NextRequest): Promise<CargoSenderUser> => {
  const auth = req.headers.get("Authorization");
  if (
    auth &&
    typeof auth == "string" &&
    auth.split(" ").length == 2 &&
    auth.split(" ")[0] == "Bearer"
  ) {
    const token = auth.split(" ")[1];
    return decodeJwtToken(token);
  } else {
    throw new HttpException("Bearer token Expected", 401);
  }
};
