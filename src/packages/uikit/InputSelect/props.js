export default {
    modelValue: [Array, Object],
    enableTimePicker: {
        type: Boolean,
        default: true,
    },
    options: {
        type: Array,
        default: null,
    },
    reduce: {
        type: Function,
        default: (elem) => elem.id,
    },
    filterable: {
        type: Boolean,
        default: false,
    },
    searchable: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: true,
    },
    closeOnSelect: {
        type: Boolean,
        default: true,
    },
    hasError: {
        type: Boolean,
        default: false,
    },
};
