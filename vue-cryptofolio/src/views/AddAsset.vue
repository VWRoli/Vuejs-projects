<template>
  <section id="add-asset">
    <header class="header">
      <div class="header-text">
        <h1>Add New Asset</h1>
        <h3>Please Select or Search your Coin</h3>
      </div>
      <button type="button" class="primary-btn">
        <router-link to="/portfolio">My Portfolio</router-link>
      </button>
    </header>

    <SearchBar />
    <AssetList />
  </section>
</template>

<script>
import SearchBar from '@/components/AddAsset/SearchBar';
import AssetList from '@/components/AddAsset/AssetList';

export default {
  components: {
    SearchBar,
    AssetList,
  },
};
</script>
