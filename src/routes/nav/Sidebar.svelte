<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '../../lib/Icon.svelte'

  $: path = $page.url.pathname
</script>

<div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
  <a
    href="/"
    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
  >
    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap" /></svg>
    <span class="fs-4">Sidebar</span>
  </a>
  <hr />
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="/" class="nav-link {path == '/' ? 'active' : 'text-white'}" aria-current="page">
        <Icon name="activity" />
        Home
      </a>
    </li>
    <li>
      <a
        href="/verify"
        class="nav-link {path == '/verify' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <Icon name="crosshair" />
        Verify
      </a>
    </li>
    <li>
      <a
        href="/integrations"
        class="nav-link {path == '/integrations' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <Icon name="chevron-right" />
        Integrations
      </a>
    </li>
    <li>
      <a
        href="/usage"
        class="nav-link {path == '/usage' ? 'active' : 'text-white'}"
        aria-current="page"
      >
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
          Usage
        </a>
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
      <img
        src="https://github.com/mdo.png"
        alt=""
        width="32"
        height="32"
        class="rounded-circle me-2"
      />
      <strong>mdo</strong>
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
    height: 100vh;
  }
</style>
