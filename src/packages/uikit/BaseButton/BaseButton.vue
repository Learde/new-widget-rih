<template>
    <button
        class="base-button"
        :class="{
            'base-button--long': long,
            [`base-button--${variant}`]: true,
        }"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    long: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String, // primary, danger
        default: "primary",
    },
});
</script>
