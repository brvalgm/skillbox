<template>
    <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentProductFilter.priceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentProductFilter.priceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentProductFilter.categoryId">
                <option value="0">Все категории</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <BaseColors :color-id.sync="currentProductFilter.colorId" :name="'color'" :colors="colors"/>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16 
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import BaseColors from '@/components/base/BaseColors';
import axios from 'axios';
import {API_BASE_URL} from '@/config.js' 

export default {
    components: {
      BaseColors
    },
    props: [
        'productFilter',
    ],
    data() {
        return {
          currentProductFilter: {
            priceFrom: 0,
            priceTo: 0,
            categoryId: 0,
            colorId: 0
          },
          categoriesData: null,
          colorsData: null
        }
    },
    watch: {
        curentPriceFrom(value) {
            this.currentProductFilter.priceFrom = value;
        },  
        curentPriceTo(value) {
            this.currentProductFilter.priceTo = value;
        }, 
        curentCategoryId(value) {
            this.currentProductFilter.categoryId = value;
        }, 
        curentColorId(value) {
            this.currentProductFilter.colorId = value;
        } 
    },
    computed: {        
        categories() {
          return this.categoriesData ? this.categoriesData.items : [];
        },
        colors() {
          return this.colorsData 
            ? this.colorsData.items.map(color => {
              return {
                ...color,
                value: color.code
              }
            })
            : [];
        }
    },
    methods: {        
        submit() {
            this.$emit('update:productFilter', Object.assign({}, this.currentProductFilter));
        },
        reset() {
            this.currentProductFilter.priceFrom = 0;
            this.currentProductFilter.priceTo = 0;
            this.currentProductFilter.categoryId = 0;
            this.currentProductFilter.colorId = 0;
            this.$emit('update:productFilter', Object.assign({}, this.currentProductFilter));
        },
        loadCategories() {
          axios.get(API_BASE_URL + 'api/productCategories')
            .then(response => this.categoriesData = response.data);
        },
        loadColors() {
          axios.get(API_BASE_URL + 'api/colors')
            .then(response => this.colorsData = response.data);
        },
    },
    created() {
      this.loadCategories();
      this.loadColors();
    }
}
</script>