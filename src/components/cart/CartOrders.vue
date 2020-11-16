<template>
    <div>
        <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.id">
                <h3>{{ item.product.title }}</h3>
                <b>{{ item.product.price * (item.quantity || item.amount) | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
            </li>
        </ul>
        
        <div class="cart__total">
            <p>Доставка: <b>{{ costShipping }} ₽</b></p>
            <p>Итого: <b>{{ products.length | numberFormat }}</b> товара на сумму <b>{{ totalPrice + costShipping | numberFormat }} ₽</b></p>
        </div>
    </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
    props: [ 'products', 'totalPrice' ],
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