import * as React from "react";

export function useServer<T>(cb: () => Promise<T> | T) {
  const [resource, setResource] = React.useState(
    (): [boolean, T | undefined, Error | undefined] => {
      const result = cb();

      if (result instanceof Promise) {
        result.then(
          (res) => {
            setResource([true, res, undefined]);
          },
          (err) => {
            setResource([true, undefined, err]);
          }
        );
        return [false, undefined, undefined];
      }

      return [true, result, undefined];
    }
  );

  return resource;
}

interface IslandProps {
  component: React.FC;
  when?: "visible" | "load" | "idle" | "event";
}

export const Island: React.FC<IslandProps> = ({ component: Component }) => {
  return <Component />;
};

interface DynamicComponentProps {
  name: string;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({ name }) => {
  return <component-root name={name}></component-root>;
};
