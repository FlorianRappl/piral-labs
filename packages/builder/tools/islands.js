const { readFileSync } = require("fs");
const { resolve, dirname } = require("path");
const { parse } = require("@babel/parser");
const { default: traverse } = require("@babel/traverse");

function generateUid() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

function findIslands(source) {
  const componentSearch = "createElement(Island,";
  const pathSearch = "// ../app/src";
  const islands = [];
  let index = 0;

  do {
    index = source.indexOf(componentSearch, index);

    if (index === -1) {
      break;
    }

    const pathStart = source.lastIndexOf(pathSearch, index) + 3;
    const pathEnd = source.indexOf("\n", pathStart);
    index += componentSearch.length;
    islands.push({
      index,
      path: source.slice(pathStart, pathEnd),
      id: generateUid(),
    });
  } while (true);

  return islands;
}

function applyIslands(source, islands) {
  for (const island of islands) {
    const i = source.indexOf("component:", island.index);
    source =
      source.substring(0, i) + `uid:"${island.id}",` + source.substring(i);
  }

  return source;
}

function getPath(root, file) {
  return resolve(root, `${file}.tsx`);
}

function configureEnvironment(islands) {
  const root = process.cwd();
  const result = [];

  for (const island of islands) {
    const sourcePath = resolve(root, island.path);
    const content = readFileSync(sourcePath, "utf8");
    const imports = [];
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    const islandMatches = [];

    traverse(ast, {
      ImportDeclaration(path) {
        const { node } = path;

        if (node.source.value === "@pilabs/utils") {
          node.specifiers.forEach((spec) => {
            if (spec.imported.name === "Island") {
              islandMatches.push(spec.local.name);
            }
          });
        } else {
          imports.push(node);
        }
      },
      JSXIdentifier(path) {
        const { node, container } = path;

        if (
          islandMatches.includes(node.name) &&
          container.type === "JSXOpeningElement"
        ) {
          container.attributes
            .filter(
              (m) =>
                m.name.type === "JSXIdentifier" && m.name.name === "component"
            )
            .forEach((m) => {
              const expr = m.value.expression;

              if (expr.type === "Identifier") {
                const relImport = imports.find((imp) =>
                  imp.specifiers.some((spec) => spec.local.name === expr.name)
                );
                const locPath = relImport.source.value;
                const path = getPath(dirname(sourcePath), locPath);
                const spec = relImport.specifiers.find(
                  (s) => s.local.name === expr.name
                );
                const name =
                  spec.type === "ImportDefaultSpecifier"
                    ? "default"
                    : spec.imported.name;

                result.push({
                  id: island.id,
                  path,
                  name,
                });
              }
            });
        }
      },
    });
  }

  process.env.ISLANDS = JSON.stringify(result);
}

function withIslands(content) {
  const islands = findIslands(content);
  const newContent = applyIslands(content, islands);

  configureEnvironment(islands);
  return newContent;
}

exports.withIslands = withIslands;
