import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostCard from "../components/PostCard";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/allPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="container-fluid gedf-wrapper">
        <div className="row justify_center">
          <div className="col-md-6 gedf-main">
            {/*- \\\\\\\Post*/}
            <div className="card gedf-card">
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="posts-tab"
                      data-toggle="tab"
                      href="#posts"
                      role="tab"
                      aria-controls="posts"
                      aria-selected="true"
                    >
                      Ask your question
                    </a>
                  </li>
                </ul>
              </div>
              <Post />
            </div>
            {/* Post /////*/}
            {data?.map((item) => {
              return <PostCard item={item} setData={setData} data={data}/>;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
