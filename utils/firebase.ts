import { initializeApp } from "firebase/app";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics, isSupported } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyASTX_4w4JHTk8ITeV0c2b24d6K_cn9O1w",
  authDomain: "portfolio-3f434.firebaseapp.com",
  projectId: "portfolio-3f434",
  storageBucket: "portfolio-3f434.appspot.com",
  messagingSenderId: "310948541990",
  appId: "1:310948541990:web:d8eb6600546d37b081d8e7",
  measurementId: "G-LMTYS31N7W",
};

const app = initializeApp(config);

if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    isTokenAutoRefreshEnabled: true,
    provider: new ReCaptchaV3Provider(
      "6LfFn0InAAAAANdDC-VWT-7lG5SgvXQpag53XawG"
    ),
  });
}

const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
