<script setup>
import { ref, computed, watch, onMounted } from "vue";
import {
    prepareRent,
    addInventoryToRent,
    setRentTime,
    saveRent,
    addClientToRent,
} from "@api";
import { dateJsToISO } from "@helpers";
import {
    generalProps,
    bookingProps,
    useCartStore,
    useClientStore,
    useRouterStore,
    useFiltersStore,
} from "@stores";
import RentDatetimePicker from "./components/RentDatetimePicker/RentDatetimePicker.vue";
import RentDatetimePickerRange from "./components/RentDatetimePicker/RentDatetimePickerRange.vue";
import InventoryBookingBadge from "./components/InventoryBookingBadge/InventoryBookingBadge.vue";
import RentInformation from "./components/RentInformation/RentInformation.vue";
import ModalBooking from "./components/ModalBooking/ModalBooking.vue";
import ModalSuccess from "../ModalSuccess/ModalSuccess.vue";
import ModalError from "../ModalError/ModalError.vue";
import PromocodeInput from "../PromocodeInput/PromocodeInput.vue";
import { storeToRefs } from "pinia";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();
const filtersStore = useFiltersStore();

const props = defineProps({
    inventory: Object,
});

const sessionKey = ref(null);

const limitDays = bookingProps.limitDays;
const hasRange = limitDays === null || Number(limitDays) > 0;

let currentDate = new Date();
if (filtersStore.data.dateStart) {
    currentDate = new Date(filtersStore.data.dateStart);
}

let futureDate = new Date();
if (filtersStore.data.dateEnd) {
    futureDate = new Date(filtersStore.data.dateEnd);
} else {
    futureDate.setDate(futureDate.getDate() + bookingProps.defaultDays);
    futureDate.setHours(futureDate.getHours() + bookingProps.defaultHours);
    futureDate.setMinutes(
        futureDate.getMinutes() + bookingProps.defaultMinutes
    );
}

const datetime = ref([currentDate, futureDate]);

const { promocode, cart, authorization } = generalProps;

const startDate = computed(() => datetime.value[0]);
const endDate = computed(() => datetime.value[1]);

const calculating = ref(true);
const sumRent = ref(0);
const calculatedRent = ref(null);
const modal = ref(null);
const modalSuccess = ref(null);
const modalError = ref(null);
const selectedPromo = ref(null);
const datetimeKey = ref(42);

const tryCreateRent = async (client) => {
    try {
        if (client?.human?.id) {
            await addClientToRent(client.human.id, sessionKey.value);
        }

        await saveRent(sessionKey.value);
        modal.value.hide();
        modalSuccess.value.show();
    } catch (e) {
        modalError.value.show(e?.response?.data?.error);
    }
};

watch(datetime, async () => {
    calculating.value = true;

    calculatedRent.value = await setRentTime(
        dateJsToISO(datetime.value[0]),
        dateJsToISO(datetime.value[1]),
        sessionKey.value
    );
    sumRent.value = calculatedRent.value.sum;

    calculating.value = false;
    updateIncludes();
});

onMounted(async () => {
    calculating.value = true;

    const response = await prepareRent(
        dateJsToISO(datetime.value[0]),
        dateJsToISO(datetime.value[1])
    );
    sessionKey.value = response.data.rentSessionKey;

    calculatedRent.value = await addInventoryToRent(
        props.inventory,
        sessionKey.value
    );
    sumRent.value = calculatedRent.value.sum;

    calculating.value = false;

    updateIncludes();
});

const disableBooking = ref(false);

const changePromo = (promo) => {
    selectedPromo.value = promo;
    // recalc();
};

const cartStore = useCartStore();
const { addInventory, includesInventory } = cartStore;

const addInCart = () => {
    addInventory(
        { ...props.inventory, sumRent: sumRent.value },
        new Date(startDate.value).getTime(),
        new Date(endDate.value).getTime()
    );
    updateIncludes();
};

const inventoryAdded = ref(false);

const updateIncludes = () => {
    inventoryAdded.value = includesInventory(
        props.inventory,
        new Date(startDate.value).getTime(),
        new Date(endDate.value).getTime()
    );
};

const handleBooking = () => {
    if (!authorization) {
        modal.value.show();
    } else {
        const clientStore = useClientStore();
        const { client, isAuth, authModal } = storeToRefs(clientStore);
        if (isAuth.value) {
            tryCreateRent({ ...client.value, ...client.value.human });
        } else {
            authModal.value.show();
        }
    }
};

const router = useRouterStore();
const { changeRoute } = router;

const goToList = () => {
    changeRoute("inventoryList");
};
</script>

<template>
    <div class="booking container" id="booking">
        <h2 class="booking__heading">{{ trans["calc_rent"] }}</h2>
        <div class="booking__wrapper">
            <RentDatetimePickerRange
                v-if="hasRange"
                class="booking__time"
                :key="datetimeKey"
                v-model="datetime"
                :inventory-id="inventory.id"
                @disable-booking="(newValue) => (disableBooking = newValue)"
            />
            <RentDatetimePicker
                v-else
                class="booking__time"
                :key="datetimeKey"
                v-model="datetime"
                :inventory-id="inventory.id"
                @disable-booking="(newValue) => (disableBooking = newValue)"
            />
            <div class="booking__info">
                <RentInformation
                    :sum-rent="sumRent"
                    :start-date="startDate"
                    :end-date="endDate"
                    :point-title="inventory.point?.title"
                />
                <PromocodeInput
                    v-if="!cart && promocode"
                    @input="changePromo"
                    class="booking__promocode"
                />
                <InventoryBookingBadge
                    :title="inventory.title"
                    :category-title="inventory.category?.title"
                    :avatar="inventory.avatar"
                    :sum-rent="sumRent"
                    :loading="calculating"
                    :disable-booking="disableBooking || inventoryAdded"
                    @open-modal="handleBooking"
                    @add="addInCart"
                />
                <div class="booking__error-wrapper" v-if="disableBooking">
                    <span class="booking__error">
                        *{{ trans["booking_disabled"] }}<br />
                        {{ trans["change_dates"] }}
                    </span>
                </div>
            </div>
        </div>
        <ModalBooking
            ref="modal"
            :start-date="startDate"
            :end-date="endDate"
            :inventory="inventory"
            :sum-rent="sumRent"
            @error="(error) => modalError.show(error)"
            @create-rent="tryCreateRent"
        />
        <ModalSuccess ref="modalSuccess" @close="goToList" />
        <ModalError ref="modalError" />
    </div>
</template>
