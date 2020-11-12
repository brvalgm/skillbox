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
import products from '@/modules/data/products'
import ProductList from '@/components/ProductList'
import BasePagination from '@/components/BasePagination'
import ProductFilter from '@/components/ProductFilter'

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
      }
    }
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.productFilter.priceFrom > 0)
        filteredProducts = filteredProducts.filter(product => product.price > this.productFilter.priceFrom);

      if (this.productFilter.priceTo > 0)
        filteredProducts = filteredProducts.filter(product => product.price < this.productFilter.priceTo);

      if (this.productFilter.categoryId)
        filteredProducts = filteredProducts.filter(product => product.categoryid === this.productFilter.categoryId);
      
      if (this.productFilter.colorId)
        filteredProducts = filteredProducts.filter(product => product.colors.indexOf(this.productFilter.colorId) !== -1);

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    }
  }
};
</script>