<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import QRCodeStyling from 'qr-code-styling';
  import Box from './Box.svelte';
  import DownloadQrCode from './downloadQrCode.svelte';

  export let langage: string;

  export let text: string;
  export let selectedType: string;
  export let colorValue: string;
  export let dropedImage: string;

  let qrCode: QRCodeStyling;
  let qrContainer: HTMLElement;

  let qrSize = 150;

  function updateQRSize() {
    if (window.innerWidth > 500) {
      qrSize = 150;
      return;
    } else if (window.innerWidth > 400) {
      qrSize = 100;
      return;
    }
    else if (window.innerWidth > 300) {
      qrSize = 60;
      return;
    } else if (window.innerWidth > 200) {
      qrSize = 40;
      return;
    } else {
      qrSize = 140;
      return;
    }
}


  onMount(() => {
    updateQRSize();
    window.addEventListener("resize", updateQRSize);
    const qrCodeOptions: any = {
      width: qrSize,
      height: qrSize,
      type: "svg",
      data: text
    };

    if (dropedImage !== "") {
      qrCodeOptions.image = dropedImage;
    }

    console.log('qrCodeOptions de Generate', qrCodeOptions);
    
    qrCode = new QRCodeStyling(qrCodeOptions);
    qrCode.append(qrContainer);
  });
  
  $: if (text && qrCode) {
    qrCode.update({ data: text });
  }

  $: if (qrCode && typeof qrSize === 'number') {
    qrCode.update({ width: qrSize, height: qrSize });
  }

  $: if (dropedImage && qrCode) {
    qrCode.update({ image: dropedImage });
  }

  $: if (selectedType && qrCode) {
    let dotsType:any;
    switch (selectedType) {
      case 'carré':
        dotsType = 'square';
      break;
      case 'arrondi':
        dotsType = 'rounded';
      break;
      case 'points':
        dotsType = 'dots';
      break;
      case 'classy':
        dotsType = 'classy';
      break;
      default:
        dotsType = 'default';
      }
      
      qrCode.update({ dotsOptions: { type: dotsType } });
    }
    
    $: if (colorValue && qrCode) {
      qrCode.update({ dotsOptions: { color: colorValue } });
    }
    onDestroy(() => {
      window.removeEventListener('resize', updateQRSize);
    });

            
</script>

<Box>
  {#if text}
    <div class='flex justify-center qr-container' bind:this={qrContainer}></div>
  {/if}
</Box>

<Box>
  <DownloadQrCode language={langage} {qrCode} />
</Box>

<style>
  .qr-container {
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: auto;
}
</style>
