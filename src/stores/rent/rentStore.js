import { defineStore } from "pinia";
import { ref } from "vue";
import { Duration } from "luxon";

export const useRentStore = defineStore("rent", () => {
    const minRent = ref(null);
    function setMinRent(duration) {
        if (duration) {
            console.log(
                Duration.fromISO(duration),
                Duration.fromISO(duration).toMillis()
            );
            minRent.value = Duration.fromISO(duration).toMillis();
        }
    }

    return {
        minRent,
        setMinRent,
    };
});
