<script lang="ts">
  import type QRCodeStyling from 'qr-code-styling/lib/core/QRCodeStyling';
  import Box from './Box.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';

    export let qrCode: QRCodeStyling;


    export let language: string;
    let selectedType = 'png';
    let downloadButton: string;
    let responseData: any;

    function download() {
      qrCode.download({
        name: "qr_code",
        extension : selectedType
      });
    }

    onMount(() => {
    axios.get('/src/language.json')
      .then(response => {
        responseData = response.data;
        console.log("RESPONSE DATA", responseData)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du fichier JSON:", error);
      });
  });

  $: {
    if (language && responseData && typeof responseData === 'object') {
      downloadButton = responseData[language]?.downloadButton;
    }
  }
  </script>
    <div class="flex-wrap">
      <h2 class="mb-2">{downloadButton}</h2>
      <button on:click={() => selectedType = 'jpeg'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">JPEG</button>
      <button on:click={() => selectedType = 'png'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">PNG</button>
      <button on:click={() => selectedType = 'svg'}  on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">SVG</button>
      <button on:click={() => selectedType = 'webp'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">WEBP</button>
    </div>
  
  