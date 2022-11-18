<script setup>
import { ref, onMounted } from "vue";
import { getInventories } from "@api";
import { mapInventoryFilter } from "@helpers";
import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import { BaseLoading } from "@uikit";

const inventories = ref([]);
const loading = ref(true);

const reloadInventories = async (filter = {}) => {
    try {
        loading.value = true;
        inventories.value = (
            await getInventories({
                ...mapInventoryFilter(filter),
                include: "option,category,point",
            })
        ).data?.array;
    } catch (e) {
        // TODO: сообщение об ошибке
        console.log(e.message);
    } finally {
        loading.value = false;
    }
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
    </div>
</template>
