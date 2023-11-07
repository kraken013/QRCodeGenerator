<script lang="ts">
    import svelteLogo from './../assets/svelte.svg';
    import Switch from './../lib/Switch.svelte';
    let language: string = 'fr';
    let theme: string = 'light';

    const changeTheme = () => {
        if (theme === 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }
    }

    const changeLanguage = () => {
        if (language === 'fr') {
            language = 'en';
        } else {
            language = 'fr';
        }
    }
</script>

<nav>
    <ul>
        <li><img src={svelteLogo} alt="Svelte Logo" /></li>
        <li><h1>QR Code Generator</h1></li>        
    </ul>

    <ul>
        <li>
            <Switch bind:value={theme} label="" options={['light', 'dark']} fontSize={12} on:click={changeTheme} />
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
