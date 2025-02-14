import React, { useEffect, useState } from "react";
import axios from "axios";
import { putt, get } from "./APIs"; // Make sure `get` is defined correctly.

const PutAx = () => {
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    body: "",
  });

  // Fetch the posts (with `useEffect`)
  useEffect(() => {
    get()
      .then((response) => setData(response.data.slice(0, 5))) // Get first 5 posts
      .catch((error) => console.error("Error fetching data:", error));
  }, [isUpdated]);

  // Handle POST update
  const handleUpdate = (e) => {
    e.preventDefault();

    // Send the PUT request with the updated data
    putt(currentPost)
      .then((response) => {
        if (response.status === 200) {
          console.log(`Post with ID ${currentPost.id} updated successfully`);
          setIsUpdated((prev) => !prev); // Trigger a refetch
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  // Set the current post to edit
  const handleEditClick = (post) => {
    setCurrentPost({
      id: post.id,
      title: post.title,
      body: post.body,
    });
  };

  return (
    <div>
      <h1>Update Method (PUT)</h1>

      {/* List of posts */}
      {data.length > 0 ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              {post.title}{" "}
              <button onClick={() => handleEditClick(post)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading or no data available...</p>
      )}

      {/* Form to edit the post */}
      {currentPost.id && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Post</h3>
          <label>
            Title:
            <input
              type="text"
              value={currentPost.title}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Body:
            <textarea
              value={currentPost.body}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, body: e.target.value })
              }
            />
          </label>
          <br />
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
};

export default PutAx;
