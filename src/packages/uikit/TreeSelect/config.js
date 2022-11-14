import { normalizer } from "./helpers";

export default {
    modelValue: [Array, Object],
    options: Array,
    placeholder: {
        type: String,
        default: "Выберите категорию",
    },
    noResultsText: {
        type: String,
        default: "Нет подходящих категорий",
    },
    noChildrenText: {
        type: String,
        default: "Отсутствуют дочерние категории",
    },
    noOptionsText: {
        type: String,
        default: "Категории отсутствуют",
    },
    clearAllText: {
        type: String,
        default: "Очистить все",
    },
    searchable: {
        type: Boolean,
        default: true,
    },
    searchNested: {
        type: Boolean,
        default: true,
    },
    flattenSearchResults: {
        type: Boolean,
        default: true,
    },
    multiple: {
        type: Boolean,
        default: true,
    },
    closeOnSelect: {
        type: Boolean,
        default: false,
    },
    normalizer: {
        type: Function,
        default: normalizer,
    },
};
