<script setup>
import { PhoneNumberInput, BaseButton, DatePicker, BaseLoading } from "@uikit";
import { registerClient } from "@api";
import { useClientStore, generalProps } from "@stores";
import { ref } from "vue";
import { formatDateJs } from "@helpers";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();
const emit = defineEmits(["change-type", "close"]);

const name = ref(null);
const surname = ref(null);
const email = ref(null);
const phone = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);
const passportSeries = ref(null);
const passportNumber = ref(null);
const passportTake = ref(null);
const passportTakeDate = ref(null);
const passportCode = ref(null);
const errorFull = ref(false);
const errorAuth = ref(false);
const errorPasswords = ref(false);
const isLoading = ref(false);

const clientStore = useClientStore();
const { setClient } = clientStore;
const { passport } = generalProps;

const doReg = async () => {
    errorFull.value =
        !phone.value ||
        !password.value ||
        !passwordConfirm.value ||
        !email.value ||
        !name.value ||
        !surname.value;

    let passportData = {};
    if (passport) {
        errorFull.value ||=
            !passportNumber.value ||
            !passportTake.value ||
            !passportTakeDate.value ||
            !passportSeries.value;

        passportData = {
            passport_number: passportNumber.value,
            passport_take: passportTake.value,
            passport_take_date: passportTakeDate.value
                ? formatDateJs(passportTakeDate.value, "yyyy-MM-dd")
                : null,
            passport_series: passportSeries.value,
            passport_code: passportCode.value,
        };
    }

    errorPasswords.value = password.value !== passwordConfirm.value;

    if (errorFull.value || errorPasswords.value) return;

    errorAuth.value = null;

    try {
        isLoading.value = true;

        await clientStore.register({
            phone: phone.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value,
            surname: surname.value,
            name: name.value,
            email: email.value,
            ...passportData,
        });

        localStorage.setItem(
            "authData",
            JSON.stringify({
                phone: phone.value,
                password: password.value,
            })
        );

        emit("close");
    } catch (error) {
        errorAuth.value = trans.value["reg_error"]; //error?.response?.data?.error;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="auth-form__form">
        <h2 class="auth-form__heading">Регистрация</h2>
        <div :class="{ 'auth-form__form--flex': passport }">
            <div>
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
            </div>
            <div v-if="passport">
                <div class="auth-form__form-group" v-if="passport">
                    <input
                        class="auth-form__input"
                        type="text"
                        placeholder="Серия паспорта"
                        v-model="passportSeries"
                    />
                </div>
                <div class="auth-form__form-group">
                    <input
                        class="auth-form__input"
                        type="text"
                        placeholder="Номер паспорта"
                        v-model="passportNumber"
                    />
                </div>
                <div class="auth-form__form-group">
                    <input
                        class="auth-form__input"
                        type="text"
                        placeholder="Кем выдан паспорт"
                        v-model="passportTake"
                    />
                </div>
                <div class="auth-form__form-group">
                    <DatePicker
                        v-model="passportTakeDate"
                        placeholder="Дата получения паспорта"
                        :enable-time-picker="false"
                        :close-on-auto-apply="true"
                    />
                </div>
                <div class="auth-form__form-group">
                    <input
                        class="auth-form__input"
                        type="text"
                        placeholder="Код подразделения"
                        v-model="passportCode"
                    />
                </div>
            </div>
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
        <BaseLoading v-if="isLoading" background />
    </div>
</template>
