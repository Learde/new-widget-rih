<script setup>
import { ref, computed } from "vue";

import { BaseButton } from "@uikit";
import { filterProps } from "@stores";
import FilterCategory from "./filters/FilterCategory.vue";
import FilterPoint from "./filters/FilterPoint.vue";
import FilterDate from "./filters/FilterDate.vue";

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

const { hideFilterCategory, hideFilterDate, hideFilterPoint, hideFilters } =
    filterProps;

const isTwoHidden = computed(() => {
    return (hideFilterCategory && hideFilterPoint) || hideFilterDate;
});

// import { isPastDate, isFutureDate } from "../HeaderDatePick/methods";
</script>

<template>
    <header class="header" v-if="!hideFilters">
        <div
            class="header__filters"
            :class="{ 'header__filters--two': isTwoHidden }"
        >
            <FilterCategory
                v-if="!hideFilterCategory"
                v-model="filter.categoryIds"
            />
            <FilterPoint v-if="!hideFilterPoint" v-model="filter.pointIds" />
            <FilterDate v-if="!hideFilterDate" v-model="filter.dateStart">
                Дата начала
            </FilterDate>
            <FilterDate v-if="!hideFilterDate" v-model="filter.dateEnd">
                Дата конца
            </FilterDate>
        </div>
        <BaseButton class="header__show-btn" @click="emitReload">
            Показать
        </BaseButton>
    </header>
</template>
