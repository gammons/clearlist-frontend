<script lang="ts">
  import { userStore, modalShowStore } from '../../data/stores'

  const closeModal = () => {
    modalShowStore.set('')
  }
</script>

{#if $modalShowStore === 'verify-list'}
  <div class="modal show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Verify a new list</h1>
          <button on:click={closeModal} type="button" class="btn-close" />
        </div>

        <div class="modal-body">
          <p>here is a modal body</p>
          <p>Credits remaining: {$userStore.account.credits}</p>
          <button type="button" class="btn btn-primary">Upload CSV</button>
        </div>
      </div>
    </div>
  </div>
{/if}
