const fs = require("fs");
const acorn = require("/tmp/zcode_extracted/node_modules/acorn");
const src = fs.readFileSync("out/renderer/assets/index-yzdnbLpy.js","utf8");
console.log("parsing...", src.length, "bytes");
let ast;
try {
  ast = acorn.parse(src, {ecmaVersion:"latest", sourceType:"module", allowReturnOutsideFunction:true});
  console.log("parsed OK, top-level nodes:", ast.body.length);
} catch(e) {
  console.log("PARSE ERROR:", e.message);
  process.exit(1);
}

// Look for: const/let/var at = ... and Ze = ... at top level, and any assignment nNt = {...}
for (const node of ast.body) {
  if (node.type === "VariableDeclaration") {
    for (const decl of node.declarations) {
      if (decl.id.type === "Identifier" && (decl.id.name === "at" || decl.id.name === "Ze")) {
        console.log("\n=== FOUND", decl.id.name, "@", node.start, "===");
        console.log("init type:", decl.init && decl.init.type);
        // print a preview
        const preview = src.slice(decl.start, Math.min(decl.end || decl.start+300, decl.start+300));
        console.log("preview:", preview.slice(0, 300));
        if (decl.init && decl.init.type === "ObjectExpression") {
          console.log("num properties:", decl.init.properties.length);
          console.log("first 3 keys:", decl.init.properties.slice(0,3).map(p =>
            p.type==="Property" ? (p.key.type==="Identifier"?p.key.name:p.key.value) : p.type
          ));
        }
      }
    }
  }
}
