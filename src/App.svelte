<script lang="ts">
  import NavBar from './components/NavBar.svelte';
  import Box from './components/Box.svelte';
  import ContentQrCode from './components/ContentQrCode.svelte';
  import GenerateQrCode from './components/generateQrCode.svelte';
  import StyleQrCode from './components/styleQrCode.svelte';
  
  let themeName = `light`;
  let language = `fr`;

  let input = 'Hello World';
  let selectedType = 'default';
  let colorValue = '#000000';
  let dropedImage = "";
  
  function updateType(newType) {
    selectedType = newType;
  }

  function updateColor(newColor) {
    colorValue = newColor;
  }

  function updateTheme(newTheme) {
    themeName = newTheme;
  }

  function updateLanguage(newLanguage) {
    language = newLanguage;
  }

  function updateInput(newInput) {
    input = newInput;
  }

  console.log(themeName);
</script>


<NavBar language={language} themeName={themeName} on:updateTheme={ e => updateTheme(e.detail) } on:updateLanguage={ e => updateLanguage(e.detail) } />
<svelte:head>
  <link rel="stylesheet" href={`./../public/css/${themeName}.css`} />
</svelte:head>

<main class="flex items-center justify-center p-4 mt-16">
  <div class="container flex flex-wrap items-start justify-center gap-8 mx-auto">
    <div class="flex-1 p-6 space-y-6">
      <Box>
        <!-- <input class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" bind:value={input} type="text" placeholder="Entrez votre texte" /> -->
        <ContentQrCode {input} on:updateInput={e => updateInput(e.detail)} />
      </Box>

      <Box>
        <StyleQrCode {selectedType} {colorValue} on:updateType={e => updateType(e.detail)} on:updateColor={e => updateColor(e.detail)} />
      </Box>
      
    </div>
    
    <div class="w-1/3">
      <div class="fixed right-0 z-10 p-6 mt-10 space-y-6 top-10" style="width: 33%;">
        <GenerateQrCode text={input} selectedType={selectedType} colorValue={colorValue} dropedImage={dropedImage} />
      </div>
    </div>
  </div>
</main>

