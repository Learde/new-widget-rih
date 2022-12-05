<script setup>
import { BaseModal, BaseButton, BaseLoading, PhoneNumberInput } from "@uikit";
import { editClient, getClient } from "@api";
import ModalSuccess from "../ModalSuccess/ModalSuccess.vue";
import ModalError from "../ModalError/ModalError.vue";
import { ref, computed } from "vue";
import { useClientStore } from "@stores";

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

defineExpose({ show, hide, toggle });

const name = ref(props.defaultName);
const surname = ref(props.defaultSurname);
const email = ref(props.defaultEmail);
const phone = ref(props.defaultPhone);

const clientData = computed(() => {
    const obj = {
        contacts: [],
        human: {
            surname: surname.value,
            name: name.value,
        },
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
        const payloadEdit = (await editClient(clientData.value, props.id)).data;
        if (payloadEdit.error === undefined) {
            const payloadGet = (await getClient(props.id)).data;
            if (payloadGet.error === undefined) {
                const client = payloadGet.array?.[0];
                const clientStore = useClientStore();
                const { setClient } = clientStore;
                setClient(client);
                modalSuccess.value.show("Успешное редактирование");
            } else {
                modalError.value.show(payloadGet.error);
            }
        } else {
            modalError.value.show(payloadEdit.error);
        }
        hide();
    } catch (e) {
        modalError.value.show(e?.response?.data?.error);
    }
};
</script>

<template>
    <BaseModal ref="modal" :content-width="350">
        <div class="auth-form__form">
            <h2 class="auth-form__heading">Редактирование</h2>
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
            <BaseButton @click="doEdit">Сохранить</BaseButton>
            <BaseLoading v-if="saving" background little />
        </div>
    </BaseModal>
    <ModalSuccess ref="modalSuccess" />
    <ModalError ref="modalError" />
</template>
