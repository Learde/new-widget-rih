<template>
    <div
        class="base-loading"
        :class="{
            'base-loading--background': background,
            'base-loading--little': little,
        }"
    >
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    background: {
        type: Boolean,
        default: false,
    },
    little: {
        type: Boolean,
        default: false,
    },
});
</script>
