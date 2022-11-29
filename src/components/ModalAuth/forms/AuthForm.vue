<script setup>
import { PhoneNumberInput, BaseButton } from "@uikit";
import { authClient } from "@api";
import { useClientStore } from "@stores";
import { ref } from "vue";

const emit = defineEmits(["change-type", "close"]);

const phone = ref(null);
const password = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);

const clientStore = useClientStore();
const { setClient } = clientStore;

const doAuth = async () => {
    errorFull.value = !phone.value || !password.value;
    if (errorFull.value) return;

    errorAuth.value = null;

    try {
        const client = (
            await authClient({
                phone: phone.value,
                password: password.value,
            })
        ).data;
        if (client && client.error === undefined) {
            localStorage.setItem("client", JSON.stringify(client));
            setClient(client);
            emit("close");
        } else if (client.error) {
            errorAuth.value = client.error;
        }
    } catch (error) {
        errorAuth.value = error?.response?.data?.error ?? "Ошибка авторизации";
    }
};
</script>

<template>
    <div class="auth-form__form">
        <h2 class="auth-form__heading">Авторизация</h2>
        <div class="auth-form__form-group">
            <PhoneNumberInput v-model="phone"></PhoneNumberInput>
        </div>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="password"
                placeholder="Пароль"
                v-model="password"
            />
        </div>
        <BaseButton @click="doAuth">Войти</BaseButton>
        <p class="auth-form__error" v-if="errorFull">*Не все поля заполнены</p>
        <p class="auth-form__error" v-if="errorAuth">*{{ errorAuth }}</p>
        <p class="auth-form__no-account">
            Забыли пароль?
            <span
                class="auth-form__link"
                @click="$emit('change-type', 'restore')"
                >Восстановление</span
            >
        </p>
        <p class="auth-form__no-account">
            Еще нет аккаунта?
            <span class="auth-form__link" @click="$emit('change-type', 'reg')"
                >Зарегистрироваться</span
            >
        </p>
    </div>
</template>
