// @ts-check

import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react(), svelte()],
});
