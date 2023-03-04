import React from "react";
import { toast } from "react-hot-toast";
import moment from "moment";

const PostCard = ({ item, setData, data }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const deletpost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/deletePost/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
        const newData = data.filter((item) => {
          return item.id !== result;
        });
        setData(newData);
      });
  };

  const approvePost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/approvePost/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const rejectPost = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/api/rejectPost/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  return (
    <>
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="ml-2">
                <div className="h5 m-0">{item.user.name}</div>
              </div>
            </div>
            <div>
              <i
                className="bi bi-trash3-fill mr-2"
                onClick={() => deletpost(item.id)}
                style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
              ></i>
              {user.userType === 1 && item.approved == 0 ? (
                <button
                  className="btn btn-warning  mr-2"
                  type="submit"
                  onClick={() => approvePost(item.id)}
                >
                  Approve
                </button>
              ) : (
                <></>
              )}

              {user.userType === 1 && item.approved == 1 ? (
                <button
                  className="btn btn-danger "
                  type="submit"
                  onClick={() => rejectPost(item.id)}
                >
                  Reject
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-muted h7 mb-2">
            <i className="fa fa-clock-o" /> 
            {moment(item.createdAt).startOf("second").fromNow()}
          </div>
          <a className="card-link" href="#">
            <h5 className="card-title">{item.name}</h5>
          </a>
          <p className="card-text">{item.description}</p>
        </div>
        <div className="card-footer">
          {/* <div className="position-relative comment-box"> */}
          <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   makeComment(e.target[0].value, item._id);
          // }}
          >
            <input
              type="text"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              className="w-100 border-0 p-3 input-post"
              placeholder="Add a comment..."
            />
            <button className="btn btn-primary btn-ig" type="submit">
              Post
            </button>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PostCard;
