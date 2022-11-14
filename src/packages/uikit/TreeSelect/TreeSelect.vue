<template>
    <VueTreeSelect
        @input="(newValue) => $emit('update:modelValue', newValue)"
        v-bind="props"
    >
        <template #option-label="{ node, shouldShowCount, count }">
            <slot
                name="option-label"
                :node="node"
                :should-show-count="shouldShowCount"
                :count="count"
            >
                <label>
                    {{ node.raw.title }}
                    <span v-if="shouldShowCount"> ({{ count }}) </span>
                </label>
            </slot>
        </template>
        <template #value-label="{ node }">
            <slot name="value-label" :node="node">
                <div>
                    {{ node.raw.title }}
                </div>
            </slot>
        </template>
    </VueTreeSelect>
</template>

<script setup>
//Source: https://github.com/megafetis/vue3-treeselect/
import VueTreeSelect from "vue3-treeselect";
import importedProps from "./config";

defineEmits(["update:modelValue"]);

const props = defineProps({ ...importedProps });
</script>
