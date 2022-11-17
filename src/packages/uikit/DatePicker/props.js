export default {
    inputClassName: {
        type: String,
        default: "datepicker__input",
    },
    menuClassName: {
        type: String,
        default: "datepicker__calendar",
    },
    modelValue: [String, Date, Array, Object, Number],
    locale: {
        type: String,
        default: "ru",
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    autoApply: {
        type: Boolean,
        default: true,
    },
    closeOnAutoApply: {
        type: Boolean,
        default: false,
    },
    selectText: {
        type: String,
        default: "Выбрать",
    },
    cancelText: {
        type: String,
        default: "Отменить",
    },
    nowButtonLabel: {
        type: String,
        default: "Сейчас",
    },
    placeholder: {
        type: String,
        default: "Выберите дату",
    },
};
