<script lang="ts">
    import svelteLogo from './../assets/svelte.svg';
    import Switch from './../lib/Switch.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let language: string;
    export let themeName: string;
    
   console.log(themeName);

    function selectedTheme() {
        themeName = themeName === 'light' ? 'dark' : 'light';
        dispatch('updateTheme', themeName);
        console.log(themeName);
    }
    const changeLanguage = () => {
        language = language === 'fr' ? 'en' : 'fr';
        dispatch('updateLanguage', language);
    }
</script>

<nav class="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 shadow-md">
    <ul>
        <li><img src={svelteLogo} alt="Svelte Logo" /></li>
        <li><h1>QR Code Generator</h1></li>        
    </ul>

    <ul>
        <li>
           <button on:click={selectedTheme}>
                {themeName}
            </button>
        </li>
        <li>
            <button on:click={changeLanguage}>
                {#if language === 'fr'}
                  <span>FR</span>
                {:else}
                  <span>EN</span>
                {/if}
            </button>
        </li>
    </ul>
</nav>