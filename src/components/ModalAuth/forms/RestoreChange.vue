<script setup>
import { BaseButton } from "@uikit";
import { restoreChange } from "@api";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useClientStore } from "@stores";

const emit = defineEmits(["change-type", "close"]);

const clientStore = useClientStore();
const { client } = storeToRefs(clientStore);

const password = ref(null);
const passwordConfirm = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);

const doRestore = async () => {
    errorFull.value = !password.value || !passwordConfirm.value;
    if (errorFull.value) return;

    errorAuth.value = null;

    try {
        const data = (
            await restoreChange({
                password: password.value,
                passwordConfirm: passwordConfirm.value,
                clientId: client.value.id,
            })
        ).data;
        if (data && data.error === undefined) {
            emit("change-type", "auth");
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
        <h2 class="auth-form__heading">Восстановление пароля</h2>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="password"
                placeholder="Пароль"
                v-model="password"
            />
        </div>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="password"
                placeholder="Подтверждение пароля"
                v-model="passwordConfirm"
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
