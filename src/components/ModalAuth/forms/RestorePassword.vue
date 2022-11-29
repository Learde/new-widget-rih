<script setup>
import { PhoneNumberInput, BaseButton } from "@uikit";
import { restorePassword } from "@api";
import { ref } from "vue";

const emit = defineEmits(["change-type", "close"]);

const phone = ref(null);
const email = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);

const doRestore = async () => {
    errorFull.value = !phone.value || !email.value;
    if (errorFull.value) return;

    errorAuth.value = null;

    try {
        const data = (
            await restorePassword({
                phone: phone.value,
                email: email.value,
            })
        ).data;
        if (data && data.error === undefined && data.status === "OK") {
            emit("change-type", "restore-code");
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
            <PhoneNumberInput v-model="phone"></PhoneNumberInput>
        </div>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="email"
                placeholder="Email"
                v-model="email"
            />
        </div>
        <BaseButton long @click="doRestore">Отправить код</BaseButton>
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
