export default {
    token: String,
    devServer: {
        type: Boolean,
        default: false,
    },
    authorization: {
        type: Boolean,
        default: false,
    },
    passport: {
        type: Boolean,
        default: false,
    },
    payable: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Boolean,
        default: false,
    },
    promocode: {
        type: Boolean,
        default: false,
    },
    mail: {
        type: Boolean,
        default: false,
    },
    sorting: {
        type: Boolean,
        default: false,
    },
    gallery: {
        type: Boolean,
        default: false,
    },
    roundedCardAvatar: {
        type: Boolean,
        default: false,
    },
    hiddenCategories: {
        type: String,
        default: null,
    },
    routeAfterPay: {
        type: String,
        default: null,
    },
    showModalAfterPay: {
        type: Boolean,
        default: false,
    },
    locale: {
        type: String,
        default: "ru",
    },
};
