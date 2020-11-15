<template>
    <div>
        <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
                <h3>{{ item.product.title }}</h3>
                <b>{{ item.product.price * item.amount | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
            </li>
        </ul>
        
        <div class="cart__total">
            <p>Доставка: <b>{{ costShipping }} ₽</b></p>
            <p>Итого: <b>{{ totalAmount | numberFormat }}</b> товара на сумму <b>{{ totalPrice + costShipping | numberFormat }} ₽</b></p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
    computed: {
        ...mapGetters({
            products: 'cartDetailProducts', 
            totalPrice: 'cartTotalPrice',
            totalAmount: 'cartTotalAmount'
        })
    },
    data() {
        return {
            costShipping: 500
        }
    },
    filters: {
        numberFormat
    }
}
</script>