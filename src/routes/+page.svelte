<script lang="ts">
  console.log("page load")
  import Chart from 'chart.js/auto'
  import { onMount, afterUpdate } from 'svelte'

  import { batchesStore } from '../data/stores'
  import { userStore } from '../data/stores'
  import ApiBackend from '../data/backend/apiBackend'
  import Top from './nav/Top.svelte'
</script>

<Top title="Dashboard" />

<div class="d-flex flex-column">
  {#if $batchesStore.length == 0}
    <div class="no-batch d-flex justify-content-center align-items-center">
      <div>
        <p>You haven't verified any lists yet.</p>
        <a class="btn btn-primary">Verify a list</a>
        <a class="btn btn-primary">Set up an integration</a>
      </div>
    </div>

  {:else}
    <div class="shadow-sm p-2 m-4">
      <p>looks like you've been verifying batches, son</p>
    </div>
  {/if}
</div>
