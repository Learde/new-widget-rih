import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { filterProps, generalProps } from "@stores";
import { useTrans } from "@packages/lang";
import { getCategories, getInventories } from "@packages/api";
import { mapInventoryFilter } from "@helpers";

import { checkRequiredFilters, getRequiredText } from "../lib/requiredFilters";

export const useInventoryListStore = defineStore("inventoryList", () => {
    const { trans } = useTrans();

    const inventories = ref([]);
    const meta = ref({
        total: 0,
        page: 1,
        perPage: 12,
    });

    const isLoading = ref(false);

    const shouldFillFilters = ref(false);
    const requiredFiltersText = ref("");
    const { requiredFilters } = filterProps;
    const { hiddenCategories } = generalProps;
    const handleResizing = ref(() => {});

    const totalPages = computed(() =>
        Math.ceil(meta.value.total / meta.value.perPage)
    );

    async function load(filters = {}) {
        try {
            if (!validateRequiredFilters(filters)) {
                return;
            }

            isLoading.value = true;

            updateCategoryVisibility(filters);

            const response = await getInventories({
                ...mapInventoryFilter(filters),
                page: meta.value.page,
                perPage: meta.value.perPage,
            });

            inventories.value = response.data;
            meta.value.total = response.meta.total;

            handleResizing.value();
        } catch (e) {
            // TODO: сообщение об ошибке
            console.log(e.message);
        } finally {
            isLoading.value = false;
        }
    }

    function changePage(page) {
        meta.value.page = page;
        load();
    }

    function validateRequiredFilters(filters) {
        if (!checkRequiredFilters(filters, requiredFilters)) {
            shouldFillFilters.value = true;
            requiredFiltersText.value = getRequiredText(
                filters,
                requiredFilters,
                trans.value
            );
            return false;
        }

        shouldFillFilters.value = false;
        requiredFiltersText.value = "";
        return true;
    }

    async function updateCategoryVisibility(filters) {
        if (
            Array.isArray(hiddenCategories) &&
            hiddenCategories.length > 0 &&
            (!Array.isArray(filters.categoryIds) ||
                filters.categoryIds.length === 0)
        ) {
            const categories = (await getCategories()).data?.data;
            const filteredCategories = categories.filter(
                (category) => !hiddenCategories.includes(String(category.id))
            );
            filters.categoryIds = filteredCategories.map(
                (category) => category.id
            );
        }
    }

    return {
        inventories,
        isLoading,
        meta,
        totalPages,

        requiredFiltersText,
        shouldFillFilters,

        handleResizing,
        load,
        changePage,
    };
});
