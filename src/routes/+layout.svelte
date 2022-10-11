<script lang="ts">
  import '../scss/styles.scss'
  import { onMount } from 'svelte'
  import { modalShowStore } from '../data/stores'

  onMount(async () => {
    const bootstrap = await import('bootstrap')
  })

  import Sidebar from './nav/Sidebar.svelte'
</script>

<div class="container-fluid p-0">
  <div class="row m-0">
    <div class="col-2 p-0">
      <Sidebar />
    </div>

    <div class="col-10 pt-2">
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
