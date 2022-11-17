<script setup>
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import FilterCategory from "./filters/FilterCategory.vue";
import FilterPoint from "./filters/FilterPoint.vue";
import FilterDate from "./filters/FilterDate.vue";

// import { isPastDate, isFutureDate } from "../HeaderDatePick/methods";
</script>

<template>
    <header class="header">
        <div class="header__filters">
            <FilterCategory />
            <FilterPoint />
            <FilterDate> Дата начала </FilterDate>
            <FilterDate> Дата конца </FilterDate>
        </div>
        <!--        <HeaderCategory />-->
        <!--        <HeaderPoint />-->
        <!--        <HeaderDatePick :disable-date-fn="isPastDate">-->
        <!--            <template #label>Даты аренды</template>-->
        <!--            <template #additionalLabel>с</template>-->
        <!--        </HeaderDatePick>-->
        <!--        <HeaderDatePick :disable-date-fn="isFutureDate">-->
        <!--            <template #additionalLabel>по</template>-->
        <!--        </HeaderDatePick>-->
        <BaseButton>Показать</BaseButton>
    </header>
</template>
