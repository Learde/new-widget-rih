import ru from "./ru.js";
import en from "./en.js";
import { ref } from "vue";

let translations = {
    ru,
    en,
};

export const useTrans = () => {
    const trans = ref(ru);
    const lang = ref("ru");

    function setTranslations(l) {
        trans.value = translations[l];
        lang.value = l;
    }

    setTranslations("en");

    return { trans, lang, setTranslations };
};
