<script setup>
//Source: https://github.com/megafetis/vue3-treeselect/
import VueTreeSelect from "@bosquig/vue3-treeselect";
import importedProps from "./props.js";
import { stringEscape } from "@helpers";
import { computed } from "vue";
import { useTrans } from "@packages/lang";
const { trans } = useTrans();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    ...importedProps,
});

const nodes = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
const stringLength = 20;
</script>

<template>
    <VueTreeSelect
        v-model="nodes"
        v-bind="props"
        :placeholder="trans['category_placeholder']"
        :no-results-text="trans['no_results']"
        :no-children-text="trans['no_children']"
        :no-options-text="trans['no_options']"
        :clear-all-text="trans['clear_all']"
        :class="{ 'vue-treeselect--error': hasError }"
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
                <div>{{ stringEscape(node.raw.title, stringLength) }}</div>
            </slot>
        </template>
    </VueTreeSelect>
</template>
