<script setup>
import { BaseModal, BaseButton } from "@uikit";
import { ref } from "vue";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();

const textError = ref(null);

const modal = ref(null);
const show = (error) => {
    textError.value = error;
    modal.value.show();
};
const hide = () => {
    modal.value.hide();
};
const toggle = () => {
    modal.value.toggle();
};

defineExpose({ show, hide, toggle });
</script>

<template>
    <BaseModal ref="modal" :content-width="450">
        <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
        >
            <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
            />
            <path
                class="checkmark__check"
                fill="none"
                d="M16 16 36 36 M36 16 16 36"
            />
        </svg>
        <div style="text-align: center">
            <p>{{ textError }}</p>
            <BaseButton style="margin-top: 30px" @click="hide">
                {{ trans["ok"] }}
            </BaseButton>
        </div>
    </BaseModal>
</template>
