<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { HeaderFormGroup } from "@uikit";
import { getCategories } from "@api";
import { filterProps, generalProps } from "@stores";
import { useTrans } from "@packages/lang";
import FilterCategoryItem from "./FilterCategoryItem.vue";

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

const toggleCategory = async (category) => {
    if (!Array.isArray(categories.value)) {
        categories.value = [];
        await nextTick();
    }
    const index = categories.value.indexOf(category.id);
    if (index > -1) categories.value.splice(index, 1);
    else categories.value.push(category.id);

    if (Array.isArray(category.children)) {
        for (const child of category.children) {
            toggleChildrenCategory(child, index > -1);
        }
    }
};

const toggleChildrenCategory = (category, flag) => {
    const index = categories.value.indexOf(category.id);
    if (flag && index > -1) categories.value.splice(index, 1);
    else if (!flag && index === -1) categories.value.push(category.id);

    if (Array.isArray(category.children)) {
        for (const child of category.children) {
            toggleChildrenCategory(child, flag);
        }
    }
};

const toggleChildren = (category) => {
    category.isOpened = !category.isOpened;
};
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> {{ trans["category_label"] }} </template>
        <template #input>
            <!-- <TreeSelect -->
            <!--     v-model="categories" -->
            <!--     :options="categoriesOptions" -->
            <!--     :has-error="hasError" -->
            <!-- /> -->
            <div>
                <FilterCategoryItem
                    v-for="category in categoriesOptions"
                    :key="category.id"
                    :category="category"
                    :selected-categories="categories"
                    @toggle-children="toggleChildren"
                    @toggle-category="toggleCategory"
                />
            </div>
        </template>
    </HeaderFormGroup>
</template>
