<script lang="ts">
  import type QRCodeStyling from 'qr-code-styling/lib/core/QRCodeStyling';
  import Box from './Box.svelte';
  import axios from 'axios';
  import { push } from 'svelte-spa-router';

  function navigate() {
    push('/save-qr-code');
  }

  import { onMount } from 'svelte';
    import SaveQrCode from './saveQrCode.svelte';

    export let qrCode: QRCodeStyling;

    export let language: string;
    
    let selectedType: any;
    let downloadButton: string;
    let responseData: any;
    let saveQrButton: string;
    let qrCodePage: any;

    function download() {
            qrCode.download({
        name: "qr_code",
        extension : selectedType
      });
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
      downloadButton = responseData[language]?.downloadButton;
      saveQrButton = responseData[language]?.save;
      qrCodePage = responseData[language]?.qrPage;
    }
  }
  console.log('Selected type', selectedType);
  async function saveJson() {

    try {
        const response = await axios.post('http://localhost:3000/', qrCode._options);
        console.log('Sauvegarde réussie', response);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde', error);
    }
}
</script>
    <div class="flex-wrap">
      <button on:click={saveJson} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{saveQrButton}</button>
      <button on:click={navigate} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{qrCodePage}</button>
      <h2 class="mb-2">{downloadButton}</h2>
      <button on:click={() => selectedType = 'jpeg'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">JPEG</button>
      <button on:click={() => selectedType = 'png'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">PNG</button>
      <button on:click={() => selectedType = 'svg'}  on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">SVG</button>
      <button on:click={() => selectedType = 'webp'} on:click={download} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">WEBP</button>
    </div>