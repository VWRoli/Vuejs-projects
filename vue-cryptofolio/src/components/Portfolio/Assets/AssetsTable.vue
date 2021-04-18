<template>
  <tbody v-if="!isLoading && !isError">
    <AssetRow v-for="asset in allAssets" :key="asset.id" :asset="asset" />
  </tbody>
  <tbody v-else-if="isError">
    <tr>
      <td colSpan="6">
        <Error />
      </td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td colSpan="6">
        <Loading />
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AssetRow from './AssetRow';
import Loading from '../../Loading';
import Error from '../../Error';

export default {
  name: 'AssetsTable',
  components: {
    AssetRow,
    Loading,
    Error,
  },
  methods: {
    ...mapActions(['fetchCoinsInfo']),
  },
  computed: mapGetters(['allAssets', 'isLoading', 'isError']),
  created() {
    this.fetchCoinsInfo('usd');
  },
};
</script>
