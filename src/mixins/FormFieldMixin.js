import BaseFormField from '@/components/base/BaseFormField';

export default {
    components: { BaseFormField },
    props: [ 'title', 'error', 'placeholder', 'value' ],
    computed: {
        dataValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
}