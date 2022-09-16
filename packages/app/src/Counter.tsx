import * as React from "react";

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount((n) => n + 1)}>{count}</button>;
};

export default Counter;
