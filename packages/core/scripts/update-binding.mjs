import * as fs from "fs/promises";

const bindingCode = await fs.readFile("./binding.js", { encoding: "utf-8" });

await fs.writeFile(
	"./binding.js",
	bindingCode.replaceAll("@swc/core", "@lewisl9029/swc-core"),
);
