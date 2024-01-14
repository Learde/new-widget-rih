<script setup>
import { computed } from "vue";
import { IconAngleDown } from "@icons";
import { BaseCheckbox } from "@uikit";
const props = defineProps({
    category: { type: Object, default: null },
    selectedCategories: { type: Array, default: () => [] },
});
defineEmits(["toggleChildren", "toggleCategory"]);

const hasChildren = computed(() => {
    return props.category.children && props.category.children.length > 0;
});
</script>

<template>
    <div class="filter-category-item">
        <div
            class="filter-category-item__item"
            :class="{ 'filter-category-item__item--no-children': !hasChildren }"
        >
            <IconAngleDown
                v-if="hasChildren"
                class="filter-category-item__toggle"
                :class="{ active: category.isOpened }"
                @click="$emit('toggleChildren', category)"
            />
            <BaseCheckbox
                @update:model-value="$emit('toggleCategory', category)"
                :model-value="
                    Array.isArray(selectedCategories) &&
                    selectedCategories.includes(category.id)
                "
                primary-color
            >
                {{ category.title }}
            </BaseCheckbox>
        </div>
        <div
            class="filter-category-item__children"
            v-if="category.isOpened && hasChildren"
        >
            <FilterCategoryItem
                v-for="child in category.children"
                :key="child.id"
                :category="child"
                :selected-categories="selectedCategories"
                @toggle-children="$emit('toggleChildren', $event)"
                @toggle-category="$emit('toggleCategory', $event)"
            />
        </div>
    </div>
</template>
