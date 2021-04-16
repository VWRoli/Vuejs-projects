<template>
  <AssetRow v-for="asset in allAssets" :key="asset.id" :asset="asset" />
</template>

<script>
import { mapGetters } from 'vuex';
import AssetRow from './AssetRow';

export default {
  name: 'AssetsTable',
  components: {
    AssetRow,
  },
  computed: mapGetters(['allAssets']),
};
</script>

<style></style>
