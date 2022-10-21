<script lang='ts'>
  export let batch
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
            <li>Complete: {batch.percentComplete()}%</li>
          </ul>
        </div>

        <div class="col panel">
        </div>

        <div class="col chart">
          <canvas id={batch.uuid} width="200" height="200" />
        </div>

        <div>
        </div>
      </div>
    </div>
  </div>
</div>


