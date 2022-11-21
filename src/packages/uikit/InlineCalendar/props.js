export default {
    inline: {
        type: Boolean,
        default: true,
    },
    range: {
        type: Boolean,
        default: true,
    },
    minutesGridIncrement: {
        type: Number,
        default: 1,
    },
    inputClassName: {
        type: String,
        default: "inline-calendar__input",
    },
    menuClassName: {
        type: String,
        default: "inline-calendar__calendar",
    },
    calendarCellClassName: {
        type: String,
        default: "inline-calendar__cell",
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
