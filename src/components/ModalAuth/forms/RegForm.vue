<script setup>
import { PhoneNumberInput, BaseButton } from "@uikit";
import { registerClient } from "@api";
import { useClientStore } from "@stores";
import { ref } from "vue";

const emit = defineEmits(["change-type", "close"]);

const name = ref(null);
const surname = ref(null);
const email = ref(null);
const phone = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);
const errorPasswords = ref(false);

const clientStore = useClientStore();
const { setClient } = clientStore;

const doReg = async () => {
    errorFull.value =
        !phone.value ||
        !password.value ||
        !passwordConfirm.value ||
        !email.value ||
        !name.value ||
        !surname.value;

    errorPasswords.value = password.value !== passwordConfirm.value;

    if (errorFull.value || errorPasswords.value) return;

    errorAuth.value = null;

    try {
        const client = (
            await registerClient({
                phone: phone.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value,
                surname: surname.value,
                name: name.value,
                email: email.value,
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
        errorAuth.value = error?.response?.data?.error ?? "Ошибка регистрации";
    }
};
</script>

<template>
    <div class="auth-form__form">
        <h2 class="auth-form__heading">Регистрация</h2>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="text"
                placeholder="Имя"
                v-model="name"
            />
        </div>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="text"
                placeholder="Фамилия"
                v-model="surname"
            />
        </div>
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="email"
                placeholder="Email"
                v-model="email"
            />
        </div>
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
        <div class="auth-form__form-group">
            <input
                class="auth-form__input"
                type="password"
                placeholder="Подтверждение пароля"
                v-model="passwordConfirm"
            />
        </div>
        <BaseButton long @click="doReg">Зарегистрироваться</BaseButton>
        <p class="auth-form__error" v-if="errorFull">*Не все поля заполнены</p>
        <p class="auth-form__error" v-if="errorPasswords">
            *Пароли не совпадают
        </p>
        <p class="auth-form__error" v-if="errorAuth">*{{ errorAuth }}</p>
        <p class="auth-form__no-account">
            Уже есть аккаунт?
            <span class="auth-form__link" @click="$emit('change-type', 'auth')"
                >Войти</span
            >
        </p>
    </div>
</template>
