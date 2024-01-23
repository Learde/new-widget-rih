<script setup>
import {
    BaseModal,
    BaseButton,
    BaseLoading,
    PhoneNumberInput,
    DatePicker,
} from "@uikit";
import { editClient, getClient } from "@api";
import ModalSuccess from "../ModalSuccess/ModalSuccess.vue";
import ModalError from "../ModalError/ModalError.vue";
import { ref, computed } from "vue";
import { useClientStore, generalProps } from "@stores";
import { formatDateJs } from "@helpers";

const props = defineProps({
    id: [Number, String],
    defaultName: {
        type: String,
        default: null,
    },
    defaultSurname: {
        type: String,
        default: null,
    },
    defaultEmail: {
        type: String,
        default: null,
    },
    defaultPhone: {
        type: String,
        default: null,
    },
    defaultPassportSeries: {
        type: String,
        default: null,
    },
    defaultPassportNumber: {
        type: String,
        default: null,
    },
    defaultPassportTake: {
        type: String,
        default: null,
    },
    defaultPassportTakeDate: {
        type: String,
        default: null,
    },
    defaultPassportCode: {
        type: String,
        default: null,
    },
});

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

const clientStore = useClientStore();

defineExpose({ show, hide, toggle });

const name = ref(props.defaultName);
const surname = ref(props.defaultSurname);
const email = ref(props.defaultEmail);
const phone = ref(props.defaultPhone);
const passportSeries = ref(props.defaultPassportSeries);
const passportNumber = ref(props.defaultPhoneNumber);
const passportTake = ref(props.defaultPassportTake);
const passportTakeDate = ref(props.defaultPassportTakeDate);
const passportCode = ref(props.defaultPassportCode);

const { passport } = generalProps;

const clientData = computed(() => {
    let passportData = {};
    if (passport) {
        passportData = {
            passport_serial: passportSeries.value,
            passport_number: passportNumber.value,
            passport_take: passportTake.value,
            passport_code: passportCode.value,
            passport_take_date: passportTakeDate.value
                ? formatDateJs(passportTakeDate.value, "yyyy-MM-dd")
                : null,
        };
    }

    const obj = {
        contacts: [],
        human: {
            surname: surname.value,
            name: name.value,
            ...passportData,
        },
        id: props.id,
    };

    if (phone.value) {
        obj.contacts.push({
            contact_type_id: 1,
            value: phone.value,
        });
    }
    if (email.value) {
        obj.contacts.push({
            contact_type_id: 2,
            value: email.value,
        });
    }

    return obj;
});

const modalSuccess = ref(null);
const modalError = ref(null);
const saving = ref(false);

const doEdit = async () => {
    try {
        saving.value = true;

        const client = await editClient(clientData.value, props.id);
        clientStore.setClient(client);
        modalSuccess.value.show("Успешное редактирование");

        hide();
    } catch (e) {
        modalError.value.show(e?.response?.data?.error);
    } finally {
        saving.value = false;
    }
};
</script>

<template>
    <BaseModal ref="modal">
        <div class="modal-editting">
            <h3 class="modal-editting__heading">Редактирование</h3>
            <form
                class="modal-editting__form"
                :class="{
                    'modal-editting__form--flex': passport,
                    'modal-editting__form--single': !passport,
                }"
            >
                <div :class="{ 'modal-editting__form-half': passport }">
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Имя"
                            v-model="name"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Фамилия"
                            v-model="surname"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="email"
                            placeholder="Email"
                            v-model="email"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <PhoneNumberInput v-model="phone" />
                    </div>
                    <div class="modal-editting__form-group" v-if="passport">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Серия паспорта"
                            v-model="passportSeries"
                        />
                    </div>
                </div>
                <div class="modal-editting__form-half" v-if="passport">
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Номер паспорта"
                            v-model="passportNumber"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Кем выдан паспорт"
                            v-model="passportTake"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <DatePicker
                            v-model="passportTakeDate"
                            placeholder="Дата получения паспорта"
                            :enable-time-picker="false"
                            :close-on-auto-apply="true"
                        />
                    </div>
                    <div class="modal-editting__form-group">
                        <input
                            class="modal-editting__input"
                            type="text"
                            placeholder="Код подразделения"
                            v-model="passportCode"
                        />
                    </div>
                </div>
            </form>
            <div class="modal-editting__actions">
                <BaseButton @click="doEdit">Сохранить</BaseButton>
            </div>
            <BaseLoading v-if="saving" background little />
        </div>
    </BaseModal>
    <ModalSuccess ref="modalSuccess" />
    <ModalError ref="modalError" />
</template>
