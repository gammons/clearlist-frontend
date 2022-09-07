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

    <div class="col-10">
      <slot />
    </div>
  </div>
</div>
