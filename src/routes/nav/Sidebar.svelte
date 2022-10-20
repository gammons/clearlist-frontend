<script lang="ts">
  import { page } from '$app/stores'

  import { userStore } from '../../data/stores'

  $: path = $page.url.pathname
</script>

<div class="sidebar d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white bg-dark min-vh-100">
  <a
    href="/"
    class="d-flex align-items-center pt-3 mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
  >
    <span class="fs-4 d-none d-sm-inline">Clearlist.io</span>
  </a>
  <hr />
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="/" class="nav-link {path == '/' ? 'active' : 'text-white'}" aria-current="page">
        <i class="icon bi-bar-chart-line" />
        Home
      </a>
    </li>
    <li>
      <a
        href="/verify"
        class="nav-link {path == '/verify' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <i class="icon bi-check" />
        List Verify
      </a>
    </li>
    <li>
      <a
        href="/integrations"
        class="nav-link {path == '/integrations' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <i class="icon bi-arrow-left-right" />
        Integrations
      </a>
    </li>
    <li>
      <a
        href="/usage"
        class="nav-link {path == '/usage' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <i class="icon bi-speedometer" />
        Usage
      </a>
    </li>
  </ul>
  <hr />
  <div class="dropdown">
    <a
      href="#"
      class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
      id="dropdownUser1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img src={$userStore.imageUrl} alt="" width="32" height="32" class="rounded-circle me-2" />
      <strong>{$userStore.name}</strong>
    </a>
    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
      <li><a class="dropdown-item" href="#">Verify new list...</a></li>
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item" href="#">Sign out</a></li>
    </ul>
  </div>
</div>

<style>
  .sidebar {
    height: 100%;
    position: fixed;
    z-index: 1;
    top:0;
    left: 0;
  }
</style>
