<template>
    <HeaderGroupTemplate>
        <template #label>
            <slot name="label">&nbsp;</slot>
        </template>
        <template #input="{ defaultClass }">
            <div class="rih-header-date-pick__group">
                <span class="rih-header-date-pick__add-label">
                    <slot name="additionalLabel">&nbsp;</slot>
                </span>
                <date-pick
                    v-model="localFilter.dateStart"
                    v-bind="config"
                    :is-date-disabled="disableDateFn"
                    :class="defaultClass"
                ></date-pick>
            </div>
        </template>
    </HeaderGroupTemplate>
</template>

<script setup>
import HeaderGroupTemplate from "../HeaderFormGroup/HeaderFormGroup.vue";
import config from "./config";

defineProps({
    disableDateFn: {
        type: Function,
        default() {
            return () => true;
        },
    },
});
</script>
