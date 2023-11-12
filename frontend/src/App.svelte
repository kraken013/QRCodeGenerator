<script lang='ts'>
  import Router from 'svelte-spa-router';
  import Home from './routes/myHome.svelte';
  import MyQrCode from './routes/myQrCode.svelte';

  const routes = {
    '/': Home,
    '/save-qr-code': MyQrCode,
  };
</script>

<Router {routes} />

