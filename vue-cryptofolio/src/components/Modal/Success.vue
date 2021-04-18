<template>
  <section className="success-message">
    <h1>Success</h1>

    <i class="far fa-check-circle success-icon"></i>

    <h2 v-if="isEditAsset">You successfully edited your asset!</h2>

    <h2 v-else>You successfully added your new asset!</h2>

    <button type="button" className="primary-btn" @click="closeModal">
      <router-link to="/portfolio">Go to my Portfolio</router-link>
    </button>
    <p v-if="!isEditAsset">
      Or add another
      <router-link to="/addasset" @click="closeModal">
        <span className="back-to-addassets"> Asset </span>
      </router-link>
    </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Success',
  methods: mapActions(['closeModal']),
  computed: mapGetters(['isEditAsset']),
};
</script>
