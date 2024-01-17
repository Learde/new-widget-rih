<script setup>
import { ref, computed, onMounted } from "vue";
import { getInventories, getCategories } from "@api";
import { mapInventoryFilter } from "@helpers";
import { filterProps, generalProps } from "@stores";
import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import { BaseLoading, BasePagination } from "@uikit";
import { checkRequiredFilters, getRequiredText } from "./lib/requiredFilters";
import { useTrans } from "@packages/lang";
import { debounce } from "lodash";

const { trans } = useTrans();

const inventories = ref([]);
const loading = ref(true);
const total = ref(0);
const offset = ref(0);
const limit = ref(12);
const totalPages = computed(() => Math.ceil(total.value / limit.value));
const shouldFillFilters = ref(false);
const requiredFiltersText = ref("");
const { requiredFilters } = filterProps;
const { hiddenCategories } = generalProps;

const reloadInventories = async (filter = {}) => {
    try {
        // required filters
        if (!checkRequiredFilters(filter, requiredFilters)) {
            shouldFillFilters.value = true;
            requiredFiltersText.value = getRequiredText(
                filter,
                requiredFilters,
                trans.value
            );
            return;
        } else {
            shouldFillFilters.value = false;
            requiredFiltersText.value = "";
        }

        if (
            Array.isArray(hiddenCategories) &&
            hiddenCategories.length > 0 &&
            (!Array.isArray(filter.categoryIds) ||
                filter.categoryIds.length === 0)
        ) {
            const categories = (await getCategories()).data?.data;
            const filteredCategories = categories.filter(
                (category) => !hiddenCategories.includes(String(category.id))
            );
            filter.categoryIds = filteredCategories.map(
                (category) => category.id
            );
        }

        loading.value = true;
        const inventoriesResponse = (
            await getInventories({
                ...mapInventoryFilter(filter),
                include: "option,category,point",
                offset: offset.value,
                limit: limit.value,
            })
        ).data;
        inventories.value = inventoriesResponse.data;
        total.value = inventoriesResponse.meta.total;
        handleResizing();
    } catch (e) {
        // TODO: сообщение об ошибке
        console.log(e.message);
    } finally {
        loading.value = false;
    }
};

const changePage = (page) => {
    offset.value = (page - 1) * limit.value;
    reloadInventories();
};

const listContainer = ref(null);

const handleResizing = () => {
    // const listContainer = document.querySelector(".inv-list__container");
    listContainer.value.classList.add("inv-list__container--xs");
    if (listContainer.value.clientWidth < 700) {
        listContainer.value.classList.remove(
            "inv-list__container--md",
            "inv-list__container--xs"
        );
        listContainer.value.classList.add("inv-list__container--sm");
    } else if (listContainer.value.clientWidth <= 1045) {
        listContainer.value.classList.remove(
            "inv-list__container--sm",
            "inv-list__container--xs"
        );
        listContainer.value.classList.add("inv-list__container--md");
    } else {
        listContainer.value.classList.remove(
            "inv-list__container--sm",
            "inv-list__container--md",
            "inv-list__container--xs"
        );
    }
};
const handleResizingDebounced = debounce(handleResizing, 300, {
    maxWait: 1000,
});

window.addEventListener("resize", handleResizingDebounced);

onMounted(() => {
    reloadInventories();
});
</script>

<template>
    <div class="inv-list container" :class="filterProps.filtersPosition">
        <TheHeader @reload="reloadInventories" />
        <div class="inv-list__container" ref="listContainer">
            <div class="inv-list__list">
                <div v-if="shouldFillFilters" class="inv-list__required">
                    {{ trans["please_select"] }}
                    <span style="font-weight: bold">{{
                        requiredFiltersText
                    }}</span>
                </div>
                <BaseLoading v-else-if="loading" />
                <template v-else>
                    <InventoryCard
                        v-for="inv in inventories"
                        :key="inv.id"
                        :title="inv.title"
                        :id="inv.id"
                        :category="inv?.category?.title"
                        :prices="inv.prices"
                        :image="inv.avatar"
                    />
                </template>
            </div>
            <div class="inv-list__pagination">
                <BasePagination
                    :page-count="totalPages"
                    :click-handler="changePage"
                    prev-text="<"
                    next-text=">"
                />
            </div>
        </div>
    </div>
</template>
