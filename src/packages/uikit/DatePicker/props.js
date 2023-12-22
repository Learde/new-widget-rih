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
    enableTimePicker: {
        type: Boolean,
        default: true,
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
    hasError: {
        type: Boolean,
        default: false,
    },
};
