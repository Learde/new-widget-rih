<script setup>
import AuthForm from "./forms/AuthForm.vue";
import RegForm from "./forms/RegForm.vue";
import RestorePassword from "./forms/RestorePassword.vue";
import RestoreCode from "./forms/RestoreCode.vue";
import RestoreChange from "./forms/RestoreChange.vue";

import { BaseModal } from "@uikit";
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

defineExpose({ show, hide, toggle });

const type = ref("auth");
</script>

<template>
    <BaseModal ref="modal" :content-width="350">
        <div class="rih-auth-form">
            <div class="rih-auth-form__form-wrapper">
                <AuthForm
                    v-if="type === 'auth'"
                    @change-type="(t) => (type = t)"
                    @close="hide()"
                />
                <RegForm
                    v-else-if="type === 'reg'"
                    @change-type="(t) => (type = t)"
                    @close="hide()"
                />
                <RestorePassword
                    v-else-if="type === 'restore'"
                    @change-type="(t) => (type = t)"
                />
                <RestoreCode
                    v-else-if="type === 'restore-code'"
                    @change-type="(t) => (type = t)"
                />
                <RestoreChange
                    v-else-if="type === 'restore-password'"
                    @change-type="(t) => (type = t)"
                />
            </div>
        </div>
    </BaseModal>
</template>
