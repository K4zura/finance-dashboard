<script>
import { onMount } from "svelte";

export let itemSelector = ".nav ul li a";

let backdrop;
let lastPath = window.location.pathname;

const updateBackdropByPath = () => {
	const nav = document.querySelector(".nav");
	const items = document.querySelectorAll(itemSelector);
	const currentPath = window.location.pathname;

	if (!nav || !backdrop || items.length === 0) return;

	const sidebarTop = nav.getBoundingClientRect().top;

	items.forEach((item) => {
		const itemPath = item.getAttribute("href");
		if (
			itemPath &&
			(currentPath === itemPath || currentPath.endsWith(itemPath))
		) {
			const { top, height } = item.getBoundingClientRect();
			backdrop.style.setProperty("--top", `${top - sidebarTop}px`);
			backdrop.style.setProperty("--height", `${height}px`);
		}
	});
};

const updateBackdropOnClick = (item) => {
	const nav = document.querySelector(".nav");
	if (!item || !nav || !backdrop) return;

	const { top, height } = item.getBoundingClientRect();
	const sidebarTop = nav.getBoundingClientRect().top;
	backdrop.style.setProperty("--top", `${top - sidebarTop}px`);
	backdrop.style.setProperty("--height", `${height}px`);
};

onMount(() => {
	updateBackdropByPath(); // Run once on mount

	const interval = setInterval(() => {
		const currentPath = window.location.pathname;
		if (currentPath !== lastPath) {
			lastPath = currentPath;
			requestAnimationFrame(updateBackdropByPath);
		}
	}, 0);

	const items = document.querySelectorAll(itemSelector);
	const listeners = [];

	items.forEach((item) => {
		const handler = () => updateBackdropOnClick(item);
		item.addEventListener("click", handler);
		listeners.push({ item, handler });
	});

	return () => {
		clearInterval(interval);
		listeners.forEach(({ item, handler }) => {
			item.removeEventListener("click", handler);
		});
	};
});
</script>

<div
  bind:this={backdrop}
  id="menu-backdrop"
  class="bg-dark absolute top-[var(--top)] z-10 h-[var(--height)] w-full rounded-lg transition-all"
>
</div>
