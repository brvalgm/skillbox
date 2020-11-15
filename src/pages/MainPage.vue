<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      
      <ProductFilter :product-filter.sync="productFilter"/>

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingField">Произошла ошибка при загузке товаров <button @click.prevent="loadProducts">Попробовать еще раз!</button> </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>        
      </section>  
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/product/ProductFilter';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

export default {
  components: {
    ProductFilter,
    ProductList,
    BasePagination   
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      productFilter: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0
      },
      productData: null,
      productsLoading: false,
      productsLoadingField: false
    }
  },
  computed: {
    products() {
      return this.productData 
        ? this.productData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url
          }
        }) 
        : [];
    },
    countProducts() {
      return this.productData ? this.productData.pagination.total : 0;
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    productFilter() {
      this.loadProducts();
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingField = false;
      clearTimeout(this.loadsProductTimer);
      this.loadsProductTimer = setTimeout(() => {
         axios.get(API_BASE_URL + 'api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.productFilter.categoryId,
            colorId: this.productFilter.colorId,
            minPrice: this.productFilter.priceFrom,
            maxPrice: this.productFilter.priceTo
          }
        }
        )
        .then(response => this.productData = response.data)        
        .catch(() => this.productsLoadingField = true)
        .then(() => this.productsLoading = false);        
      }, 0);
     
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>