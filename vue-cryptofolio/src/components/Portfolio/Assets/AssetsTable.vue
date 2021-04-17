<template>
  <tbody v-if="!isLoading">
    <AssetRow v-for="asset in allAssets" :key="asset.id" :asset="asset" />
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
import { mapGetters } from 'vuex';
import AssetRow from './AssetRow';
import Loading from '../../Loading';

export default {
  name: 'AssetsTable',
  components: {
    AssetRow,
    Loading,
  },
  computed: mapGetters(['allAssets', 'isLoading']),
};
</script>
