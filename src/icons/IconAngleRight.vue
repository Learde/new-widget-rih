<template>
    <icon-base view-box="0 0 320 512" :width="width" :height="height">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
            :style="inlineStyle"
        />
    </icon-base>
</template>

<script setup>
import { computed } from "vue";
import IconBase from "@/icons/IconBase.vue";

const props = defineProps({
    width: {
        type: [String, Number],
        default: "14",
    },
    height: {
        type: [String, Number],
        default: "14",
    },
    color: {
        type: String,
        default: null,
    },
});

const inlineStyle = computed(() => {
    if (!props.color) return {};
    return {
        fill: props.color,
    };
});
</script>

<style scoped></style>
