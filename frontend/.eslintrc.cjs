module.exports = {
	root: true,
	env: { browser: true, es2021: true, jest: true },
	extends: ["eslint:recommended", "plugin:react-hooks/recommended", "prettier"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	rules: {
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
	},
};
