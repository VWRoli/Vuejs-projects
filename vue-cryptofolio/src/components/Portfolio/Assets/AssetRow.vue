<template>
  <tr>
    <p>
      {{ asset.id }}
    </p>
  </tr>
</template>

<script>
export default {
  name: 'AssetRow',
  props: {
    asset: Object,
  },
};
</script>
