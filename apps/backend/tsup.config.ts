import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs"],
	outDir: "dist",
	sourcemap: true,
	bundle: true,
	dts: false,
	target: "node18",
});
