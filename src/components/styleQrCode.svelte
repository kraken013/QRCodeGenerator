<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Box from "./Box.svelte";
  
    const dispatch = createEventDispatcher();
  
    export let selectedType;
    export let colorValue = '#000000';
  
    function updateSelectedType(newType) {
      selectedType = newType;
      dispatch('updateType', newType);
    }
  
    function updateColorValue(newColor) {
      colorValue = newColor;
      dispatch('updateColor', newColor);
    }
  </script>
<div>
<h2 class="mb-4">Style général</h2>

<div>
    <Box>
        <p class="mb-2">Style :</p>
            <button on:click={() => updateSelectedType('carré')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Carré</button>
            <button on:click={() => updateSelectedType('arrondi')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Arrondi</button>
            <button on:click={() => updateSelectedType('points')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Points</button>
            <button on:click={() => updateSelectedType('classy')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Classy</button>
            <!-- <button on:click={() => selectedType = 'tres arrondi'} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Très arrondi</button>
            <button on:click={() => selectedType = 'classy arrondi'} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Classy arrondi</button> -->
        </Box>
        
    </div>
    <Box>        
        <p class="mb-2">Couleur :</p>
        
        <!-- <input type="checkbox" id="degrade" name="degrade" value="degrade" class="mb-2">
        <label for="degrade">Dégradé</label><br> -->
         <div class="flex flex-row items-center mx-auto">
        <input type="text" id="colorText" name="couleur1" bind:value={colorValue} on:input={() => updateColorValue(colorValue)} class="mr-2">
        <input type="color" id="color" name="couleur1" bind:value={colorValue} on:change={() => updateColorValue(colorValue)} class="w-10 rounded-full">
    </div>
        <!-- <p class="mt-2 mb-2">Couleur de fond :</p>
        <input type="checkbox" id="transparent" name="transparent" value="transparent">
        <label for="transparent">Transparent</label><br> -->
    </Box>
</div>



<style>
    input[type="color"].rounded-full {
    border-radius: 100%;
    border: none;
    height: 35px;
    width: 35px;
    padding: 1%;
    -webkit-appearance: none;
    appearance: none;
  }

  input[type="color"].rounded-full::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type="color"].rounded-full::-webkit-color-swatch {
    border: none;
    border-radius: 9999px;
  }

  #colorText {
    border: solid 1px #ccc;
    border-radius: 5px;
    height: 30px;
    width: 100px;
    padding: 1%;
  }
</style>