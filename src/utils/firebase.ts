import admin from "firebase-admin";
import * as serviceAccount from "../../service-account.json";
import { CargoSenderUser } from "@/types/eurosender-api-types";

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
  const app = getFirebaseApp();
  const decoded = await app.auth().verifyIdToken(jwtToken, true);
  return {
    uid: decoded.uid,
    name: decoded.name!,
    picture: decoded.picture!,
    email: decoded.email!,
  };
};
