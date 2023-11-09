<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let dataType = 'URL';
	let inputData = {
		URL: 'https://www.touchify.io/fr/',
		Email: 'touchify@mail.com',
		Text: 'touchify',
	};

	function handleInput(event) {
		const { type, value } = event.target;
		inputData[dataType] = value;
		dispatch('updateInput', inputData[dataType]);
	}
</script>

<h2>Contenu du QR Code</h2>

<div>
	<button on:click={() => dataType = 'URL'}>URL</button>
	<button on:click={() => dataType = 'Email'}>Email</button>
	<button on:click={() => dataType = 'Text'}>Texte</button>
</div>

<div>
	{#if dataType === 'URL'}
		<input type="text" bind:value={inputData.URL} on:input={handleInput} placeholder="Enter URL" />
	{/if}
	{#if dataType === 'Email'}
		<input type="email" bind:value={inputData.Email} on:input={handleInput} placeholder="Enter email address" />
	{/if}

	{#if dataType === 'Text'}
		<input type="text" bind:value={inputData.Text} on:input={handleInput} placeholder="Enter text" />
	{/if}
</div>
