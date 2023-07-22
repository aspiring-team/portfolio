import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const login = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const user = await signInWithPopup(auth, provider);
    return user;
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e);
  }
};
