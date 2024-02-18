<script setup>
import { ref, computed } from "vue";

import { BaseButton } from "@uikit";
import { filterProps, useFiltersStore } from "@stores";
import { useTrans } from "@packages/lang";
import FilterCategory from "./filters/FilterCategory.vue";
import FilterCategoryInline from "./filters/FilterCategoryInline.vue";
import FilterPoint from "./filters/FilterPoint.vue";
import FilterDate from "./filters/FilterDate.vue";

const emit = defineEmits(["reload"]);

const { trans } = useTrans();
const filtersStore = useFiltersStore();

const emitReload = () => {
    emit("reload", filtersStore.data);
};

const {
    hideFilterCategory,
    hideFilterDate,
    hideFilterPoint,
    hideFilters,
    categoryFilterType,
} = filterProps;

const isTwoHidden = computed(() => {
    return (hideFilterCategory && hideFilterPoint) || hideFilterDate;
});

// import { isPastDate, isFutureDate } from "../HeaderDatePick/methods";
</script>

<template>
    <header
        class="header"
        :class="filterProps.filtersPosition"
        v-if="!hideFilters"
    >
        <div
            class="header__filters"
            :class="{ 'header__filters--two': isTwoHidden }"
        >
            <FilterCategory
                v-if="!hideFilterCategory && categoryFilterType === 'default'"
                v-model="filtersStore.data.categoryIds"
            />
            <FilterPoint
                v-if="!hideFilterPoint"
                v-model="filtersStore.data.pointIds"
            />
            <FilterDate
                v-if="!hideFilterDate"
                v-model="filtersStore.data.dateStart"
                type="dateStart"
            >
                {{ trans["date_start"] }}
            </FilterDate>
            <FilterDate
                v-if="!hideFilterDate"
                v-model="filtersStore.data.dateEnd"
                type="dateEnd"
            >
                {{ trans["date_end"] }}
            </FilterDate>
            <FilterCategoryInline
                v-if="!hideFilterCategory && categoryFilterType === 'inline'"
                v-model="filtersStore.data.categoryIds"
            />
        </div>
        <BaseButton class="header__show-btn" @click="emitReload">
            {{ trans["show"] }}
        </BaseButton>
    </header>
</template>
