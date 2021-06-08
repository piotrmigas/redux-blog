import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import AddPostModal from "../components/AddPostModal";
import { fetchComments } from "../redux/dataSlice";

const User = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((user) => user.id === Number(id)));
  const userPosts = useSelector((state) => state.posts.filter((p) => p.userId === Number(id)));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-between pt-4 pb-5">
        <div className="col-4">
          <Link to="/">
            <span className="fas fa-arrow-left fa-2x align-middle navy" />
          </Link>
          <span className="navy"> Back</span>
        </div>
        <div className="col-4 text-center">
          <h4>{user.name}</h4>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <i className="fas fa-plus-circle fa-2x navy" onClick={() => setModal(true)} />
        </div>
      </div>
      <div className="mb-5">
        {userPosts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </div>
      <AddPostModal userId={user.id} modal={modal} setModal={setModal} />
    </div>
  );
};

export default User;
