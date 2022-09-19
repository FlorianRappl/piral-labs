import * as React from "react";

export const Shuffle: React.FC = () => {
  const shuffle = React.useCallback(() => {
    const ul = document.querySelector(".photos");
    
    for (let i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[(Math.random() * i) | 0]);
    }
  }, []);

  return <button onClick={shuffle}>Shuffle Posts</button>;
};
