import React from "react";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function KitchenList({ data }) {
  const deleteKitchen = (id) => {
    deleteDoc(doc(db, "kitchen", id))
      .then(() => {
        toast.success("Deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const changeStatus = async (id, status) => {
    const data = doc(db, "kitchen", id);

    updateDoc(data, {
      completed: !status,
    })
      .then(() => {
        toast.success("Status changed");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <h1>Kitchen</h1>
      <ul>
        {data &&
          data.map((kitchen) => {
            return (
              <li
                key={kitchen.id}
                className={`flex items-center gap-4 mb-4 ${
                  kitchen.completed ? "opacity-45" : "opacity-100"
                }`}
              >
                {kitchen.image && (
                  <img
                    src={kitchen.image}
                    alt={kitchen.title}
                    className="w-16 h-16 object-cover"
                  />
                )}
                <div>
                  <h3>{kitchen.title}</h3>
                </div>
                <div>
                  <button
                    onClick={() => changeStatus(kitchen.id, kitchen.completed)}
                    className={`btn btn-sm ${
                      kitchen.completed ? "btn-primary" : "btn-accent "
                    }`}
                  >
                    {kitchen.completed ? "uncompleted" : "completed"}
                  </button>
                  <button
                    onClick={() => deleteKitchen(kitchen.id)}
                    className="btn btn-sm btn-secondary"
                  >
                    delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default KitchenList;
