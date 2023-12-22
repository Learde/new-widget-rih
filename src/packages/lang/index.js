import ru from "./ru.js";
import en from "./en.js";
import { ref } from "vue";

let translations = {
    ru,
    en,
};

let selectedLang = "ru";

export const useTrans = () => {
    const trans = ref(translations[selectedLang]);
    const lang = ref(selectedLang);

    function setTranslations(l) {
        selectedLang = l;
        trans.value = translations[l];
        lang.value = l;
    }

    return { trans, lang, setTranslations };
};
