<script lang="ts">
  import '../scss/styles.scss'
  import { onMount } from 'svelte'

  onMount(async () => {
    const bootstrap = await import('bootstrap')
  })
</script>

<slot />
