<template>
    <ul class="colors" :class="{'colors--black' : name != 'color'}">
        <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label" >
                <input class="colors__radio sr-only" type="radio" :name="name" :value="color.id" v-model.number="currentColorId">
                <span class="colors__value" :style="{ backgroundColor: color.value }"> 
                </span>
            </label>
        </li>        
    </ul>
</template>

<script>
export default {
    model: {
        prop: 'colorId',
        event: 'changeColor'
    },
    props: ['colorId', 'name', 'colors'],
    computed: {
        currentColorId: {
            get() {
                return this.colorId;
            },
            set(value) {
                this.$emit('update:colorId', value);
            }
        }
    }
}
</script>