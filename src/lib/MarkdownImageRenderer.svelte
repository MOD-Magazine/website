<script lang="ts">
	export let href = "";
	export let text = "";
</script>

<figure class="flex flex-col items-center mb-0">
	<img src={href} alt={text} />
	<figcaption class="text-sm text-gray-500">{text}</figcaption>
</figure>
