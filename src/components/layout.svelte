<script lang="ts">
	import Sidebar from './sidebar.svelte';
</script>

<div>
	<Sidebar />
	<section>
		<slot class="main" />
	</section>
</div>

<style>
	section {
		min-height: 100vh;
		max-height: 100vh;
		overflow-y: scroll;
		padding: 1rem;
	}

	div {
		display: grid;
		grid-template-columns: minmax(300px, 20%) 1fr;
		max-height: 100vh;
		overflow-y: hidden;
	}
</style>
