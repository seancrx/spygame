<script>
import { link } from 'svelte-spa-router';
import { getContext } from 'svelte';

import Help from './Help.svelte';

const { open } = getContext('simple-modal');

const showHelp = () => {
  open(Help, { message: "Among the room, there are spies who don't know what the actual answer is. Each player takes turn to describe the answer including the spies. The spies have to guess what the answer is by analyzing how other describe it. After each round, the spies can come out and say the actual answer and win if they are confident, players can vote one person as spy and kick the person out. Players win by finding out all the spies, spies win by successfully guess what the answer is." });
}
</script>

<main>
  <a href="/join" use:link class="btn btn-success my-2">JOIN ROOM</a>
  <a href="/create" use:link class="btn btn-primary my-2">CREATE ROOM</a>
  <button class="btn my-2" on:click={showHelp}>❔❓ How to play</button>
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 85%;
  }
</style>