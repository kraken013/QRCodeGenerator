<script lang="ts">
    export let qrCode: QRCodeStyling;
    let selectedType = 'png';

    function download() {
      qrCode.download({
        name: "qr_code",
        extension: selectedType
      });
    }
  </script>
  
  <div class="flex space-x-4">
    <button on:click={() => selectedType = 'jpeg'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">JPEG</button>
    <button on:click={() => selectedType = 'png'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">PNG</button>
    <button on:click={() => selectedType = 'svg'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">SVG</button>
    <button on:click={() => selectedType = 'webp'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">WEBP</button>
  </div>
  
  <button class="p-2 mt-4 font-bold text-white rounded bg-slate-500 hover:bg-slate-400" on:click={download}>Télécharger le QR Code</button>
  