<template>
  <section id="search-section">
    <form>
      <label for="search">Search your Coin: </label>
      <input type="text" name="search" id="search" />
      <button type="submit" class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </form>
    <!--  <form onSubmit="{onSubmit}">
      <label htmlFor="search">Search your Coin: </label>
      <input type='text' name='search' id='search' value={searchTerm}
      onChange={(e) => { if (e.target.value === '')
      setSearchQuery(e.target.value); setSearchTerm(e.target.value); }} />
      <button type="submit" class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </form> -->
  </section>
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<style></style>
