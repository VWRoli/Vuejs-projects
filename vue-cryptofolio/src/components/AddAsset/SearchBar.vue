<template>
  <section id="search-section">
    <form @submit="onSubmit">
      <label for="search">Search your Coin: </label>
      <input type="text" name="search" id="search" v-model="searchTerm" />
      <button type="submit" class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    ...mapActions(['setSearchQuery', 'fetchCoinsInfo']),
    onSubmit(e) {
      e.preventDefault();
      const formatSearchTerm = this.searchTerm
        .toLowerCase()
        .trim()
        .replace(' ', '-');
      this.setSearchQuery(formatSearchTerm);
    },
  },
};
</script>
