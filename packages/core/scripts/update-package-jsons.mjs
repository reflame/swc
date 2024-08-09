import * as fs from "fs/promises";

const version = process.argv[2];

const path = "./package.json";
const packageJsonCore = JSON.parse(
	await fs.readFile(path, {
		encoding: "utf-8",
	}),
);

await fs.writeFile(
	path,
	JSON.stringify(
		{
			...packageJsonCore,
			name:
				"@lewisl9029/swc-core" + packageJsonCore.name.slice("@swc/core".length),
			version,
			repository: {
				...packageJsonCore.repository,
				url: "git+https://github.com/reflame/swc.git",
			},
			napi: {
				...packageJsonCore.napi,
				targets: [
					"x86_64-pc-windows-msvc",
					"x86_64-unknown-linux-musl",
					"aarch64-apple-darwin",
				],
			},
			dependencies: (({ ["@swc/types"]: _types, ...dependencies }) =>
				dependencies)(packageJsonCore.dependencies),
		},
		null,
		4,
	),
);

const paths = [
	...(await fs.readdir("./scripts/npm")).map(
		(directory) => `./scripts/npm/${directory}/package.json`,
	),
];

await Promise.all(
	paths.map(async (path) => {
		const packageJson = JSON.parse(
			await fs.readFile(path, {
				encoding: "utf-8",
			}),
		);

		await fs.writeFile(
			path,
			JSON.stringify(
				{
					...packageJson,
					name:
						"@lewisl9029/swc-core" + packageJson.name.slice("@swc/core".length),
					version,
					repository: {
						...packageJson.repository,
						url: "git+https://github.com/reflame/swc.git",
					},
				},
				null,
				4,
			),
		);
	}),
);
