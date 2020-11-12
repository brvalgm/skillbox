<template>
    <div>
        <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
            <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
            <a href="#">
            {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price }} ₽
        </span>

        <BaseColors :color-id.sync="product.colorid" :name="'color-' + product.id" :colors="colors"/>
    </div>        
</template>>

<script>
    import BaseColors from './BaseColors';
    import colors from '../modules/data/colors'
    import eventBus from '@/eventBus'

    export default {
        components: { BaseColors },
        props: ['product'],
        computed: {
            colors() {
                return colors.filter(color => this.product.colors.indexOf(color.id) !== -1);
            }
        },
        methods: {
            gotoPage(pageName, pageParam) {
                eventBus.$emit('goto-page', pageName, pageParam);
            }
        }

    }
</script>