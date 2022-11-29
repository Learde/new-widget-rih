<script setup>
import { BaseButton } from "@uikit";
import { restoreCode } from "@api";
import { ref } from "vue";
import { useClientStore } from "@stores";

const emit = defineEmits(["change-type", "close"]);

const clientStore = useClientStore();
const { setOnlyClient } = clientStore;

const confirmCode = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);

const doRestore = async () => {
    errorFull.value = !confirmCode.value;
    if (errorFull.value) return;

    errorAuth.value = null;

    try {
        const data = (
            await restoreCode({
                code: confirmCode.value,
            })
        ).data;
        if (data && data.error === undefined && data.client) {
            setOnlyClient(data.client);
            emit("change-type", "restore-password");
        } else if (data.error) {
            errorAuth.value = data.error;
        }
    } catch (error) {
        errorAuth.value =
            error?.response?.data?.error ??
            error?.response?.data?.status ??
            "Ошибка восстановления";
    }
};
</script>

<template>
    <div class="auth-form__form">
        <h2 class="auth-form__heading">Код из письма</h2>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="text"
                placeholder="Код"
                v-model="confirmCode"
            />
        </div>
        <BaseButton @click="doRestore">Принять</BaseButton>
        <p class="auth-form__error" v-if="errorFull">*Не все поля заполнены</p>
        <p class="auth-form__error" v-if="errorAuth">*{{ errorAuth }}</p>
        <p class="auth-form__no-account">
            Вспомнили пароль?
            <span class="auth-form__link" @click="$emit('change-type', 'auth')"
                >Войти</span
            >
        </p>
    </div>
</template>
