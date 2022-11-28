<script setup>
import {
    BaseModal,
    BaseButton,
    BaseCheckbox,
    PhoneNumberInput,
    DatePicker,
} from "@uikit";
import { checkOrCreateClient } from "@api";
import InventoryBookingBadge from "../InventoryBookingBadge/InventoryBookingBadge.vue";
import { generalProps } from "@stores";
import { formatDateJs } from "@helpers";
import { ref, computed } from "vue";
import BaseLoading from "@uikit/BaseLoading/BaseLoading.vue";

const emit = defineEmits(["create-rent", "error"]);

defineProps({
    startDate: [Date, String],
    endDate: [Date, String],
    inventory: Object,
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
        let client = (
            await checkOrCreateClient({
                name: name.value,
                surname: surname.value,
                phone: phone.value,
                passportCode: passportCode.value,
                passportNumber: passportNumber.value,
                passportSerial: passportSeries.value,
                passportTake: passportTake.value,
                passportTakeDate: formatDateJs(
                    passportTakeDate.value,
                    "yyyy-MM-dd"
                ),
            })
        ).data;

        if (client.error !== undefined) {
            emit("error", client.error);
            hide();
        }

        if (client) {
            client = { ...client, ...client.human };
            emit("create-rent", client);
        }
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
            <h3 class="modal-booking__heading">Забронировать</h3>
            <form
                class="modal-booking__form"
                :class="{ 'modal-booking__form--flex': passport }"
            >
                <div :class="{ 'modal-booking__form-half': passport }">
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Имя *"
                            v-model="name"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Фамилия *"
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
                            placeholder="Серия паспорта *"
                            v-model="passportSeries"
                        />
                    </div>
                </div>
                <div class="modal-booking__form-half" v-if="passport">
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Номер паспорта *"
                            v-model="passportNumber"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Кем выдан паспорт *"
                            v-model="passportTake"
                        />
                    </div>
                    <div class="modal-booking__form-group">
                        <DatePicker
                            v-model="passportTakeDate"
                            placeholder="Дата получения паспорта *"
                            :enable-time-picker="false"
                            :close-on-auto-apply="true"
                        />
                        <!-- :format="'YYYY-MM-DD'"-->
                    </div>
                    <div class="modal-booking__form-group">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Код подразделения"
                            v-model="passportCode"
                        />
                    </div>
                </div>
            </form>
            <div class="modal-booking__rent">
                <span>
                    Аренда с
                    <b>{{ formatDateJs(startDate, "dd.MM.yyyy T") }}</b> по
                    <b>{{ formatDateJs(endDate, "dd.MM.yyyy T") }}</b>
                </span>
            </div>

            <div class="modal-booking__personal-data">
                <BaseCheckbox v-model="agreePersonalData">
                    Согласие на обработку персональных данных
                </BaseCheckbox>
            </div>

            <div class="modal-booking__footer">
                <InventoryBookingBadge
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
                            {{ payable ? "Оплатить" : "Забронировать" }}
                        </BaseButton>
                    </template>
                </InventoryBookingBadge>
            </div>
            <div class="modal-booking__error" v-if="disableButton">
                <span>*Заполните все обязательные поля</span>
            </div>
        </div>
        <BaseLoading v-if="saving" background />
    </BaseModal>
</template>
