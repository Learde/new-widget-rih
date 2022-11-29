<script setup>
import { ref } from "vue";
import { IconXmark } from "@icons";

defineProps({
    contentWidth: {
        type: [String, Number],
        default: "600",
    },
});

const open = ref(false);
const show = () => {
    open.value = true;
};
const hide = () => {
    open.value = false;
};
const toggle = () => {
    if (open.value) hide();
    else show();
};

defineExpose({ show, hide, toggle, open });
</script>

<template>
    <div class="modal" v-if="open" @click="hide">
        <div
            class="modal__content"
            :style="{ width: contentWidth + 'px' }"
            @click.stop
        >
            <IconXmark class="modal__cross" @click="hide" />
            <slot />
        </div>
    </div>
</template>
