<template>
    <icon-base view-box="0 0 384 512" :width="width" :height="height">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
            d="M96 32C78.3 32 64 46.3 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64v32c0 17.7 14.3 32 32 32s32-14.3 32-32V416H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V320H240c79.5 0 144-64.5 144-144s-64.5-144-144-144H96zM240 256H128V96H240c44.2 0 80 35.8 80 80s-35.8 80-80 80z"
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
