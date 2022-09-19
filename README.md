# Micro Frontends and Islands

Experiment from [Piral](https://piral.io) Labs.

## React on the Client vs Server

(tbd)

Then there are React server components, but here new problems arrive...

Problem: We hydrate the whole thing. App bundle is ...

## Doing work only on the Server

(tbd)

By doing some clever techniques we can circumvent some of the duplicated code that comes quite naturally with React's hydration.

Problem: We are still hydrating the full thing. What if we only would need to hydrate the part that requires hydration?

## Bringing React to Islands

(tbd)

Forming islands is theoretically possible, but requires some work to identify and replace / partially hydrate the right components.

Problem: We are still inefficient at first load (require React) and we do not cover all cases (e.g., what if multiple islands are within one component? what if we depend on some context?). Let's try to make it more efficient.

## Making it Efficient

(tbd)

## Adding Micro Frontends

(tbd)

## Conclusion

(tbd)
