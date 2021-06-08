import { useDispatch } from "react-redux";
import { addPost } from "../redux/dataSlice";
import { useForm } from "react-hook-form";

const AddPostModal = ({ userId, modal, setModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ title, body }, e) => {
    const post = { userId, title, body };
    dispatch(addPost(post));
    e.target.reset();
    setModal(false);
  };

  return (
    <div className={modal ? "modal d-block" : "modal d-none"}>
      <div className="modal-main border border-dark">
        <p className="header pl-1">Add post</p>
        <h4 className="text-center">Add post</h4>
        <div className="card-body">
          <form className="container pt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label pl-3 pt-0">Title</label>
              <div className="col-lg-9 input-group-sm pl-0">
                <input
                  autoComplete="off"
                  className={`form-control rounded-0 border ${errors.title ? "border-danger" : "border-dark"}`}
                  {...register("title", { required: true })}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label pt-0">Body</label>
              <div className="col-lg-9 pl-0">
                <textarea
                  rows="4"
                  className={`form-control rounded-0 border ${errors.body ? "border-danger" : "border-dark"}`}
                  {...register("body", { required: true })}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label"></label>
              <div className="col-lg-9">
                <div className="row justify-content-end pr-3">
                  <button
                    type="reset"
                    className="btn-cancel border border-dark box-shadow"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-save border border-dark box-shadow ml-2" type="sumbit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <p className="footer" />
      </div>
    </div>
  );
};

export default AddPostModal;
