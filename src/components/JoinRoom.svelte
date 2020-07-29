<script>
  import { push } from 'svelte-spa-router';

  const startRoom = () => {
    if (roomCode === undefined || roomCode.length !== 4) {
      warningMessage = "You must enter a code with 4 characters.";
    } else {
      console.log(`Enter room with code ${roomCode.toUpperCase()}`);
      push(`/room/${roomCode.toUpperCase()}`);
    }
  }
  
  let roomCode = undefined;
  let warningMessage = '';
</script>

<main>
  <h2 class="bg-dark">JOIN ROOM</h2>
  <div class="my-2"></div>
  <p class="bg-dark">Room Code:</p>
  <input style="text-transform:uppercase" type="text" bind:value={roomCode} maxlength="4">
  <div class="my-2"></div>
  <button on:click="{startRoom}" class="btn btn-primary">START</button>
  {#if warningMessage}
    <p class="alert alert-danger">{warningMessage}</p>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 85%;
  }
  input {
    text-align: center;
  }
</style>