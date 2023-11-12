<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';

	const dispatch = createEventDispatcher();
	export let language: string;
	export let input: any;

  let contentTitle: string;
  let contentUrlButton: string;
  let contentEmailButton: string;
  let contentTextButton: string;
  let InputURL: string;
  let InputEmail: string;
  let InputText: string;

  let responseData: any;
  	let dataType = 'URL';

	let inputData : any = {
		URL: '',
		Email: '',
		Text: '',
	};


  onMount(() => {
    axios.get('/src/language.json')
      .then((response: { data: any; }) => {
        responseData = response.data;
      })
      .catch((error: any) => {
        console.error("Erreur lors de la récupération du fichier JSON:", error);
      });
  });

  $: {
    if (language && responseData && typeof responseData === 'object') {
      contentTitle = responseData[language]?.contentTitle;
	  contentUrlButton = responseData[language]?.contentButton[0];
	  contentEmailButton = responseData[language]?.contentButton[1];
	  contentTextButton = responseData[language]?.contentButton[2];
	  InputURL = responseData[language]?.inputURL;
	  InputEmail = responseData[language]?.inputEmail;
	  InputText = responseData[language]?.inputText;
    }
  }

	function handleInput(event: any) {
		const { value } = event.target;
		inputData[dataType] = value;
		dispatch('updateInput', inputData[dataType]);
	}
</script> 

<h2>{contentTitle}</h2>

<div class="flex-wrap items-center justify-center gap-8 mx-auto">
	<button on:click={() => dataType = 'URL'} class="p-1 mt-2 mb-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{contentUrlButton}</button>
	<button on:click={() => dataType = 'Email'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{contentEmailButton}</button>
	<button on:click={() => dataType = 'Text'} class="p-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{contentTextButton}</button>
</div>

<div>
	{#if dataType === 'URL'}
		<input type="text" bind:value={inputData.URL} on:input={handleInput} placeholder={InputURL} class="w-full" />
	{:else if dataType === 'Email'}
		<input type="email" bind:value={inputData.Email} on:input={handleInput} placeholder={InputEmail} />
	{:else if dataType === 'Text'}
		<input type="text" bind:value={inputData.Text} on:input={handleInput} placeholder={InputText} />
	{/if}
</div>
