<script lang="ts">
  import Top from '../nav/Top.svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { userToken } from '../../data/models/user'
  import ApiBackend from '../../data/backend/apiBackend'

  export let data
  let showAddCardForm = false
  let showAddCardAlert = false

  const api = new ApiBackend(userToken())

  const addPaymentMethod = async () => {
    showAddCardForm = true

    const resp = await api.apiRequest('/api/v1/payments/create_setup_intent', 'GET')
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY)
    const elements = stripe.elements({clientSecret: resp.client_secret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    const form = document.getElementById('payment-form')
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {error} = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href
        },
        redirect: 'if_required'
      })
      if (error) {
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
      } else {
        const resp = await api.apiRequest('/api/v1/payments/confirm_payment_method', 'POST')
        $: data.cardInfo = resp
        $: showAddCardForm = false
        $: showAddCardAlert = true
        setTimeout(() => {
          $: showAddCardAlert = false
        }, 5000)
      }
    })
  }

  const toDate = (seconds: int): Date => {
    const d = new Date(0)
    d.setUTCSeconds(seconds)
    return d.toDateString()
  }

  const toCost = (cents: int): string => {
    const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(cents / 100)
  }
</script>

<Top title="Profile" />


<div class="d-flex flex-column m-3">
  <h2>Credits</h2>

  <div>
  </div>

  <h2>Payment methods</h2>

  <div class="py-3">
    {#if data.cardInfo}
      <p>Your current card on file is a <span class="card-brand">{data.cardInfo.brand}</span> ending in {data.cardInfo.last4}.</p>
      <a class="{showAddCardForm ? 'd-none' : ''}" href='#' on:click={addPaymentMethod}>Click here to change your card on file</a>
    {:else}
      <p>You do not have a payment method on file.  In order to purchase credits, please add a payment method.</p>
      <a class="{showAddCardForm ? 'd-none' : ''}" href='#' on:click={addPaymentMethod}>Click here to add a payment method</a>
    {/if}

    <div class="alert alert-primary {showAddCardAlert ? '' :'d-none'}" role="alert">
      <p>You have successfully added a card on file.</p>
    </div>

    <form id="payment-form" class="{showAddCardForm ? '' : 'd-none'}">
      <div id="payment-element">
        <!-- Elements will create form elements here -->
      </div>
      <button class='btn btn-primary' id="submit">Submit</button>
      <div id="error-message">
        <!-- Display error message to your customers here -->
      </div>
    </form>
  </div>

  <h2>Invoices</h2>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Credits</th>
        <th scope="col">Cost</th>
        <th scope="col">Download</th>
      </tr>
    </thead>

    <tbody>
      {#each data.invoices as invoice}
        <tr>
          <td>{toDate(invoice.created)}</td>
          <td>{invoice.quantity}</td>
          <td>{toCost(invoice.total)}</td>
          <td><a href="{invoice.pdf_link}">PDF</a></td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>


<style>
  .card-brand {
    text-transform:capitalize;
  }
</style>

