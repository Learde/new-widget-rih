<template>
    <svg :width="width" :height="height" :viewBox="viewBoxValue">
        <slot />
    </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    width: {
        type: [String, Number],
        default: "14",
    },
    height: {
        type: [String, Number],
        default: "14",
    },
    viewBox: {
        type: String,
        default: null,
    },
});

const viewBoxValue = computed(() =>
    props.viewBox ? props.viewBox : `0 0 ${props.width} ${props.width}`
);
</script>

<style lang="scss" scoped>
svg {
}
</style>
