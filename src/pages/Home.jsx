import { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
// hooks
import { useCollection } from "../hooks/useCollection";
// rrd
import { Form, useActionData } from "react-router-dom";
// components
import { FormInput, KitchenList } from "../components";
import FormCheckbox from "../components/FormCheckbox";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  let image = formData.get("image");

  return { title, completed, image };
};

function Home() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { data, setData } = useCollection("kitchen", ["uid", "==", user.uid]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (userData) {
      const newKitchen = {
        title: userData.title,
        image: userData.image,
        completed: userData.completed === "on" ? true : false,
        uid: user.uid,
      };

      addDoc(collection(db, "kitchen"), newKitchen)
        .then((docRef) => {
          setData((prevData) => [
            ...prevData,
            { id: docRef.id, ...newKitchen },
          ]);
          toast.success("New Kitchen Added");
          setImageUrl("");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [userData, user]);

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="grid grid-cols-2 align-element">
      <div>{data && <KitchenList data={data} />}</div>
      <div className="card bg-base-100 w-full md:w-96 shadow-xl p-8">
        <Form method="post" className="flex flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold">New Kitchen</h2>

          <FormInput name="title" type="text" label="Kitchen title" />
          <FormInput
            name="image"
            type="url"
            label="Kitchen image"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="w-full mt-4">
              <img
                src={imageUrl}
                alt="Kitchen Preview"
                className="w-full h-40 object-cover"
              />
            </div>
          )}
          <FormCheckbox name="completed" />
          <button className="btn bg-primary text-white py-2 px-4 rounded-lg">
            Add
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Home;
