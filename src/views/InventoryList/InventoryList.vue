<script setup>
import { ref, computed, onMounted } from "vue";
import { getInventories } from "@api";
import { mapInventoryFilter } from "@helpers";
import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import { BaseLoading, BasePagination } from "@uikit";

const inventories = ref([]);
const loading = ref(true);
const total = ref(0);
const offset = ref(0);
const limit = ref(12);
const totalPages = computed(() => Math.ceil(total.value / limit.value));

const reloadInventories = async (filter = {}) => {
    try {
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
    <div class="inv-list">
        <TheHeader @reload="reloadInventories" />
        <div class="inv-list__list">
            <BaseLoading v-if="loading" />
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
