<template>
  <Modal />
  <router-view />
</template>

<script>
import Modal from './components/Modal/Modal';
export default {
  name: 'App',
  components: {
    Modal,
  },
};
</script>
