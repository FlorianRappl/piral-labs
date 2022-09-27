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

**Branch:** phases/5-efficient

(tbd)

If we switch from React to Preact (with compatibility layer) we can reduce the initial minified JavaScript from 160 kB to 10 kB, which is massive. Even better, we can introduce dynamic script loading, such that dependencies such as Preact are loaded (and shared) in chunks.

Problem: While the overall performance is now at 100 we have to face the difficulty of distributed computing. What if micro frontends are contributed to the website? How can we efficiently load this?

## Adding Micro Frontends

**Branch:** phases/6-micro-frontends

(tbd)

## Conclusion

(tbd)
