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
        default: "info",
    },
    translations: {
        type: Object,
        default() {
            return {
                phoneNumberLabel: "Телефон *",
                countrySelector: {
                    placeholder: "Код страны",
                    error: "Выберите код страны",
                },
                phoneInput: {
                    placeholder: "Телефон *",
                    example: "Пример:",
                },
            };
        },
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
