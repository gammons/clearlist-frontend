<script lang="ts">
  import { userStore } from '../../data/stores'

  export let title
</script>

<div class="top-nav p-3 d-flex flex-row justify-content-end align-items-center">
  <h3 class="flex-grow-1">{title}</h3>
  <div class="p-2">
    <span class="credits-text">Credits:</span>
    <span class="credits">{$userStore.account.credits}</span>
  </div>
  <button type="button" class="btn btn-primary">Verify New List</button>
</div>

<style>
  .credits-text {
    font-weight: bold;
  }

  .top-nav {
    border-bottom: 1px solid #ccc;
  }
</style>
