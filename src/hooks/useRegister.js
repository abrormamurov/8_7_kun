import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import toast from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      console.log(updateProfile);
      const user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));

      toast.success(`Welcome ${user.displayName}!`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsPending(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}`);
      dispatch(login(user));
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };
  return { isPending, registerWithGoogle, register };
};
