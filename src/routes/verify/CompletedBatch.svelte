<script lang='ts'>
  export let batch
  let chartRendered = false

  import Chart from 'chart.js/auto'
  import { afterUpdate } from 'svelte'
  import { userStore } from '../../data/stores'

  const renderChart = () => {
    if (chartRendered) return

    chartRendered = true

    const ctx = document.getElementById(batch.uuid)
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Ok', 'Risk', 'Invalid'],
        datasets: [
          {
            label: 'Data',
            data: [batch.okCount, batch.riskCount(), batch.invalidCount()],
            backgroundColor: ['#a3be8c', '#ebcb8b', '#bf616a']
          }
        ]
      }
    })
  }

  afterUpdate(renderChart)
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
          <ul>
            <li>OK: {batch.okCount}</li>
            <li>OK for all: {batch.okForAllCount}</li>
            <li>Disposable: {batch.disposableCount}</li>
            <li>Failed syntax check: {batch.failedSyntaxCheckCount}</li>
            <li>Failed MX check: {batch.failedMxCheckCount}</li>
            <li>Failed SMTP check: {batch.failedSmtpCheckCount}</li>
            <li>Failed No mailbox: {batch.failedNoMailboxCount}</li>
          </ul>
        </div>

        <div class="col chart">
          <canvas id={batch.uuid} width="200" height="200" />
        </div>

        <div>
          <a class="btn btn-primary" href={batch.downloadLink($userStore.token)}>Download</a>
        </div>
      </div>
    </div>
  </div>
</div>

