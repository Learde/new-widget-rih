<script setup>
import { PhoneNumberInput, BaseButton, BaseLoading } from "@uikit";
import { useClientStore } from "@stores";
import { useTrans } from "@packages/lang";
import { ref } from "vue";

const emit = defineEmits(["change-type", "close"]);

const phone = ref(null);
const password = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);
const isLoading = ref(false);

const { trans } = useTrans();
const clientStore = useClientStore();

const doAuth = async () => {
    errorFull.value = !phone.value || !password.value;
    if (errorFull.value) return;

    errorAuth.value = null;

    try {
        isLoading.value = true;

        const data = {
            phone: phone.value,
            password: password.value,
        };

        await clientStore.tryAuth(data);

        localStorage.setItem("authData", JSON.stringify(data));

        emit("close");
    } catch (error) {
        errorAuth.value = trans["auth_error"]; // error?.response?.data?.error ?? "Ошибка авторизации";
    } finally {
        isLoading.value = false;
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
        <BaseLoading v-if="isLoading" background />
    </div>
</template>
