<script lang="ts">
  import { userStore, modalShowStore } from '../../data/stores'
  import VerifyListModal from '../verify/VerifyListModal.svelte'
  import PurchaseCreditsModal from '../profile/PurchaseCreditsModal.svelte'

  export let title
</script>

<VerifyListModal />
<PurchaseCreditsModal />
