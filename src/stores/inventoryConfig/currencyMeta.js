import { h } from "vue";

import {
    IconShekelSign,
    IconLariSign,
    IconYenSign,
    IconBahtSign,
    IconLiraSign,
    IconHryvniaSign,
    IconTengeSign,
    IconEuroSign,
    IconDollarSign,
    IconRubleSign,
} from "@icons";
export const currencies = [
    {
        id: 1,
        title: "Рубль",
        const: "RUB",
        icon: IconRubleSign,
    },
    {
        id: 2,
        title: "Доллар",
        const: "USD",
        icon: IconDollarSign,
    },
    {
        id: 3,
        title: "Евро",
        const: "EUR",
        icon: IconEuroSign,
    },
    {
        id: 4,
        title: "Гривна",
        const: "UAH",
        icon: IconHryvniaSign,
    },
    {
        id: 5,
        title: "Белорусский рубль",
        const: "BYN",
        icon: h("span", { class: "currency-custom-icon" }, "Br"),
    },
    {
        id: 6,
        title: "Казахстанский тенге",
        const: "KZT",
        icon: IconTengeSign,
    },
    {
        id: 7,
        title: "Лира",
        const: "YTL",
        icon: IconLiraSign,
    },
    {
        id: 8,
        title: "Хорватская куна",
        const: "HRK",
        icon: h("span", { class: "currency-custom-icon" }, "Kn"),
    },
    {
        id: 9,
        title: "Индонезийская рупия",
        const: "IDR",
        translate: "words.currency_idr",
        icon: h("span", { class: "currency-custom-icon" }, "Rp"),
    },
    {
        id: 10,
        title: "Дирхам",
        const: "AED",
        icon: h("span", { class: "currency-custom-icon" }, "Dh"),
    },
    {
        id: 11,
        title: "Китайский юань",
        const: "CNY",
        icon: IconYenSign,
    },
    {
        id: 12,
        title: "Тайский бат",
        const: "THB",
        icon: IconBahtSign,
    },
    {
        id: 13,
        title: "Грузинский лари",
        const: "GEL",
        icon: IconLariSign,
    },
    {
        id: 15,
        title: "Израильский шекель",
        const: "ILS",
        icon: IconShekelSign,
    },
    {
        id: 16,
        title: "Узбекский сум",
        const: "UZS",
        icon: h("span", { class: "currency-custom-icon" }, "So'm"),
    },
];
