<script lang="ts">
  console.log("layout load")
  import '../scss/styles.scss'
  import { onMount } from 'svelte'
  import { modalShowStore } from '../data/stores'

  onMount(async () => {
    const bootstrap = await import('bootstrap')
  })

  import Sidebar from './nav/Sidebar.svelte'
</script>

<div class="container-fluid p-0">
  <div class="row flex-nowrap m-0">
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <Sidebar />
    </div>

    <div class="col pt-2 min-vh-100">
      <slot />
    </div>
  </div>
</div>

{#if $modalShowStore !== ''}
  <div class="modal-backdrop show" />
{/if}

<style>
  .credits {
    font-weight: bold;
  }
</style>
