<script lang='ts'>
  export let batch

  import { userStore, batchesStore } from '../../data/stores'
  import ApiBackend from '../../data/backend/apiBackend'

  const startBatch = async (uuid: string) => {
    const batch = $batchesStore.find((batch) => batch.uuid === uuid)
    batch.batchState = 'processing'

    const backend = new ApiBackend()
    await backend.apiRequest(`api/v1/batches/${batch.uuid}/start`, 'PUT', $userStore.token)

    batchesStore.set($batchesStore)
  }
</script>

<div class="card p-2 m-4">
  <div class="card-body">
    <h3>{batch.name}</h3>
    <div class="timestamp">Uploaded {batch.created()}</div>

    <div class="container-fluid">
      <div class="row">
        <div class="col panel">
          <ul>
            <li>Records: {batch.emailCount}</li>
            <li>State: {batch.batchState}</li>
          </ul>
        </div>

        <div class="col panel">
        </div>

        <div class="col chart">
        </div>

        <div>
          <a class="btn btn-success" on:click={() => startBatch(batch.uuid)}>Start</a>
        </div>
      </div> <!-- row -->
    </div>
  </div>
</div>


