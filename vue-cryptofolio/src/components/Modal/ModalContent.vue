<template>
  <EditAsset v-if="isEditAsset" />
  <Success v-else-if="displaySuccess" />
  <AddNewAsset v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import Success from './Success';
import AddNewAsset from './AddNewAsset';
import EditAsset from './EditAsset';

export default {
  name: 'ModalContent',
  components: {
    Success,
    AddNewAsset,
    EditAsset,
  },
  computed: mapGetters(['isEditAsset', 'displaySuccess']),
};
</script>
