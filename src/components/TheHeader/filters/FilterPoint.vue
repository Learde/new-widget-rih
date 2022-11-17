<script setup>
import { computed, onMounted, ref } from "vue";
import { HeaderFormGroup, InputSelect } from "@uikit";
import { getPoints } from "@api";

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
    pointsOptions.value = (await getPoints()).data?.array;
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> Пункт проката </template>
        <template #input>
            <InputSelect v-model="points" :options="pointsOptions" />
        </template>
    </HeaderFormGroup>
</template>
