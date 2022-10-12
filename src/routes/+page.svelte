<script lang="ts">
  import Chart from 'chart.js/auto'
  import { onMount } from 'svelte'

  import { batchesStore } from '../data/stores'
  import { userStore } from '../data/stores'
  import ApiBackend from '../data/backend/apiBackend'
  import Top from './nav/Top.svelte'

  const startBatch = async (uuid: string) => {
    const batch = $batchesStore.find((batch) => batch.uuid === uuid)
    batch.batchState = 'processing'

    const backend = new ApiBackend()
    await backend.apiRequest(`api/v1/batches/${batch.uuid}/start`, 'PUT', $userStore.token)

    batchesStore.set($batchesStore)
  }

  onMount(async () => {
    $batchesStore.forEach((batch) => {
      const ctx = document.getElementById(batch.uuid)
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Ok', 'Risk', 'Invalid'],
          datasets: [
            {
              label: 'Data',
              data: [
                batch.okCount,
                batch.roleCount + batch.disposableCount + batch.okForAllCount,
                batch.failedSyntaxCheckCount +
                  batch.failedMxCheckCount +
                  batch.failedNoMailboxCount +
                  batch.failedSmtpCheckCount
              ],
              backgroundColor: ['#a3be8c', '#ebcb8b', '#bf616a']
            }
          ]
        }
      })
    })
  })
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
        <div class="panel">
          <ul>
            <li>Records: {batch.emailCount}</li>
            <li>State: {batch.batchState}</li>
            {#if batch.batchState === 'processing'}
              <li>Complete: {batch.percentComplete()}%</li>
            {/if}
          </ul>
        </div>

        <div class="panel">
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

        <div class="chart">
          {#if batch.batchState == 'completed' || batch.batchState == 'processing'}
            <canvas id={batch.uuid} width="200" height="200" />
          {/if}
        </div>

        <div>
          {#if batch.batchState == 'completed'}
            <a class="btn btn-primary" href={batch.downloadLink($userStore.token)}>Download</a>
          {/if}
          {#if batch.batchState == 'pending'}
            <a class="btn btn-success" on:click={() => startBatch(batch.uuid)}>Start</a>
          {/if}
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

  .panel {
    border-right: 1px solid #aaa;
    padding-right: 20px;
  }
</style>
