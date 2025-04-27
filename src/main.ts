import { parse } from "./syntax/parse";
import fs from "node:fs";
import process from "node:process";
import { analyze, SemanticContext } from "./semantics/analyze";

const sourcePath = process.cwd() + "/debug/main.snow";
const source = fs.readFileSync(sourcePath, { encoding: "utf8" });

const tree = parse(source);

console.log(JSON.stringify(tree, null, "  "));

const semCtx = new SemanticContext();
analyze(semCtx, tree);

console.log(semCtx.nameToSymbol);
console.log(semCtx.nodeToSymbol);
