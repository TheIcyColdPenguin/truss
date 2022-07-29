<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import type { TutorialList } from 'src/routes/api/routes';

	let contents: TutorialList[] = [];
	let showing = Array(contents.length).fill(true);
	let selected = [NaN, NaN];

	onMount(async () => {
		if (!contents.length) {
			const res = await fetch('/api/routes');
			contents = await res.json();

			showing =
				JSON.parse(sessionStorage.getItem('showing') || 'null') ||
				Array(contents.length).fill(true);
			selected = parseSelected(sessionStorage.getItem('selected') || 'NaN,NaN');
		}
	});

	function parseSelected(str: string): [number, number] {
		const selected = str;
		const selectedIndexes = selected.split(',');
		if (selectedIndexes.length !== 2) return [NaN, NaN];
		return [Number(selectedIndexes[0]), Number(selectedIndexes[1])];
	}
</script>

<div>
	<h2>Truss</h2>
	{#if contents.length}
		<main in:fade={{ delay: 50 }}>
			{#each contents as folder, i}
				<section in:fly={{ x: -50, delay: 50 * i }}>
					<nav
						class={'heading' + (selected[0] === i && isNaN(selected[1]) ? ' headingselected' : '')}
						on:click|preventDefault={() => {
							sessionStorage.setItem('selected', `${i},NaN`);
							location.href = `/tutorial/${folder.foldername}`;
						}}
					>
						<span class="title">
							{folder.folderTitle}
						</span>
						<span
							on:click|stopPropagation|preventDefault={() => {
								showing[i] = !showing[i];
								sessionStorage.setItem('showing', JSON.stringify(showing));
								showing = showing;
							}}
							class={'fold' + (showing[i] ? ' folded' : '')}
						>
							&#8963;
						</span>
					</nav>
					{#if showing[i]}
						<ul>
							{#each folder.lessons as lesson, j}
								<li
									transition:fly={{ x: -50, delay: 50 * j }}
									class={'lesson' +
										(selected[0] === i && selected[1] === j ? ' lessonselected' : '')}
									on:click|preventDefault={() => {
										sessionStorage.setItem('selected', `${i},${j}`);
										location.href = `/tutorial/${folder.foldername}/${lesson.file}`;
									}}
								>
									<span>
										{lesson.title}
									</span>
								</li>
							{/each}
						</ul>
					{/if}
				</section>
			{/each}
		</main>
	{/if}
</div>

<style>
	div {
		max-height: 100vh;
		overflow-y: scroll;
		border-right: 1px solid #0000001e;
	}

	h2 {
		font-size: 2.5em;
		margin: 0;
		padding: 0;
		margin-inline: 1rem;
		margin-block-start: 0.75rem;
		margin-block-end: 0.5rem;
	}

	main {
		padding: 1em;
	}

	section {
		display: block;
	}

	nav {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: 1fr 3rem;
	}

	span.title {
		text-decoration: none;
		color: inherit;

		padding: 0.5rem;
	}

	span.fold {
		text-align: center;
		margin: 0 auto;
		color: #0000003e;
		transform-origin: 50% 50%;
		transition: all 0.25s ease;
		cursor: default;
		user-select: none;
	}

	span.fold:hover {
		color: #0000006e;
	}

	span.folded {
		transform: rotate(180deg);
	}

	ul {
		list-style: none;
		margin-block: 0.5rem;
		padding-left: 0;
	}

	.heading,
	.lesson {
		border-radius: 3px;
		transition: all 0.1s ease-in-out;
	}

	.heading {
		font-size: 1.25rem;
		font-weight: 800;
		padding-block: 0.25rem;
	}

	.lesson {
		font-weight: 400;
		padding-block: 0.25rem;
		padding-inline-start: 1rem;

		color: #0000008e;
	}

	.heading:not(.headingselected):hover,
	.lesson:not(.lessonselected):hover {
		color: #000000ee;
		background-color: #0000000e;
	}

	.headingselected,
	.lessonselected {
		background-color: #fbf5ff;
	}

	.lessonselected {
		color: #bb8aff;
		border-left: 3px solid #bb8aff;
	}

	.headingselected {
		color: #c483ff;
	}
</style>
