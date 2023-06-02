<script lang="ts">
    import { onMount } from 'svelte';
  
    let cards = [
      { title: 'Fit Lékárna', location: 'Olomouc' },
      // Další karty zde
    ];
  
    onMount(() => {
      // Volání funkce pro načtení dat karet nebo jiné inicializační úkoly
    });
  </script>
  
  <style lang="postcss">
    .card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .card {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
      background-color: #4CAF50;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      animation: pulse 2s infinite;
    }
  
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  </style>
  
  <main>
    <div class="flex justify-center">
      <div class="card-container">
        {#each cards as card}
          <div class="card">
            <h3>{card.title}</h3>
            <p>Město: {card.location}</p>
          </div>
        {/each}
      </div>
    </div>
  </main>
  