<script setup>
import { ref, computed } from "vue";

import { BaseButton } from "@uikit";
import { filterProps } from "@stores";
import { useTrans } from "@packages/lang";
import FilterCategory from "./filters/FilterCategory.vue";
import FilterCategoryInline from "./filters/FilterCategoryInline.vue";
import FilterPoint from "./filters/FilterPoint.vue";
import FilterDate from "./filters/FilterDate.vue";

const { trans } = useTrans();

const emit = defineEmits(["reload"]);

const filter = ref({
    categoryIds: null,
    pointIds: null,
    dateStart: null,
    dateEnd: null,
});

const emitReload = () => {
    emit("reload", filter.value);
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
                v-model="filter.categoryIds"
            />
            <FilterPoint v-if="!hideFilterPoint" v-model="filter.pointIds" />
            <FilterDate
                v-if="!hideFilterDate"
                v-model="filter.dateStart"
                type="dateStart"
            >
                {{ trans["date_start"] }}
            </FilterDate>
            <FilterDate
                v-if="!hideFilterDate"
                v-model="filter.dateEnd"
                type="dateEnd"
            >
                {{ trans["date_end"] }}
            </FilterDate>
            <FilterCategoryInline
                v-if="!hideFilterCategory && categoryFilterType === 'inline'"
                v-model="filter.categoryIds"
            />
        </div>
        <BaseButton class="header__show-btn" @click="emitReload">
            {{ trans["show"] }}
        </BaseButton>
    </header>
</template>
