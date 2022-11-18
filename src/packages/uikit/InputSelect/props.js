export default {
    modelValue: [Array, Object],
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
    placeholder: {
        type: String,
        default: "Выберите из списка",
    },
};
