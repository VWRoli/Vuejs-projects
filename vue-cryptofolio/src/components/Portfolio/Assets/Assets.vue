<template>
  <section id="assets">
    <header class="assets-header">
      <h2 class="assets-title">Your Assets</h2>
      <form>
        <label html="currency">Default Currency:</label>
        <select name="currency" id="currency">
          <option
            value="currency"
            :key="currency"
            v-for="currency in currencyTypes"
            :currency="currency"
          >
            {{ currency.toUpperCase() }}
          </option>
        </select>

        <!--   <select
          name="currency"
          id="currency"
          value="{defaultCurrency}"
          onChange="{handleChange}"
        >
          {currencies.map((currency) => { return (
          <option key="{currency}" value="{currency}">
            {currency.toUpperCase()}
          </option>
          ); })}
        </select> -->
      </form>
      <i class="fas fa-sync-alt refresh-btn"></i>
    </header>
    <table>
      <thead>
        <AssetsHeader />
      </thead>

      <tbody v-if="allAssets.length === 0">
        <tr>
          <td class="empty-table" colSpan="6">
            You don't have any assets in your portfolio.
          </td>
        </tr>
      </tbody>

      <AssetsTable />
    </table>

    <button type="button" class="clear-btn" @click="clearAssets">
      Clear Assets
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AssetsHeader from './AssetsHeader';
import AssetsTable from './AssetsTable';

const CURRENCY_URL = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;
export default {
  components: {
    AssetsHeader,
    AssetsTable,
  },
  data() {
    return {
      currencyTypes: null,
    };
  },
  methods: {
    ...mapActions(['clearAssets']),
    async fetchCurrencies() {
      const res = await fetch(CURRENCY_URL);
      const data = await res.json();
      return data;
    },
  },
  computed: mapGetters(['defaultCurrency', 'allAssets']),
  async created() {
    this.currencyTypes = await this.fetchCurrencies();
  },
};
</script>
