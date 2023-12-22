<script setup>
import { computed, onMounted, ref } from "vue";
import { HeaderFormGroup, InputSelect } from "@uikit";
import { getPoints } from "@api";
import { filterProps } from "@stores";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const points = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const pointsOptions = ref([]);

onMounted(async () => {
    pointsOptions.value = (await getPoints()).data?.data;
});

const { requiredFilters } = filterProps;
const hasError = computed(() => {
    return (
        requiredFilters.includes("point") &&
        (!Array.isArray(points.value) || points.value.length === 0)
    );
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> {{ trans["point_label"] }} </template>
        <template #input>
            <InputSelect
                v-model="points"
                :options="pointsOptions"
                :has-error="hasError"
            />
        </template>
    </HeaderFormGroup>
</template>
