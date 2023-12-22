<script setup>
import { computed, onMounted, ref } from "vue";
import { HeaderFormGroup, TreeSelect } from "@uikit";
import { getCategories } from "@api";
import { filterProps, generalProps } from "@stores";
import { useTrans } from "@packages/lang";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const { trans } = useTrans();

const { hiddenCategories } = generalProps;

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
    const categoriesFromServer = (await getCategories()).data?.data;
    if (
        Array.isArray(hiddenCategories) &&
        hiddenCategories.length > 0 &&
        Array.isArray(categoriesFromServer)
    )
        categoriesOptions.value = categoriesFromServer.filter(
            (category) => !hiddenCategories.includes(String(category.id))
        );
    else categoriesOptions.value = categoriesFromServer;
});

const { requiredFilters } = filterProps;
const hasError = computed(() => {
    return (
        requiredFilters.includes("category") &&
        (!Array.isArray(categories.value) || categories.value.length === 0)
    );
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> {{ trans["category_label"] }} </template>
        <template #input>
            <TreeSelect
                v-model="categories"
                :options="categoriesOptions"
                :has-error="hasError"
            />
        </template>
    </HeaderFormGroup>
</template>
