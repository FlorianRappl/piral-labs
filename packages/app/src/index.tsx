import * as React from "react";
import { Island } from "@pilabs/utils";
import Counter from "./Counter";
import PiralLogo from "./PiralLogo";
import Posts from "./Posts";

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello</h1>
      <h2>Just a simple demo</h2>
      <Posts />
      <Island component={Counter} when="visible" />
      <p>Brought to you by</p>
      <PiralLogo />
    </div>
  );
};

export default App;
