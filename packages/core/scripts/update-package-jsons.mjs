import * as fs from "fs/promises";

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
			repository: {
				...packageJsonCore.repository,
				url: "git+https://github.com/reflame/swc.git",
			},
		},
		null,
		2,
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
					version: packageJsonCore.version,
					repository: {
						...packageJson.repository,
						url: "git+https://github.com/reflame/swc.git",
					},
				},
				null,
				2,
			),
		);
	}),
);
