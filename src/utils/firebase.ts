import admin from "firebase-admin";
import { NextRequest } from "next/server";
import { CargoSenderUser } from "@/types/eurosender-api-types";
import { HttpException } from "./errors";
import { prisma } from "./prisma";

const serviceAccount = process.env.SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.SERVICE_ACCOUNT_JSON)
  : {
      type: "service_account",
      project_id: "cargosender-8005b",
      private_key_id: "28215499606d0b86d1b92447aa73f9325bd8d58c",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfFaa/BSlTnuy5\ncOpgrD+SfeTCXpheYV2AauslINvz7StIfH0Hqu5bRLItsWyk0iC4zjCcDRWOtz6m\nH8EK1+D4SoU3WfRWZJj4NanyLuEZw/e44C3/Cil7vFADDGI18Y6J0FXDbv1oX7ot\nfFj/QzOQMNikrthcLSBNxiLkF2HrZDQgO4wLrHu+30gbv3yFrkl1WZQ5TkBKsbqV\nuoidicvNWZHUFyu2eCRXYCelN3+n3KUojk9HfjMM038fhy123lu8+Ea9l1c+OYm0\nwmBWtY0w2juD39OY+REeFbCAnuICsMkeVNgIoDukDiWXFayrmCBfgKqxTP147VYp\nmYql9nJZAgMBAAECggEAAe6zLl9rxeyQAP4GtOysP+dOrOJasCKblHB/D45fz8nQ\nc96XZKwcR90dLM+NiqxcgGbrPXoD8Eo+q2JS1UNQEKzwlEcRGnh6z/E2QvTmAHrV\nyzVIU+rxUT/52Q6DGuC4F97rbarcXH2Yl5FGruHICt02QZyKhXRJaqZA1VH6Id3z\nS7EC+ChvOKB4QcsIGZjRInWkhcRNxA1ALy5Q0NtPry0944UEvir9yjTYmx+edJM2\nsPj48wTyJRQ0QrAeG3K1Ds3dYQPS0DWa3dq8aQf3R/Nj6dzXv3IQGoRWaWJiu8/5\nfTzLFqFJNOIa/ISVjBEqsHwKZdCVGGYzkk7P7NNwKQKBgQD8tPb2hgMuYIdC3SRM\nfy5Av31xC5dCXZPk5q66y87P5+3qTZq3N9LaCLPpR++mqYGGTl6joxjaXDuwVE1F\nds1kRy0P61r++KQDMqAOMeTRKjdqPhViBdfROkq2Knpu92Gv4B08PcnMktgOSpAH\nJcdUKpRll+H4EK/bsPPyYy8yTQKBgQDh/d2yWd+D0JJVqhImOiAatq6OI0lDTR1e\nFF90i40x4R/07KqaeFy1IvXU8p8dUGV2V2JYt7LKFzSVKr7kLscCabLH2nyi7twQ\nSiA3pKsTRpex/5lJRAedJ17fxCDg/BvH165I8ZXMHEyPx7uYVQRzQfyaHz6CMPTB\nLMK19fROPQKBgFSXdzwarCHwKhcV07rPr/n4n9MhoCaVEJbFKaRZ6QbrilauV6YR\nR8G4vBDRBcXyY+tDfKamSAGAcnKaJaulEygIM2tqy3EiZjSz06Qsy33A9f/YfGvt\nrMrbCntkSMuwf8DR8rdhr5WNakmOaBwcZ1cjUb2YVAon+9Y8q8xtqzTZAoGABe89\nuCZGCVcb0KYTre9O0oTDlrX0gZDv2X2deBkGDy5DQZJJdJ7+iD8vx3TLmuB2maH3\n0i6YwlfTqKsjsihMT5Lo//iL11eAbekUaYGogGwVJbZ5lwPzUzwqcKPc3SuhqyDN\n0dqOPXrsw8XR9lEdOc2czYtOf+q7MqtzPYYE8V0CgYAVhletG3T0mlXA7N058oUY\n7mUpShss+mSQl+TlJJM44Pdr9KtlOeG2meNME6786Acxn3XHsw0bZwhBoKGUVXH2\neCG1kxJKvaMgocmb4tDL4yZvqnPW+p9Ody/X+LU3gWK3Nzn1TxKh31gdB+TBe6ZF\nH0rScb1rUpMD4c56Bs6YKA==\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-9ll7y@cargosender-8005b.iam.gserviceaccount.com",
      client_id: "110393624595042100774",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9ll7y%40cargosender-8005b.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

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
  jwtToken: string
): Promise<CargoSenderUser> => {
  try {
    const app = getFirebaseApp();
    const decoded = await app.auth().verifyIdToken(jwtToken, true);
    return {
      uid: decoded.uid,
      name: decoded.name!,
      picture: decoded.picture!,
      email: decoded.email!,
      isAdmin: false,
    };
  } catch (e) {
    throw new HttpException("Authentication failure", 401, {
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
    const decodedUser = await decodeJwtToken(token);
    const count = await prisma.cargoSenderAdmin.count({
      where: { email: decodedUser.email },
    });
    // Assuming the result contains rows in `result.rows`
    decodedUser["isAdmin"] = count > 0; // Set to true if a matching admin exists
    return decodedUser;
  } else {
    throw new HttpException("Bearer token Expected", 401);
  }
};
