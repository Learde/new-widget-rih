<template>
    <button class="base-button" :class="{ 'base-button--long': long }">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    long: {
        type: Boolean,
        default: false,
    },
});
</script>
