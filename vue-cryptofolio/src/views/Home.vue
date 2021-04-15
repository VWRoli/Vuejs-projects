<template>
  <section id="home">
    <div class="container">
      <div class="home-left">
        <h1>Crypto Portfolio Tracker</h1>
        <h2>
          Keep track of your profits, losses and portfolio valuation with our
          easy to use platform.
        </h2>
        <button type="button" class="primary-btn">
          <router-link to="/portfolio">Create Your Portfolio</router-link>
        </button>
      </div>
      <div class="home-right">
        <HomeList />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import HomeList from '@/components/Home/HomeList';

export default {
  components: {
    HomeList,
  },
};
</script>
