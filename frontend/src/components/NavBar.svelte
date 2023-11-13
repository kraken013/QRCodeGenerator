<script lang="ts">
    import svelteLogo from './../assets/svelte.svg';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
  
  
    export let language: string;
    export let themeName: string;
    console.log("NAV BAR LANG ", language)
  
  
    function selectedTheme() {
      themeName = themeName === 'light' ? 'dark' : 'light';
      dispatch('updateTheme', themeName);
      console.log(themeName);
    }
    const changeLanguage = () => {
      language = language === 'fr' ? 'en' : 'fr';
      console.log("lang", language)
      dispatch('updateLanguage', language);
    }
  </script>
  
  <nav class="fixed top-0 left-0 right-0 z-10 flex items-center p-4">
    <ul>
      <li><img src="./../public/assets/qr_icon.png" alt="QR Code Icon" style="width: 2rem; height: 2rem; object-fit: cover;" /></li>
      <li> <a href="/" >QR Code Generator</a></li>
    </ul>
  
    <ul>
      <li>
        <button on:click={selectedTheme}>
          {#if themeName === 'light'}
            <span>Dark</span>
          {:else}
            <span>Light</span>
          {/if}
        </button>
      </li>
      <li style="width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;">
        <button on:click={changeLanguage} style="overflow: hidden; width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          {#if language === 'fr'}
            <img src="./../public/assets/kindgom_gb_gbr_icon.png" alt="GB Flag" style="object-fit: cover; width: 100%; height: 100%;" />
          {:else}
            <img src="./../public/assets/france_icon.png" alt="FR Flag" style="object-fit: cover; width: 100%; height: 100%;" />
          {/if}
        </button>
      </li>
    </ul>
  </nav>
  
  <style>
    @media (min-width: 350px) {
      a {
        font-size: 1rem;
        margin-left: 1rem;
        text-decoration: none; 
        color: inherit;
      }
  
      span {
        font-size: 1rem;
      }
    }
  </style>