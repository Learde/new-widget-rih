<script setup>
import { ref, computed, onMounted } from "vue";
import { getInventories } from "@api";
import { mapInventoryFilter } from "@helpers";
import { filterProps } from "@stores";
import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import { BaseLoading, BasePagination } from "@uikit";
import { checkRequiredFilters, getRequiredText } from "./lib/requiredFilters";

const inventories = ref([]);
const loading = ref(true);
const total = ref(0);
const offset = ref(0);
const limit = ref(12);
const totalPages = computed(() => Math.ceil(total.value / limit.value));
const shouldFillFilters = ref(false);
const requiredFiltersText = ref("");
const { requiredFilters } = filterProps;

const reloadInventories = async (filter = {}) => {
    try {
        // required filters
        if (!checkRequiredFilters(filter, requiredFilters)) {
            shouldFillFilters.value = true;
            requiredFiltersText.value = getRequiredText(
                filter,
                requiredFilters
            );
            return;
        } else {
            shouldFillFilters.value = false;
            requiredFiltersText.value = "";
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
        inventories.value = inventoriesResponse.array;
        total.value = inventoriesResponse.option.total;
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

onMounted(() => {
    reloadInventories();
});
</script>

<template>
    <div class="inv-list container">
        <TheHeader @reload="reloadInventories" />
        <div class="inv-list__list">
            <div v-if="shouldFillFilters" class="inv-list__required">
                {{ requiredFiltersText }}
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
</template>
