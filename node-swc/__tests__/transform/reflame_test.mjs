import swc from "../../..";

it("should support rewriteRelativeImports", async () => {
  const { code } = await swc.transform(
      `import '../blah.ts'

export const test = () => {
  import("./blah2.ts")
}
`,
      {
          module: {
            type: 'es6'
          },
          filename: '~r/test/index.ts',
          jsc: {
            target: "es2022",
            rewriteRelativeImports: true
          }
      }
  );
  expect(code).toEqual(`import "~r/blah.ts";
export const test = ()=>{
    import("~r/test/blah2.ts");
};\n`);
});