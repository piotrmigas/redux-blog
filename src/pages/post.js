import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";
import AddCommentModal from "../components/AddCommentModal";
import { deletePost } from "../redux/dataSlice";

const Post = () => {
  const [modal, setModal] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();
  const { id, postId } = useParams();
  const user = useSelector((state) => state.users.find((user) => user.id === Number(id)));
  const post = useSelector((state) => state.posts.find((post) => post.id === Number(postId)));
  const postComments = useSelector((state) => state.comments.filter((c) => c.postId === Number(postId)));

  const history = useHistory();

  const handleClick = () => {
    dispatch(deletePost(post.id));
    history.push(`/user/${id}`);
  };

  return (
    <div className="container">
      <div className="row pt-4 pb-5">
        <div className="col-4">
          <Link to={`/user/${user.id}`}>
            <span className="fas fa-arrow-left fa-2x align-middle navy" />
          </Link>
          <span className="navy"> Back</span>
        </div>
        <div className="col-4 text-center">
          <h4>{user.name}</h4>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <i className="far fa-trash-alt navy fa-2x" onClick={handleClick} />
        </div>
      </div>
      <div className="row mb-2 mx-1">
        <div className="col text-justify">
          <h2>{post.title}</h2>
          <br />
          <p>{post.body}</p>
        </div>
      </div>
      <div className="row justify-content-between p-1">
        <div className="col-4">
          <button
            type="button"
            className="btn btn-link"
            data-toggle="collapse"
            data-target=".collapse"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide" : "Show"} comments
          </button>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button type="button" className="btn btn-link" onClick={() => setModal(true)}>
            Add comment
          </button>
        </div>
      </div>
      <div className="comments">
        <div className="collapse pb-2">
          {postComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <AddCommentModal postId={post.id} modal={modal} setModal={setModal} />
    </div>
  );
};

export default Post;
