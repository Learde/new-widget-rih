<template>
    <header class="rih-header">
        <HeaderCategory />
        <HeaderPoint />
        <HeaderDatePick :disable-date-fn="isPastDate">
            <template #label>Даты аренды</template>
            <template #additionalLabel>с</template>
        </HeaderDatePick>
        <HeaderDatePick :disable-date-fn="isFutureDate">
            <template #additionalLabel>по</template>
        </HeaderDatePick>
    </header>
</template>

<script setup>
import HeaderCategory from "./HeaderCategory/HeaderCategory.vue";
import HeaderPoint from "./HeaderPoint/HeaderPoint.vue";

import { isPastDate, isFutureDate } from "./HeaderDatePick/methods";
</script>
