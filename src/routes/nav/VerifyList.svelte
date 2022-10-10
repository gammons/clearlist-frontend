<script lang="ts">
  let fileInput
  let uploadState = null
  let uploadedBatch = null
  let error = null

  import { get } from 'svelte/store'

  import ApiBackend, { backendUrl } from '../../data/backend/apiBackend'
  import { userStore, modalShowStore, batchesStore } from '../../data/stores'
  import BatchModel from '../../data/models/batch'

  const backend = new ApiBackend()

  const closeModal = () => {
    modalShowStore.set('')
  }

  const uploadFile = async (e) => {
    let formData = new FormData()
    formData.append('csv', fileInput.files[0])
    formData.append('graphql', true)

    const resp = await backend.apiRequest('api/v1/batches', 'POST', $userStore.token, {}, formData)
    if (resp.error) {
      $: error = resp.error
    } else {
      const batch = new BatchModel(resp)
      $: error = null
      $: uploadState = 'uploaded'
      $: uploadedBatch = batch

      $batchesStore = [batch, ...$batchesStore]
    }
  }

  const startBatch = async () => {
    $: uploadState = 'starting'
    const resp = await backend.apiRequest(
      `api/v1/batches/${uploadedBatch.uuid}/start`,
      'PUT',
      $userStore.token
    )
    closeModal()
  }
</script>

{#if $modalShowStore === 'verify-list'}
  <div class="modal show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Verify a new list</h1>
          <button type="button" class="btn-close" on:click={closeModal} />
        </div>

        <div class="modal-body">
          <p>here is a modal body</p>
          <p>Credits remaining: {$userStore.account.credits}</p>

          {#if error}
            <p>There was an error with your upload: {error}</p>
            <p>Please try another file.</p>
          {/if}

          {#if uploadState == 'uploaded'}
            <p>This will consume {uploadedBatch.emailCount} credits.</p>
            <button on:click={startBatch} type="button" class="btn btn-success">Start</button>
          {:else if uploadState == 'starting'}
            <p>Starting processing...</p>
          {:else}
            <button
              on:click={() => {
                fileInput.click()
              }}
              type="button"
              class="btn btn-primary">Upload CSV</button
            >
          {/if}
          <input style="display:none" type="file" on:change={uploadFile} bind:this={fileInput} />
        </div>
      </div>
    </div>
  </div>
{/if}
