<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import QRCodeComponent from "./QRCodeComponent.svelte";
  import NavBar from "./NavBar.svelte";

  $: themeName = `light`;
  let language = "fr";
  let translations: any;
  let qrCodesData: any = [];

  function updateTheme(newTheme: string) {
    themeName = newTheme;
  }

  onMount(async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      qrCodesData = response.data;

      const langResponse = await axios.get("/src/language.json"); // Mettez à jour avec le chemin d'accès correct
      translations = langResponse.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  });

  $: t = language && translations ? translations[language] : {};

  function updateLanguage(newLanguage: string) {
    language = newLanguage;
  }
</script>

<NavBar
  {language}
  {themeName}
  on:updateTheme={(e) => updateTheme(e.detail)}
  on:updateLanguage={(e) => updateLanguage(e.detail)}
/>
<svelte:head>
  <link rel="stylesheet" href={`./../public/css/${themeName}.css`} />
</svelte:head>
<div class="containerQR">
  <h1>{t.savedQRTitle || "MES QRCODES ENREGISTRÉS"}</h1>
  {#each qrCodesData as qrCodeOptions}
    <div class="cardQR">
      <div class="card-infoQR">
        <h2>{qrCodeOptions.data}</h2>
        <div class="infoQR">
          <p><em>{t.type || "Type"} : </em>{qrCodeOptions.dotsOptions.type}</p>
          <p>
            <em>{t.color} : </em>{qrCodeOptions.dotsOptions.color}
          </p>
          <p><em>{t.width || "Width"} : </em>{qrCodeOptions.width}</p>
          <p><em>{t.height || "Height"} : </em>{qrCodeOptions.height}</p>
        </div>
      </div>

      <QRCodeComponent
        data={qrCodeOptions.data}
        width={qrCodeOptions.width}
        height={qrCodeOptions.height}
        errorCorrectionLevel={qrCodeOptions.qrOptions.errorCorrectionLevel}
        dotsOptions={qrCodeOptions.dotsOptions}
        backgroundOptions={qrCodeOptions.backgroundOptions}
        image={qrCodeOptions.image}
      />
    </div>
  {/each}
</div>

<style>
  .containerQR {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: relative;
    margin: 60px 0 20px 0;
  }
  .containerQR h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 30px;
  }
  h2 {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .infoQR {
    display: flex;
    flex-direction: column;
  }
  .cardQR {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 19vh;
    width: 30vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .card-infoQR {
    margin-left: 20px;
  }

  .card-infoQR p {
    font-size: 1em;
  }

  .card-infoQR em {
    font-weight: 500;
  }

  @media (min-width: 350px) {
    .containerQR {
      margin: 0;
    }

    .cardQR {
      width: 80vw;
    }
     
  }
</style>
