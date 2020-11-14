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
      productData: null
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
      clearTimeout(this.loadsProductTimer);
      this.loadsProductTimer = setTimeout(() => {
         axios.get(`https://vue-study.skillbox.ru/api/products`, {
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
        .then(response => this.productData = response.data);        
      }, 0);
     
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>