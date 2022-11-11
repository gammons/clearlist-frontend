<script lang="ts">
  import { modalShowStore } from '../../data/stores'
  import { loadStripe } from '@stripe/stripe-js'

  const closeModal = () => {
    modalShowStore.set('')
  }
</script>

<div class="modal show" style="display: {$modalShowStore ==='purchase-credits' ? 'block' : 'none'}">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Purchase credits</h2>
        <button type="button" class="btn-close" on:click={closeModal} />
      </div>

      <div class="modal-body">
        <p>Purchase credits</p>
      </div>
    </div>
  </div>
</div>
