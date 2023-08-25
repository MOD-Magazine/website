<script lang="ts">
	export let name = "Unknown";
	export let avatar = `https://cdn.discordapp.com/embed/avatars/${
		Math.floor(Math.random() * 5) + 1
	}.png`;
</script>

<div class="flex flex-col items-center">
	<img class="rounded-full" src={avatar} alt={"avatar of " + name} loading="lazy" />
	<p>{name}</p>
</div>
