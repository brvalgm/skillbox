<template>
    <div>
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
            <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
            <a href="#">
            {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat}} ₽
        </span>

        <BaseColors :name="'color-' + product.id" :colors="colors"/>
    </div>        
</template>>

<script>
    import BaseColors from '@/components/BaseColors';
    import gotoPage from '@/helpers/gotoPage';
    import numberFormat from '@/helpers/numberFormat';

    export default {
        components: { BaseColors },
        props: ['product'],
        filters: {
            numberFormat
        },
        computed: {
            colors() {
                return this.product.colors.map(color => {
                    return {
                        ...color,
                        value: color.code
                    }
                    });
            }
        },
        methods: {
           gotoPage
        }
    }
</script>