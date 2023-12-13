<script setup>
import { getInventory } from "@api";
import { BaseLoading } from "@uikit";
import { onMounted, ref } from "vue";
import InventoryInfo from "@/components/InventoryInfo/InventoryInfo.vue";
// import InventoryBooking from "@/components/InventoryBooking/InventoryBooking.vue";

const props = defineProps({
    inventoryId: [String, Number],
    scrollToBooking: {
        type: Boolean,
        default: false,
    },
});

const inventory = ref(null);
const loading = ref(true);
const loadInventory = async () => {
    try {
        loading.value = true;
        inventory.value = (
            await getInventory({ id: props.inventoryId })
        )?.data.data;
    } catch (e) {
        // TODO: вывести ошибку
        console.log(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadInventory();
});
</script>

<template>
    <div class="show-page" id="show-page">
        <BaseLoading v-if="loading" />
        <InventoryInfo
            v-else
            :title="inventory.title"
            :prices="inventory.prices"
            :avatar="inventory.avatar"
            :category-title="inventory.category?.title"
            :description="inventory.description"
            :media="inventory.media"
        />
    </div>
    <!--    <div class="booking-page" id="booking-page" v-if="!loading">-->
    <!--        <InventoryBooking :inventory="inventory" />-->
    <!--    </div>-->
</template>
