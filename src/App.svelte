<script>
	// export let name;
	
	import Modal from 'svelte-simple-modal';
	import Router from  "svelte-spa-router";
	import Home from './components/Home.svelte';
	import JoinRoom from './components/JoinRoom.svelte';
	import CreateRoom from './components/CreateRoom.svelte';
	import Room from './components/Room.svelte';

	const routes = {
		'/': Home,
		'/join': JoinRoom,
		'/create': CreateRoom,
		'/room/:code': Room
	};
</script>

<main>
	<a href="/"><h1>Who is The Spy?</h1></a>
	<Modal>
		<Router {routes}/>
	</Modal>
	<a href="https://github.com/seancrx" target="_blank" class="credits">@seancrx</a>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		height: 100vh;
		margin: 0 auto;
	}

	h1 {
		color: var(--primary-color);
		background-color: aliceblue;
		text-transform: uppercase;
		font-weight: 600;
	}

	.credits {
		position: absolute;
		left: 5px;
		bottom: 5px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>