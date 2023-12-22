import { normalizer } from "./helpers";

export default {
    modelValue: [Array, Object],
    options: Array,
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
