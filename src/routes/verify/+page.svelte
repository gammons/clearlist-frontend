<script lang="ts">
  import CompletedBatch from './CompletedBatch.svelte'
  import PendingBatch from './PendingBatch.svelte'
  import ProcessingBatch from './ProcessingBatch.svelte'

  import { batchesStore } from '../../data/stores'
  import { userStore } from '../../data/stores'
  import Top from '../nav/Top.svelte'

</script>

<Top title="Your Lists" />

<div class="d-flex flex-column">
  {#if $batchesStore.length == 0}
    <div class="no-batch d-flex justify-content-center align-items-center">
      <div>
        <p>You haven't verified any lists yet.</p>
        <a class="btn btn-primary">Verify a list</a>
        <a class="btn btn-primary">Set up an integration</a>
      </div>
    </div>
  {/if}

  {#each $batchesStore as batch}
    {#if batch.batchState == 'completed'}
      <CompletedBatch batch={batch} />
    {:else if batch.batchState == 'pending' }
      <PendingBatch batch={batch} />
    {:else if batch.batchState == 'processing' }
      <ProcessingBatch batch={batch} />
    {/if}
  {/each}
</div>

<style>
  .timestamp {
    color: #aaa;
  }

  .no-batch {
    height: 70vh;
  }

  .panel {
    border-right: 1px solid #aaa;
    padding-right: 20px;
  }
</style>
