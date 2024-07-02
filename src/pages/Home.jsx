import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("kitchen", ["uid", "==", user.uid]);
  console.log(data);
  return <div className="align-element">Home</div>;
}

export default Home;
