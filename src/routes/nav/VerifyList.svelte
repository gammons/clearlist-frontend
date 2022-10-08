<script lang="ts">
  let fileInput
  let state = null

  import { get } from 'svelte/store'

  import ApiBackend, { backendUrl } from '../../data/backend/apiBackend'
  import { userStore, modalShowStore, batchesStore } from '../../data/stores'
  import BatchModel from '../../data/models/batch'

  const closeModal = () => {
    modalShowStore.set('')
  }

  const uploadFile = async (e) => {
    let formData = new FormData()
    formData.append('csv', fileInput.files[0])
    formData.append('graphql', true)

    const backend = new ApiBackend()

    const resp = await backend.apiRequest('api/v1/batches', 'POST', $userStore.token, {}, formData)
    console.log('resp = ', resp)
    const batch = new BatchModel(resp)
    console.log('batch = ', batch)
    $batchesStore = [batch, ...$batchesStore]
    state = 'uploaded'
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
          <button
            on:click={() => {
              fileInput.click()
            }}
            type="button"
            class="btn btn-primary">Upload CSV</button
          >
          <input style="display:none" type="file" on:change={uploadFile} bind:this={fileInput} />
        </div>
      </div>
    </div>
  </div>
{/if}
