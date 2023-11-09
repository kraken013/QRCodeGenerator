<script lang="ts">
  import { onMount } from 'svelte';
  import QRCodeStyling from 'qr-code-styling';
  import Box from './Box.svelte';
  import DownloadQrCode from './downloadQrCode.svelte';

  export let text: string;
  export let selectedType: string;
  export let colorValue: string;
  export let dropedImage: string;

  let qrCode: QRCodeStyling;
  let qrContainer: HTMLElement;

  onMount(() => {
    const qrCodeOptions: any = {
      width: 150,
      height: 150,
      type: "svg",
      data: text
    };

    if (dropedImage !== "") {
      qrCodeOptions.image = dropedImage;
    }

    qrCode = new QRCodeStyling(qrCodeOptions);
    qrCode.append(qrContainer);
  });

  $: if (text && qrCode) {
    qrCode.update({ data: text });
  }

  $: if (selectedType && qrCode) {
    let dotsType;
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


  
</script>

<Box>
  {#if text}
    <div class='flex justify-center' bind:this={qrContainer}></div>
  {/if}
</Box>

<Box>
  <DownloadQrCode {qrCode} />
</Box>
