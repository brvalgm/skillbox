<template>
  <component :is="currentPageCompanent" :page-params="currentPageParams" />
</template>

<script>
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import eventBus from '@/eventBus';

const routes = {
  main: "MainPage",
  product: "ProductPage"
}

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {}
    }
  },
  components: { MainPage, ProductPage, NotFoundPage },
  computed: {
    currentPageCompanent() {
      return routes[this.currentPage] || 'NotFoundPage';
    }
  
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  },
  created() {
    eventBus.$on('goto-page', (pageName, pageParam) => this.gotoPage(pageName, pageParam));
  }
}
</script>

