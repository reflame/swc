import swc from "../../..";
import * as path from 'path'
import { fileURLToPath } from "url";

const __dirname =path.dirname(fileURLToPath(import.meta.url));

it("should support rewriteRelativeImports", async () => {
  const { code } = await swc.transform(
      `import '../blah.ts'

export const test = () => {
  import("./blah2.ts")
}
`,
      {
          // isModule: true,
          module: {
            type: 'es6'
          },
          filename: '~r/test/index.ts',
          jsc: {
            parser: {
              syntax: "typescript",
              dynamicImport: true,
            },
            transform: {},
            baseUrl: __dirname,
            paths: {
                "@src/*": ["bar/*"],
            },
            target: 'es2022',
            // rewriteRelativeImports: true
          }
      }
  );
  expect(code).toEqual(`import "~r/blah.ts";
export const test = ()=>{
    import("~r/test/blah2.ts");
};\n`);
});