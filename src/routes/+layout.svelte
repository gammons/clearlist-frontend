<script lang="ts">
  import '../scss/styles.scss'
  import { onMount } from 'svelte'

  onMount(async () => {
    const bootstrap = await import('bootstrap')
  })

  import Sidebar from './nav/Sidebar.svelte'
</script>

<div class="container-fluid p-0">
  <div class="row m-0">
    <div class="col-2 p-0">
      <Sidebar />
    </div>

    <div class="col-10 pt-3">
      <div class="d-flex flex-row-reverse" style="1px solid blue">
        <button type="button" class="btn btn-primary">Verify List</button>
      </div>
      <slot />
    </div>
  </div>
</div>
