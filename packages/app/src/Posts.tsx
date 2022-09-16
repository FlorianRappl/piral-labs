import * as React from "react";

const Posts: React.FC = () => {
  const [posts, setPosts] = React.useState([]);
  [];

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => setPosts(res.slice(0, 40)));
  }, []);

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
