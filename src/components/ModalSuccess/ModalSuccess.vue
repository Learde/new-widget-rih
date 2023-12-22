<script setup>
import { BaseModal, BaseButton } from "@uikit";
import { ref } from "vue";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();

const emit = defineEmits(["close"]);

const modal = ref(null);
const successText = ref("");
const show = (text) => {
    if (!text) {
        text = trans.value["success_text"];
    }
    successText.value = text;
    modal.value.show();
};
const hide = () => {
    modal.value.hide();
    emit("close");
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
            <p>
                <slot>{{ successText }}</slot>
            </p>
            <BaseButton style="margin-top: 20px" @click="hide">
                {{ trans["ok"] }}
            </BaseButton>
        </div>
    </BaseModal>
</template>
