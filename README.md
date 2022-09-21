# Micro Frontends and Islands

Experiment from [Piral](https://piral.io) Labs.

## React on the Client vs Server

**Branch:** phases/1-initial

(tbd)

Then there are React server components, but here new problems arrive...

Problem: We hydrate the whole thing. App bundle is ...

## Doing work only on the Server

**Branch:** phases/2-server-data

(tbd)

By doing some clever techniques we can circumvent some of the duplicated code that comes quite naturally with React's hydration.

Problem: We are still hydrating the full thing. What if we only would need to hydrate the part that requires hydration?

## Bringing React to Islands

**Branch:** phases/3-react-islands

(tbd)

Forming islands is theoretically possible, but requires some work to identify and replace / partially hydrate the right components.

Problem: We are still inefficient at first load (require React) and we do not cover all cases (e.g., what if multiple islands are within one component? what if we depend on some context?). Let's try to make it more efficient.

## Caring about Performance

**Branch:** phases/4-performance

(tbd)

Most of the performance issues can be solved by caching, lazy loading, and removal of unnecessary things, e.g., offering data that would be needed for hydration, however, nothing is to be hydrated.

Problem: The script is still quite large preventing a perfect lighthouse score. Hence we need to have this optimized, too.

## Making it Efficient

(tbd)

## Adding Micro Frontends

(tbd)

## Conclusion

(tbd)
