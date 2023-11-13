<script>
    import { onMount } from "svelte";
    import QRCodeStyling from "qr-code-styling";
    
    
     /**
     * @type {any}
     */
     export let image;
    /**
     * @type {any}
     */
     export let data;
    /**
     * @type {any}
     */
     export let width;
    /**
     * @type {any}
     */
     export let height;
    /**
     * @type {any}
     */
     export let errorCorrectionLevel;
    /**
     * @type {any}
     */
     export let dotsOptions;
    /**
     * @type {any}
     */
     export let backgroundOptions;
    // Ajoutez d'autres props au besoin
  
    /**
     * @type {HTMLElement | undefined}
     */
    let qrCodeElement;
    let qrCode;
  
    onMount(() => {
      qrCode = new QRCodeStyling({
        width: width,
        height: height,
        data: data,
        qrOptions: {
          errorCorrectionLevel: errorCorrectionLevel,
        },
        dotsOptions: dotsOptions,
        backgroundOptions: backgroundOptions,
        image: image,
      });
      qrCode.append(qrCodeElement);
    });
  </script>
  
  <div>
    <div class="qrcode-container" bind:this={qrCodeElement} />
  </div>
  
  <style>
    .qrcode-container {
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: hidden;
      padding: 2px;
      margin-right: 10px;
    }
  </style>
  