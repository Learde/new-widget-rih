export default {
    modelValue: [Array, Object],
    options: {
        type: Array,
        default: null,
    },
    reduce: {
        type: Function,
        default: null,
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
        default: false,
    },
    closeOnSelect: {
        type: Boolean,
        default: true,
    },
    placeholder: {
        type: String,
        default: "Выберите из списка",
    },
};
