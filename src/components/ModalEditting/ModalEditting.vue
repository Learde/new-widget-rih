<script setup>
import { BaseModal, BaseButton, PhoneNumberInput } from "@uikit";
import { editClient } from "@api";
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

const doEdit = async () => {
    try {
        const client = (await editClient(clientData.value, props.id)).data
            ?.array?.[0];
        if (client) {
            const clientStore = useClientStore();
            const { setClient } = clientStore;
            setClient(client);
        }
        hide();
    } catch (e) {
        console.log(e);
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
        </div>
    </BaseModal>
</template>
