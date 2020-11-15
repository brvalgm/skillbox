<template>
  <div>
    <BaseHeader />

    <router-view />

    <BaseFooter />
    
  </div>
</template>

<script>

import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { BaseHeader, BaseFooter },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');

    if (userAccessKey) {
      this.updateAccessKey(userAccessKey);
    }

    this.loadCart();
  },
  methods: {
    ...mapActions([ 'loadCart' ]),
    ...mapMutations([ 'updateAccessKey' ])
  }
}
</script>

