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
        <!-- <HomeList /> -->
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';
</script>

<style lang="scss">
#home {
  position: relative;
  height: 100vh;
  display: grid;
  place-content: center;

  .container {
    display: flex;
    align-items: center;
  }
}
.home-left {
  position: relative;
  flex: 1;
  h1 {
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 1rem;
    color: $blue-color;
  }
  button {
    @include primary-btn($green-gradient, $green-inverse-gradient);
    width: fit-content;
  }
}
.home-right {
  position: relative;
  flex: 1;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding-bottom: 1rem;
}

.img-wrapper {
  max-width: 45px;
}

@media screen and(max-width: 1300px) {
  #home {
    display: flex;

    .container {
      flex-direction: column;
      height: 80vh;
    }
  }
  .home-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
@media screen and(max-width: 950px) {
  #home {
    font-size: 0.9rem;
  }
}
@media screen and(max-width: 800px) {
  .home-right {
    display: none;
  }
}
@media screen and(max-width: 750px) {
  #home {
    margin-top: 0;
  }
}
@media screen and(max-width: 550px) {
  .home-left {
    justify-content: center;
    button {
      width: 100%;
      margin: 2rem 0;
    }
  }
}
</style>
