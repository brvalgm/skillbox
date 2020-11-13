<template>
    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар" @click.prevent="changeAmount(amount - 1)">
            <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" v-model.number="amount">

        <button type="button" aria-label="Добавить один товар" @click.prevent="changeAmount(amount + 1)">
            <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: ['amount'],
    data() {
        return {
            currentAmount: 0
        }
    },
    watch: {
        currentAmount(value) {
            this.currentAmount = value;
            this.$emit('update:amount', value);
        }
    },
    methods: {
        changeAmount(value) {
          if (value >= 0)
            this.currentAmount = value;
        }
    }
}
</script>