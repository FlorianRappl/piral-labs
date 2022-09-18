import * as React from "react";
import axios from "axios";
import { useServer } from "@pilabs/utils";

const Posts: React.FC = () => {
  const [loaded, posts] = useServer(() => {
    return axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.data.slice(0, 40));
  });

  if (!loaded) {
    return <div>Loading ...</div>;
  }

  return (
    <ul className="photos">
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <img src={post.thumbnailUrl} alt={post.title} />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
