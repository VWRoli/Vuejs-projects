<template>
  <section id="portfolio">
    <header class="header">
      <div class="header-text">
        <h1>Your portfolio</h1>
        <h3>Keep track of your Crypto Investments</h3>
      </div>
      <!--   <button type="button" class="primary-btn" @click="setSearchQuery('')"> -->
      <button type="button" class="primary-btn">
        <router-link to="/addasset">
          <i class="fas fa-plus"></i> Add Asset</router-link
        >
      </button>
    </header>
    <div class="container">
      <Stats />
      <Assets />
    </div>
  </section>
</template>

<script>
import Assets from './Assets/Assets';
import Stats from './Stats/Stats';

export default {
  components: {
    Assets,
    Stats,
  },
};
</script>
