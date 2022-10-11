<template>
    <HeaderGroupTemplate>
        <template #label>Пункт проката</template>
        <template #input="{ defaultClass }">
            <v-select
                v-model="localFilter.points"
                v-bind="config"
                :options="points"
                :class="defaultClass"
            >
                <template v-slot:option="option">
                    {{ option.title }}
                </template>
                <template v-slot:selected-option="option">
                    {{ option.title }}
                </template>
            </v-select>
        </template>
    </HeaderGroupTemplate>
</template>

<script setup>
import HeaderGroupTemplate from "../HeaderGroupTemplate/HeaderGroupTemplate.vue";
import config from "./config";
</script>
