<script lang="ts">
  import { userStore, modalShowStore } from '../../data/stores'
  import VerifyListModal from '../verify/VerifyListModal.svelte'
  import Modals from './Modals.svelte'

  const openModal = (modalKey: string) => {
    modalShowStore.set(modalKey)
  }

  export let title
</script>

<div class="top-nav p-3 d-flex flex-row justify-content-end align-items-center">
  <h3 class="flex-grow-1">{title}</h3>
  <div class="px-4">
    <div>
    <span class="credits-text">Credits:</span>
    <span class="credits">{$userStore.account.credits.toLocaleString()}</span>
    </div>
    <a class="link" on:click={() => openModal('purchase-credits') }>Need more?</a>
  </div>
  <button on:click={() => openModal('verify-list')} type="button" class="btn btn-primary">Verify New List</button>
</div>

<Modals />

<style>
  .credits {
    font-weight: bold;
  }

  .top-nav {
    border-bottom: 1px solid #ccc;
  }

  .link {
    cursor: hand;
  }
</style>
