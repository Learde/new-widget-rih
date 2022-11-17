<script setup>
import { computed, onMounted, ref } from "vue";
import { HeaderFormGroup, TreeSelect } from "@uikit";
import { getCategories } from "@api";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const categories = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const categoriesOptions = ref([]);

onMounted(async () => {
    categoriesOptions.value = (await getCategories()).data?.array;
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> Категория </template>
        <template #input>
            <TreeSelect v-model="categories" :options="categoriesOptions" />
        </template>
    </HeaderFormGroup>
</template>
