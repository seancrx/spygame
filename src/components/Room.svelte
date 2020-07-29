<script>
  import { push } from 'svelte-spa-router';
  export let params = {};

  let roomCode = params.code;
  let category = "";
  let answer = "";

  fetch(`/api/enterRoom/${roomCode}`)
    .then(response => response.json())
    .then(data => {
      category = data.category;
      answer = data.answer;
    });

  const restart = () => {
    push('/');
  }
</script>

<main>
  <h4 class="bg-dark">Room Code: {roomCode}</h4>
  <div class="my-2"></div>
  <p class="bg-dark">Category:</p>
  <p class="bg-dark">{category}</p>
  <div class="my-2"></div>
  <p class="bg-dark">Answer:</p>
  {#if answer}
    <p class="bg-dark large">{answer}</p>
  {:else}
    <p class="bg-dark large">You Are the Spy!</p>
  {/if}
  <div class="my-2"></div>
  <button on:click={restart} class="btn btn-danger">Restart Game</button>
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 85%;
  }
</style>