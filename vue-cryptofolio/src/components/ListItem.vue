<template>
  <article class="list-item" title="coin.name">
    <div class="img-wrapper">
      <img :src="coin.image" :alt="`${coin.name}`" />
    </div>
    <h2>
      {{ coin.name.substring(0, 12) }} <br />
      <!-- <span>{owned ? 'You already have this Coin' : symbol}</span> -->
      <span>{{ coin.symbol }}</span>
    </h2>

    <button type="button" class="add-btn">
      <i class="fas fa-plus"></i>
    </button>
  </article>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    coin: Object,
  },
};
</script>
