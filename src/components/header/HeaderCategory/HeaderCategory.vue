<template>
    <HeaderGroupTemplate>
        <template #labelText> Категория </template>
        <template #input="{ defaultClass }">
            <vue-treeselect
                v-model="categories"
                v-bind="config"
                :options="categoriesOptions"
                :normalizer="normalizer"
                :class="defaultClass"
            >
                <template #option-label="{ node, shouldShowCount, count }">
                    <label>
                        {{ node.raw.title }}
                        <span v-if="shouldShowCount"> ({{ count }}) </span>
                    </label>
                </template>
                <template #value-label="{ node }">
                    <div>
                        {{ node.raw.title }}
                    </div>
                </template>
            </vue-treeselect>
        </template>
    </HeaderGroupTemplate>
</template>
<script setup>
import { computed } from "vue";
import HeaderGroupTemplate from "@/components/header/HeaderGroupTemplate/HeaderGroupTemplate.vue";

import { config } from "./config";
import { normalizer } from "./helpers";

const props = defineProps({
    modelValue: Object,
    categoriesOptions: Object,
});
const emit = defineEmits(["update:modelValue"]);

const categories = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>
