import ru from "./ru.js";
import en from "./en.js";
import { ref } from "vue";

let translations = {
    ru,
    en,
};

export const useTrans = () => {
    const trans = ref(ru);

    function setTranslations(lang) {
        trans.value = translations[lang];
    }

    return { trans, setTranslations };
};
