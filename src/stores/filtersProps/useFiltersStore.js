import { defineStore } from "pinia";
import { ref } from "vue";

export const useFiltersStore = defineStore("filters", () => {
    const data = ref({
        categoryIds: null,
        pointIds: null,
        dateStart: null,
        dateEnd: null,
    });

    return { data };
});
