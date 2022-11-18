<script setup>
import { ref } from "vue";

import { BaseButton } from "@uikit";
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

// import { isPastDate, isFutureDate } from "../HeaderDatePick/methods";
</script>

<template>
    <header class="header">
        <div class="header__filters">
            <FilterCategory v-model="filter.categoryIds" />
            <FilterPoint v-model="filter.pointIds" />
            <FilterDate v-model="filter.dateStart"> Дата начала </FilterDate>
            <FilterDate v-model="filter.dateEnd"> Дата конца </FilterDate>
        </div>
        <BaseButton class="header__show-btn" @click="emitReload"
            >Показать</BaseButton
        >
    </header>
</template>
