<script setup>
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import FilterCategory from "./filters/FilterCategory/FilterCategory.vue";
import FilterPoint from "./filters/FilterPoint/FilterPoint.vue";
// import HeaderCategory from "../HeaderCategory/HeaderCategory.vue";
// import HeaderPoint from "../HeaderPoint/HeaderPoint.vue";
//
// import { isPastDate, isFutureDate } from "../HeaderDatePick/methods";
</script>

<template>
    <header class="header">
        <div class="header__filters">
            <FilterCategory />
            <FilterPoint />
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
