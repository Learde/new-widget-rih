<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { calculateRent, createRent } from "@api";
import { formatDateJs } from "@helpers";
import { generalProps, useCartStore, useClientStore } from "@stores";
import RentDatetimePicker from "./components/RentDatetimePicker/RentDatetimePicker.vue";
import InventoryBookingBadge from "./components/InventoryBookingBadge/InventoryBookingBadge.vue";
import RentInformation from "./components/RentInformation/RentInformation.vue";
import ModalBooking from "./components/ModalBooking/ModalBooking.vue";
import ModalSuccess from "../ModalSuccess/ModalSuccess.vue";
import ModalError from "../ModalError/ModalError.vue";
import PromocodeInput from "../PromocodeInput/PromocodeInput.vue";
import { storeToRefs } from "pinia";

const props = defineProps({
    inventory: Object,
});

const datetime = ref([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
]);

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

const format = "yyyy-MM-dd'T'HH:mm:00ZZZ";

const recalc = async () => {
    try {
        calculating.value = true;
        calculatedRent.value = (
            await calculateRent({
                inventory: props.inventory,
                inventoryId: props.inventory.id,
                price: props.inventory.prices[0],
                priceId: props.inventory.prices[0].id,
                timeStart: formatDateJs(startDate.value, format),
                timeEnd: formatDateJs(endDate.value, format),
                closePoint: props.inventory?.point,
                closePointId: props.inventory?.point?.id,
                openPoint: props.inventory?.point,
                openPointId: props.inventory?.point?.id,
                discount: selectedPromo.value,
                discountId: selectedPromo.value?.id,
            })
        )?.data.array?.[0];
        sumRent.value = calculatedRent.value.sum_total;
    } catch (e) {
        //TODO: вывести ошибку
        console.log(e);
    } finally {
        calculating.value = false;
    }
};

const tryCreateRent = async (client) => {
    try {
        if (calculatedRent.value) {
            calculatedRent.value.client = client;
            calculatedRent.value.human_id = client.id;
            const payload = (await createRent(calculatedRent.value)).data;
            if (payload.error !== undefined) {
                modalError.value.show(payload.error);
            }
            modal.value.hide();
            modalSuccess.value.show();
        }
    } catch (e) {
        console.log(e);
        modalError.value.show(e);
    }
};

watch(datetime, () => {
    recalc();
    updateIncludes();
});

onMounted(() => {
    recalc();
    updateIncludes();
});

const disableBooking = ref(false);

const changePromo = (promo) => {
    selectedPromo.value = promo;
    recalc();
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
        console.log(client, isAuth);
        if (isAuth.value) {
            tryCreateRent({ ...client.value, ...client.value.human });
        } else {
            authModal.value.show();
        }
    }
};
</script>

<template>
    <div class="booking" id="booking">
        <h2 class="booking__heading">Расчет аренды</h2>
        <div class="booking__wrapper">
            <RentDatetimePicker
                class="booking__time"
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
                        *Выбранный промежуток недоступен для аренды<br />
                        Выберите другие даты
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
        <ModalSuccess ref="modalSuccess" />
        <ModalError ref="modalError" />
    </div>
</template>
