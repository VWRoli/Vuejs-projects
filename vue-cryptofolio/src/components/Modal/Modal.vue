<template>
  <div class="modal-overlay" :class="isModalOpen ? 'show-modal' : ''">
    <div class="modal-container">
      <button type="button" class="close-modal">
        <i class="fas fa-times icons"></i>
      </button>
      <ModalContent />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalContent from './ModalContent';

export default {
  name: 'Modal',
  components: { ModalContent },
  computed: mapGetters(['isModalOpen']),
};
</script>
