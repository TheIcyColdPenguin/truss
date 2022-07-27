<script lang="ts">
	import Sidebar from './sidebar.svelte';
</script>

<div class="main-component">
	<Sidebar />
	<section class="content-container">
		<slot />
	</section>
</div>

<style lang="scss" global>
	@import './global';

	.main-component {
		display: grid;
		grid-template-columns: minmax(300px, 20%) 1fr;
		max-height: 100vh;
		overflow-y: hidden;
	}

	.main-component section.content-container {
		min-height: 100vh;
		max-height: 100vh;
		overflow-y: scroll;
		padding-block: 1rem;
		padding-inline: 1.5rem;
	}
</style>
