<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Search as SearchIcon } from "lucide-svelte";

	export const updated = () => {};
	export let value = "";
	const dispatch = createEventDispatcher();

	const update = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		dispatch("updated", value);
	};
</script>

<div class="flex pb-4 mx-auto">
	<input
		type="search"
		class="px-3 py-2.5 text-gray-700 border border-r-0 border-gray-200 rounded-l-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
		{value}
		on:input={update}
		placeholder="Search"
	/>
	<div
		class="flex items-center justify-center p-2.5 border border-gray-200 rounded-r-lg cursor-pointer"
	>
		<SearchIcon
			color="#4b5563"
			size={20}
			on:click={() => {
				value = "";
				dispatch("updated", value);
			}}
		/>
	</div>
</div>
