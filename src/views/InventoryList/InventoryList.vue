<script setup>
import { filterProps } from "@stores";
import { BaseLoading, BasePagination } from "@uikit";
import { useTrans } from "@packages/lang";

import InventoryCard from "@/components/InventoryCard/InventoryCard.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";

import { useListResizing } from "./lib/handleResizing.js";
import { useInventoryListStore } from "./model/useInventoryListStore.js";

const { trans } = useTrans();
const { listContainer, handleResizing, handleResizingDebounced } =
    useListResizing();
const inventoryListStore = useInventoryListStore();

inventoryListStore.handleResizing = handleResizing;
inventoryListStore.load();

window.addEventListener("resize", handleResizingDebounced);
</script>

<template>
    <div class="inv-list container" :class="filterProps.filtersPosition">
        <TheHeader @reload="inventoryListStore.load" />
        <div class="inv-list__container" ref="listContainer">
            <div class="inv-list__list">
                <div
                    v-if="inventoryListStore.shouldFillFilters"
                    class="inv-list__required"
                >
                    {{ trans["please_select"] }}
                    <span style="font-weight: bold">{{
                        inventoryListStore.requiredFiltersText
                    }}</span>
                </div>
                <BaseLoading v-else-if="inventoryListStore.isLoading" />
                <template v-else>
                    <InventoryCard
                        v-for="inv in inventoryListStore.inventories"
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
                    :page-count="inventoryListStore.totalPages"
                    :click-handler="inventoryListStore.changePage"
                    prev-text="<"
                    next-text=">"
                />
            </div>
        </div>
    </div>
</template>
