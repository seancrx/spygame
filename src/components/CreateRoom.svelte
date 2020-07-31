<script>
  import Select from 'svelte-select';
  import { push } from 'svelte-spa-router';

  // Get room code, categories and number of players
  let roomCode = '';
  let categories = [];
  let numOfPlayers = [];
  let selectedCategory = undefined;
  let selectedNumOfPlayers = undefined;

  const startRoom = () => {
    if (selectedCategory === undefined || selectedNumOfPlayers === undefined) {
      warningMessage = "You must select a category and number of players";
    } else {
      console.log(`Selected ${selectedCategory.value} with ${selectedNumOfPlayers.value} players`);

      fetch(`/api/startRoom/${roomCode}/${selectedCategory.value}/${selectedNumOfPlayers.value}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.msg);
          push(`/room/${roomCode}`);
        });
    }
  }

  let warningMessage = '';

  fetch('/api/createRoom')
    .then(response => response.json())
    .then(data => {
      roomCode = data.code;
      categories = data.categories;
      numOfPlayers = data.numOfPlayers;
    });
</script>

<main>
  <h2 class="bg-dark">CREATE ROOM</h2>
  <h4 class="bg-dark">Room Code: {roomCode}</h4>
  <div class="my-2"></div>
  <p class="bg-dark">Choose Category:</p>
  <Select items={categories} isSearchable={false} isClearable={false} bind:selectedValue={selectedCategory}></Select>
  <div class="my-2"></div>
  <p class="bg-dark">🕵️‍♂️🕵️‍♀️ Number of Players (4-15, 5 or less 1 spy, 6 to 10 2 spies, 11 or more 3 spies):</p>
  <Select items={numOfPlayers} isSearchable={false} isClearable={false} bind:selectedValue={selectedNumOfPlayers}></Select>
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
</style>