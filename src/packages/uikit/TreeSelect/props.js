import { normalizer } from "./helpers";

export default {
    modelValue: [Array, Object],
    options: Array,
    placeholder: {
        type: String,
        default: "Выберите из списка",
    },
    noResultsText: {
        type: String,
        default: "Нет подходящих данных",
    },
    noChildrenText: {
        type: String,
        default: "Отсутствуют дочерние элементы",
    },
    noOptionsText: {
        type: String,
        default: "Данные отсутствуют",
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
    hasError: {
        type: Boolean,
        default: false,
    },
};
