<script lang="ts">
	export let name = "Unknown";
	export let avatar = `https://cdn.discordapp.com/embed/avatars/${
		Math.floor(Math.random() * 5) + 1
	}.png`;
</script>

<span>
	<img src={avatar} alt={"avatar of " + name} loading="lazy" />
	<p>{name}</p>
</span>

<style>
	span {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		border-radius: 50%;
	}
</style>
