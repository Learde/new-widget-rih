<template>
    <div class="inv-list">
        Inventory List
        <div>
            <inventory-card
                v-for="inv in inventories"
                :key="inv.id"
                :title="inv.title"
                :id="inv.id"
                :category="inv?.category?.title"
                :prices="inv.prices"
                :image="inv.avatar"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getInventories } from "@/api";
import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";

const inventories = ref([]);

onMounted(async () => {
    try {
        inventories.value = (
            await getInventories({ include: "option,category,point" })
        )?.data?.array;
    } catch (e) {
        console.log(e.message);
    }
});
</script>
