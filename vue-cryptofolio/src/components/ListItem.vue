<template>
  <article
    class="list-item"
    title="coin.name"
    :class="owned ? 'owned-coin' : ''"
  >
    <img :src="coin.image" :alt="coin.name" />

    <h2>
      {{ coin.name.substring(0, 12) }} <br />
      <span v-if="owned">You already have this Coin</span>
      <span v-else>{{ coin.symbol }}</span>
    </h2>

    <button type="button" class="add-btn" @click="handleClick" v-if="!owned">
      <i class="fas fa-plus"></i>
    </button>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ListItem',
  data() {
    return {
      owned: false,
    };
  },
  props: {
    coin: Object,
  },
  methods: {
    ...mapActions(['setActiveCoin', 'openModal', 'openAddAsset']),
    handleClick() {
      this.setActiveCoin(this.coin.id);
      this.openAddAsset();
      this.openModal();
    },
    setOwned() {
      this.owned = this.allAssets.some((asset) => asset.id === this.coin.id);
    },
  },
  computed: mapGetters(['allAssets']),
  created() {
    this.setOwned();
  },
};
</script>
