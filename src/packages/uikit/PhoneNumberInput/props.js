export default {
    modelValue: [String, Object, Number],
    showCodeOnList: {
        type: Boolean,
        default: true,
    },
    noExample: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
        default: "primary",
    },
    preferredCountries: {
        type: Array,
        default: [
            "RU",
            "BY",
            "KZ",
            "SK",
            "TR",
            "AM",
            "AZ",
            "PT",
            "ES",
            "AE",
            "UA",
        ],
    },
};
