<script lang="ts">
  import Top from '../nav/Top.svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { userToken } from '../../data/models/user'
  import ApiBackend from '../../data/backend/apiBackend'

  export let data
  let showAddCardForm = false

  const api = new ApiBackend(userToken())

  const addPaymentMethod = async () => {
    showAddCardForm = true

    const resp = await api.apiRequest('/api/v1/payments/create_setup_intent', 'GET')

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY)
    const elements = stripe.elements({clientSecret: data.clientSecret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    const form = document.getElementById('payment-form')
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {error} = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href
        }
      })
      if (error) {
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
      }
    })
  }

  const onSubmitPaymentForm = async () => {
  }
</script>

<Top title="Profile" />

<div class="d-flex flex-column m-3">
  <h2>Credits</h2>
  <div class="py-3">
    jj
  </div>

  <h2>Payment methods</h2>

  <div class="py-3">
    {#if data.cardInfo}
      <p>Your current card on file is a {data.cardInfo.brand} ending in {data.cardInfo.last4}.</p>
    {:else}
      <p>You do not have a payment method on file.  In order to purchase credits, please add a payment method.</p>
    {/if}

    {#if data.cardInfo}
    <a class="{showAddCardForm ? 'd-none' : ''}" href='#' on:click={addPaymentMethod}>Click here to change your card on file</a>
    {:else}
    <a class="{showAddCardForm ? 'd-none' : ''}" href='#' on:click={addPaymentMethod}>Click here to add a payment method</a>
    {/if}

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
</div>

