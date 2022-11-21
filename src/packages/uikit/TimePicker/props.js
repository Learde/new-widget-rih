export default {
    timePicker: {
        type: Boolean,
        default: true,
    },
    minutesGridIncrement: {
        type: Number,
        default: 1,
    },
    hideInputIcon: {
        type: Boolean,
        default: true,
    },
    inputClassName: {
        type: String,
        default: "time-picker__input",
    },
    menuClassName: {
        type: String,
        default: "time-picker__calendar",
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
    placeholder: {
        type: String,
        default: "Выберите время",
    },
};
