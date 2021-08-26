import * as admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import serviceAccount =
  require("../scene-creators-83d41-firebase-adminsdk-9tkdh-31805bc3b5.json")

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// eslint-disable-next-line
export default {
  app,
};
