<template>
  <div
    class="modal-overlay"
    :class="isModalOpen ? 'show-modal' : ''"
    @click.self="closeModal"
  >
    <div class="modal-container">
      <button type="button" class="close-modal" @click="closeModal">
        <i class="fas fa-times icons"></i>
      </button>
      <ModalContent />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ModalContent from './ModalContent';

export default {
  name: 'Modal',
  methods: {
    ...mapActions(['closeModal']),
    handleKeyPress(e) {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    },
  },
  components: { ModalContent },
  computed: mapGetters(['isModalOpen']),
  created() {
    document.addEventListener('keydown', this.handleKeyPress);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleKeyPress);
  },
};
</script>
