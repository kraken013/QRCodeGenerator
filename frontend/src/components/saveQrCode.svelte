<script lang='ts'>
  import { onMount } from 'svelte';
  import QRCodeStyling from 'qr-code-styling';
  import { getQrCodeService } from './../services/api/qrCode';

  let qrCodes = [];
  let qrCodeElements = [];

  onMount(async () => {
    qrCodes = await getQrCodeService();

    qrCodeElements.forEach(el => {
      if (el) {
        el.innerHTML = '';
      }
    });

    qrCodes.forEach((qrCodeData, index) => {
      const qrCodeOptions = {
        width: qrCodeData.qrCode._options.width,
        height: qrCodeData.qrCode._options.height,
        data: qrCodeData.qrCode._options.data,
        type: type
      };
      console.log('qrCodeOptions', qrCodeOptions);
      const qrCode = new QRCodeStyling(qrCodeOptions);
    });
  });
</script>

<div>
  {#each qrCodes as qrCode, index (qrCode)}
    <div class="qr-code-item">
      <p>Nom du QR Code: {qrCode.qrCode._options.data}</p>
      <div bind:this={qrCodeElements[index]}></div>
    </div>
  {/each}
</div>

<style>
  .qr-code-item {
    margin-bottom: 20px;
  }
</style>
