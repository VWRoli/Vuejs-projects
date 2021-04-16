<template>
  <tbody>
    <AssetRow v-for="coin in allCoinInfo" :key="coin.id" :coin="coin" />
  </tbody>
</template>

<script>
import { mapGetters } from 'vuex';
import AssetRow from './AssetRow';

export default {
  name: 'AssetsTable',
  components: {
    AssetRow,
  },
  computed: mapGetters(['allCoinInfo']),
};
</script>

<style></style>
