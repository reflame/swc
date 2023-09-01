import swc from "../../..";

it("should support refreshSetup option", async () => {
  const { code } = await swc.transform(
      `import '../blah.ts'

export const test_test = 1234

export const Test = () => {
  return <div>Test</div>
}
`,
      {
          module: {
            type: 'es6'
          },
          filename: 'index.tsx',
          jsc: {
            target: "es2022",
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                throwIfNamespace: true,
                development: true,
                useBuiltins: true,
                refresh: true,
                refreshSetup: {
                  pathname: '/test/index.ts'
                },
                // refresh: {
                //   // refreshReg: String;
                //   // refreshSig: String;
                //   // emitFullSignatures: boolean;
                // },
              },
            }
          }
      }
  );
  expect(code).toEqual(`import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import.meta.url = new URL("/test/index.ts", location.origin);
const $reflamePathname = new URL(import.meta.url).pathname;
const $reflamePreviousRefreshReg = self.$RefreshReg$;
const $reflamePreviousRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    const fullId = $reflamePathname + \` \${id}\`;
    self.$reflame.reactRefreshRuntime.register(type, fullId);
};
self.$RefreshSig$ = self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform;
import '../blah.ts';
export const test_test = 1234;
export const Test = ()=>{
    return /*#__PURE__*/ _jsxDEV("div", {
        children: "Test"
    }, void 0, false, {
        fileName: "index.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
};
_c = Test;
var _c;
$RefreshReg$(_c, "Test");
self.$RefreshReg$ = $reflamePreviousRefreshReg;
self.$RefreshSig$ = $reflamePreviousRefreshSig;
self.$reflame.registerAcceptCallback({
    pathname: $reflamePathname,
    callback: ({ pathname, id })=>{
        if (id) {
            console.debug("accepting", pathname, "to", id);
        } else {
            console.debug("accepting", pathname);
        }
        self.$reflame.performReactRefresh();
    }
});\n`);
});

it("should support removeTestExports option", async () => {
  const { code } = await swc.transform(
      `import '../blah.ts'

export const test_test = 1234

export const Test = () => {
  return <div>Test</div>
}
`,
      {
          module: {
            type: 'es6'
          },
          filename: 'index.tsx',
          jsc: {
            target: "es2022",
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                throwIfNamespace: true,
                development: true,
                useBuiltins: true,
                removeTestExports: true,
                // refresh: {
                //   // refreshReg: String;
                //   // refreshSig: String;
                //   // emitFullSignatures: boolean;
                // },
              },
            }
          }
      }
  );
  expect(code).toEqual(`import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import '../blah.ts';
export const Test = ()=>{
    return /*#__PURE__*/ _jsxDEV("div", {
        children: "Test"
    }, void 0, false, {
        fileName: "index.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
};\n`);
});

it("should support removeTestExports option in production mode", async () => {
  const { code } = await swc.transform(
      `import '../blah.ts'

export const test_test = 1234

export const Test = () => {
  return <div>Test</div>
}
`,
      {
          module: {
            type: 'es6'
          },
          filename: 'index.tsx',
          jsc: {
            target: "es2022",
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                throwIfNamespace: true,
                development: false,
                useBuiltins: true,
                removeTestExports: true,
                // refresh: {
                //   // refreshReg: String;
                //   // refreshSig: String;
                //   // emitFullSignatures: boolean;
                // },
              },
            }
          }
      }
  );
  expect(code).toEqual(`import { jsx as _jsx } from "react/jsx-runtime";
import '../blah.ts';
export const Test = ()=>{
    return /*#__PURE__*/ _jsx("div", {
        children: "Test"
    });
};\n`);
});