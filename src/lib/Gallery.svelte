<script lang="ts">
	// TODO: Currently only (sanely) supports images that all have the same aspect ratio

	export let images: {
		src: string;
		alt: string;
	}[] = [];
	let index = 0;
	$: {
		if (index < 0) index = images.length - 1;
		if (index >= images.length) index = 0;
	}

	$: current = images[index];
</script>

<svelte:head>
    {#each images as image}
      <link rel="preload" as="image" href={image.src} />
    {/each}
</svelte:head>

<div class="w-full mx-auto font-bold text-center select-none">
	<figure class="flex flex-col items-center mb-0 h-[95%] w-full">
		<img class="object-cover w-full h-full mb-0" src={current.src} alt={current.alt} />
		<figcaption class="text-sm text-gray-500">{current.alt}</figcaption>
	</figure>

	<div class="flex items-center justify-between px-4 mt-2 not-prose">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
		<p role="button" tabindex="-1" on:click={() => index--} class="cursor-pointer">&lt</p>
		<p class="font-medium">{index + 1} of {images.length}</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
		<p role="button" tabindex="0" on:click={() => index++} class="cursor-pointer">&gt</p>
	</div>
</div>
