import { defineStore } from "pinia";
import { ref } from "vue";
import { Duration } from "luxon";

export const useRentStore = defineStore("rent", () => {
    const minRent = ref(null);
    function setMinRent(duration) {
        if (duration) {
            minRent.value = Duration.fromISO(duration).toMillis();
        }
    }

    return {
        minRent,
        setMinRent,
    };
});
