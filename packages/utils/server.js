export function useServer(cb) {
  const result = globalThis.getNextResult(cb);

  if (typeof result === "undefined") {
    throw new Error("deferred");
  }

  return [true, result.current];
}
