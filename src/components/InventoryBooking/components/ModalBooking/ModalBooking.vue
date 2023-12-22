<script setup>
import {
    BaseModal,
    BaseButton,
    BaseCheckbox,
    PhoneNumberInput,
    DatePicker,
} from "@uikit";
import { checkOrCreateClient, getClients, createClient } from "@api";
import InventoryBookingBadge from "../InventoryBookingBadge/InventoryBookingBadge.vue";
import { generalProps, useClientStore } from "@stores";
import { formatDateJs } from "@helpers";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import BaseLoading from "@uikit/BaseLoading/BaseLoading.vue";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();

const emit = defineEmits(["create-rent", "error"]);

defineProps({
    startDate: [Date, String],
    endDate: [Date, String],
    inventory: {
        type: Object,
        default: null,
    },
    sumRent: [Number, String],
});

const { passport, payable } = generalProps;

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

const saving = ref(false);

const agreePersonalData = ref(false);
const name = ref(null);
const surname = ref(null);
const phone = ref(null);
const passportSeries = ref(null);
const passportNumber = ref(null);
const passportTake = ref(null);
const passportTakeDate = ref(null);
const passportCode = ref(null);

const disableButton = computed(() => {
    const baseDataFilled =
        name.value && surname.value && phone.value && agreePersonalData.value;
    if (!baseDataFilled) return true;
    if (!passport) return false;
    const passportDataFilled =
        passportSeries.value &&
        passportNumber.value &&
        passportTake.value &&
        passportTakeDate.value;
    return !passportDataFilled;
});

const getClient = async () => {
    try {
        saving.value = true;

        const clients = await getClients(phone.value);
        let client = null;

        if (!clients || !clients[0]) {
            client = await createClient({
                contacts: [
                    {
                        confirmed: null,
                        contact_type_id: 1,
                        id: null,
                        value: phone.value,
                    },
                ],
                address: null,
                black_list: false,
                comment: null,
                company: null,
                created_at: null,
                debts: null,
                discounts: [],
                has_contract: true,
                has_deposit: true,
                human: {
                    avatar: null,
                    avatar_fio: null,
                    birthday: null,
                    fio: null,
                    guid: null,
                    id: null,
                    is_admin: null,
                    is_client: null,
                    is_director: null,
                    is_employee: null,
                    male: null,
                    name: name.value,
                    number: null,
                    passport_code: passportCode.value,
                    passport_number: passportNumber.value,
                    passport_serial: passportSeries.value,
                    passport_take: passportTake.value,
                    passport_take_date: passportTakeDate.value
                        ? formatDateJs(passportTakeDate.value, "yyyy-MM-dd")
                        : null,
                    patro: null,
                    short_fio: null,
                    surname: surname.value,
                    user_id: null,
                    vatin: null,
                },
                id: null,
                is_legal_entity: false,
                media: [],
                number: null,
                source_attraction_id: null,
                updated_at: null,
            });
        } else {
            client = clients[0];
        }
        emit("create-rent", client);
    } catch (e) {
        emit("error", e);
        hide();
    }
};

defineExpose({ show, hide, toggle });
</script>

<template>
    <BaseModal ref="modal">
        <div class="modal-booking">
            <h3 class="modal-booking__heading">{{ trans["booking"] }}</h3>
            <form
                class="modal-booking__form"
                :class="{
                    'modal-booking__form--flex': passport,
                    'modal-booking__form--single': !passport,
                }"
            >
                <div :class="{ 'modal-booking__form-half': passport }">
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="`${trans['name']} *`"
                            v-model="name"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="`${trans['surname']} *`"
                            v-model="surname"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <PhoneNumberInput v-model="phone" />
                    </div>
                    <div class="modal-booking__form-group" v-if="passport">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="`${trans['passport_serial']} *`"
                            v-model="passportSeries"
                        />
                    </div>
                </div>
                <div class="modal-booking__form-half" v-if="passport">
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="`${trans['passport_number']} *`"
                            v-model="passportNumber"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="`${trans['passport_issued_by']} *`"
                            v-model="passportTake"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <DatePicker
                            v-model="passportTakeDate"
                            :placeholder="`${trans['passport_date']} *`"
                            :enable-time-picker="false"
                            :close-on-auto-apply="true"
                        />
                        <!-- :format="'YYYY-MM-DD'"-->
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            :placeholder="trans['passport_code']"
                            v-model="passportCode"
                        />
                    </div>
                </div>
            </form>
            <div class="modal-booking__rent">
                <span>
                    {{ trans["rent"] }} {{ trans["with"] }}
                    <b>{{ formatDateJs(startDate, "dd.MM.yyyy T") }}</b>
                    {{ trans["to"] }}
                    <b>{{ formatDateJs(endDate, "dd.MM.yyyy T") }}</b>
                </span>
            </div>

            <div class="modal-booking__personal-data">
                <BaseCheckbox v-model="agreePersonalData">
                    {{ trans["agreement"] }}
                </BaseCheckbox>
            </div>

            <div
                class="modal-booking__footer"
                :class="{ 'modal-booking__footer--center': inventory === null }"
            >
                <InventoryBookingBadge
                    v-if="inventory !== null"
                    class="modal-booking__badge"
                    :title="inventory.title"
                    :category-title="inventory.category?.title"
                    :avatar="inventory.avatar"
                    :sum-rent="sumRent"
                    no-shadow
                    left-align
                >
                    <template #button>
                        <BaseButton
                            :disabled="disableButton"
                            @click="getClient"
                        >
                            {{ payable ? trans["pay"] : trans["book"] }}
                        </BaseButton>
                    </template>
                </InventoryBookingBadge>
                <BaseButton v-else :disabled="disableButton" @click="getClient">
                    {{ payable ? trans["pay"] : trans["book"] }}
                </BaseButton>
            </div>
            <div class="modal-booking__error" v-if="disableButton">
                <span>* {{ trans["fill_required"] }}</span>
            </div>
        </div>
        <BaseLoading v-if="saving" background />
    </BaseModal>
</template>
