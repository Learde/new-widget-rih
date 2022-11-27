<script setup>
import { ref } from "vue";
import { IconXmark } from "@icons";
const open = ref(true);
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

defineExpose({ show, hide, toggle });
</script>

<template>
    <div class="modal" v-if="open" @click="hide">
        <div class="modal__content" @click.stop>
            <IconXmark class="modal__cross" @click="hide" />
            <slot />
        </div>
    </div>
</template>
