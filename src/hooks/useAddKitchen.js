// src/hooks/useAddKitchen.js
import { useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const useAddKitchen = (userData, user) => {
  useEffect(() => {
    if (userData) {
      const newKitchen = {
        title: userData.title,
        image: userData.image,
        completed: userData.completed === "on" ? true : false,
        uid: user.uid,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(db, "kitchen"), newKitchen)
        .then((docRef) => {
          toast.success("New Kitchen Added");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [userData, user]);

  const changeStatus = async (id, status) => {
    const data = doc(db, "kitchen", id);

    updateDoc(data, {
      completed: !status,
    })
      .then(() => {
        toast.success("Status changed");
      })
      .catch(
        (error) => {
          toast.error(error.message);
        },
        [id, status]
      );
  };
  return { changeStatus, useEffect };
};

export default useAddKitchen;
