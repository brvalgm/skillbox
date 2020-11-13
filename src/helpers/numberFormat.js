export default function numberFormat(value) {    
    if (parseInt(value)) {
        return new Intl.NumberFormat().format(value);
    } else {
        return 0;
    }
}