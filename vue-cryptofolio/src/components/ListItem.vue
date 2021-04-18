<template>
  <article class="list-item" title="coin.name">
    <img :src="coin.image" :alt="coin.name" />

    <h2>
      {{ coin.name.substring(0, 12) }} <br />
      <!-- <span>{owned ? 'You already have this Coin' : symbol}</span> -->
      <span>{{ coin.symbol }}</span>
    </h2>

    <button type="button" class="add-btn" @click="handleClick">
      <i class="fas fa-plus"></i>
    </button>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ListItem',
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
  },
};
</script>
