<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import Box from "./Box.svelte";
    import axios from 'axios';
    
    const dispatch = createEventDispatcher();

    export let language: string;
    let responseData: any;

    let styleTitle: string;
    let styleCarre: string;
    let styleArrondi: string;
    let stylePoints: string;
    let styleClassy: string;
    let colorTitle: string;
  
  
    export let selectedType;
    export let colorValue = '#000000';
  
    function updateSelectedType(newType: string) {
      selectedType = newType;
      dispatch('updateType', newType);
    }
  
    function updateColorValue(newColor: string) {
      colorValue = newColor;
      dispatch('updateColor', newColor);
    }
    
    onMount(() => {
    axios.get('/src/language.json')
      .then((response: { data: any; }) => {
        responseData = response.data;
        console.log("RESPONSE DATA", responseData)
      })
      .catch((error: any) => {
        console.error("Erreur lors de la récupération du fichier JSON:", error);
      });
  });

  $: {
    if (language && responseData && typeof responseData === 'object') {
      styleTitle = responseData[language]?.styleTitle;
      styleCarre = responseData[language]?.styleButton[0];
      styleArrondi = responseData[language]?.styleButton[1];
      stylePoints = responseData[language]?.styleButton[2];
      styleClassy = responseData[language]?.styleButton[3];
      colorTitle = responseData[language]?.colorTitle;
    }
  }
  </script>
<div>
<h2 class="mb-4">{styleTitle}</h2>

<div>
    <Box>
        <p class="mb-2">Style :</p>
            <button on:click={() => updateSelectedType('carré')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{styleCarre}</button>
            <button on:click={() => updateSelectedType('arrondi')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{styleArrondi}</button>
            <button on:click={() => updateSelectedType('points')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{stylePoints}</button>
            <button on:click={() => updateSelectedType('classy')} class="p-1 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{styleClassy}</button>
        </Box>
        
    </div>
    <Box>        
        <p class="mb-2">{colorTitle}</p>
        
         <div class="flex flex-row items-center mx-auto">
        <input type="text" id="colorText" name="couleur1" bind:value={colorValue} on:input={() => updateColorValue(colorValue)} class="mr-2">
        <input type="color" id="color" name="couleur1" bind:value={colorValue} on:change={() => updateColorValue(colorValue)} class="w-10 rounded-full">
    </div>
    </Box>
</div>



<style>
    input[type="color"].rounded-full {
    border-radius: 100%;
    border: none;
    padding: 0.5px;
    height: 35px;
    width: 35px;
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