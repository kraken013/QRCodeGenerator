<script lang="ts">
    import NavBar from '../components/NavBar.svelte';
    import Box from '../components/Box.svelte';
    import ContentQrCode from '../components/ContentQrCode.svelte';
    import GenerateQrCode from '../components/generateQrCode.svelte';
    import StyleQrCode from '../components/styleQrCode.svelte';
    
    $: themeName = `light`;
    $: language = `fr`;
    let input = 'Hello World';
    let selectedType = 'default';
    let colorValue = '#000000';
    let dropedImage = "";
    
    function updateType(newType: string) {
      selectedType = newType;
    }
    
    function updateColor(newColor: string) {
      colorValue = newColor;
    }
    
    function updateTheme(newTheme: string) {
      themeName = newTheme;
    }
    
    function updateLanguage(newLanguage: string) {
      language = newLanguage;
    }
    
    function updateInput(newInput: string) {
      input = newInput;
    }

    function updateDropedImage(files: FileList) {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        dropedImage = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
    
    
  </script>
  
  
  <NavBar language={language} themeName={themeName} on:updateTheme={ e => updateTheme(e.detail) } on:updateLanguage={ e => updateLanguage(e.detail) } />
    <svelte:head>
      <link rel="stylesheet" href={`./../public/css/${themeName}.css`} />
    </svelte:head>
    
    <main class="flex flex-wrap items-center justify-center">
      <div class="container flex flex-wrap items-start justify-center">
        <div class="w-full p-6 space-y-6 left-column">
          <Box>
            <ContentQrCode 
            language={language} 
            input={input} 
            on:updateInput={e => updateInput(e.detail)}  
            on:updateLanguage={e => updateLanguage(e.detail)} 
            />
          </Box>
          
          <Box>
            <StyleQrCode language={language} {selectedType} {colorValue} on:updateType={e => updateType(e.detail)} on:updateColor={e => updateColor(e.detail)} />
              <div class="flex flex-wrap items-center justify-center">
                <div class="flex flex-wrap items-center justify-center">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 border border-blue-500 w-40 h-10 flex items-center justify-center">
                    <span>Image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      on:change={e => updateDropedImage(e.target.files)}
                    />
                  </label>
                </div>
              </div>
          </Box>
            

          </div>
          
          <div class="w-full space-y-6 right-column">
            <div class="p-6 qr-code">
              <GenerateQrCode langage={language} text={input} selectedType={selectedType} colorValue={colorValue} dropedImage={dropedImage} />
            </div>
          </div>
        </div>
      </main>
      
  <style>
    @media (min-width: 350px) {
      .left-column {
        margin-top: 14vh;
        width: 100%;
      }
      .right-column {
        margin: 0;
        width: 100%;
      }
    }
  
    @media (min-width: 819px) {
      main {
        margin-top: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
      }
      .left-column {
        margin: 0;
        width: 50%;
      }
      .right-column {
        margin: 0;
        width: 50%;
      }
    }
  </style>
  
  