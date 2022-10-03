<script lang="ts">
  import { batchesStore } from '../data/stores'
  import { userStore } from '../data/stores'
  import Top from './nav/Top.svelte'
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
    <div class="shadow-sm p-2 m-4">
      <h3>{batch.name}</h3>
      <div class="timestamp">Uploaded {batch.created()}</div>

      <div class="d-flex flex-row">
        <div style="border: 1px solid blue">
          <ul>
            <li>Records: {batch.emailCount}</li>
            <li>State: {batch.batchState}</li>
          </ul>
        </div>

        <div>
          {#if batch.batchState === 'completed'}
            <ul>
              <li>OK: {batch.okCount}</li>
              <li>OK for all: {batch.okForAllCount}</li>
              <li>Disposable: {batch.disposableCount}</li>
              <li>Failed syntax check: {batch.failedSyntaxCheckCount}</li>
              <li>Failed MX check: {batch.failedMxCheckCount}</li>
              <li>Failed SMTP check: {batch.failedSmtpCheckCount}</li>
              <li>Failed No mailbox: {batch.failedNoMailboxCount}</li>
            </ul>
          {/if}
        </div>
        <div>
          <a class="btn btn-primary" href={batch.downloadLink($userStore.token)}>download</a>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .timestamp {
    color: #aaa;
  }

  .no-batch {
    height: 70vh;
  }
</style>
