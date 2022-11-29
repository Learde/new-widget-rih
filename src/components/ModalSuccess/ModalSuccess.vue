<script setup>
import { BaseModal, BaseButton } from "@uikit";
import { ref } from "vue";

const modal = ref(null);
const show = () => {
    modal.value.show();
};
const hide = () => {
    modal.value.hide();
};
const toggle = () => {
    modal.value.toggle();
};
const open = () => {
    return modal.value.open;
};

defineExpose({ show, hide, toggle, open });
</script>

<template>
    <BaseModal ref="modal" :content-width="450">
        <div class="success-checkmark">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
        </div>
        <div style="text-align: center">
            <p><slot>Спасибо, мы свяжемся с вами в ближайшее время!</slot></p>
            <BaseButton style="margin-top: 20px" @click="hide"> Ок </BaseButton>
        </div>
    </BaseModal>
</template>
