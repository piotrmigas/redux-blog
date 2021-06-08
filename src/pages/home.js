import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPosts } from "../redux/dataSlice";
import User from "../components/User";

const Home = () => {
  const users = useSelector((state) => state.users);
  const status = useSelector((state) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center my-3">Loading...</p>;
  if (status === "failed") return <p className="text-center my-3">Error fetching posts...</p>;

  return (
    <div className="container">
      <div className="row">{users.map((user) => <User user={user} key={user.id} />).slice(0, 8)}</div>
    </div>
  );
};

export default Home;
