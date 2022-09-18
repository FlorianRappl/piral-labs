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
