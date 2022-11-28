<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { calculateRent, createRent } from "@api";
import { formatDateJs } from "@helpers";
import RentDatetimePicker from "./components/RentDatetimePicker/RentDatetimePicker.vue";
import InventoryBookingBadge from "./components/InventoryBookingBadge/InventoryBookingBadge.vue";
import RentInformation from "./components/RentInformation/RentInformation.vue";
import ModalBooking from "./components/ModalBooking/ModalBooking.vue";
import ModalSuccess from "../ModalSuccess/ModalSuccess.vue";
import ModalError from "../ModalError/ModalError.vue";

const props = defineProps({
    inventory: Object,
});

const datetime = ref([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
]);
const startDate = computed(() => datetime.value[0]);
const endDate = computed(() => datetime.value[1]);

const calculating = ref(true);
const sumRent = ref(0);
const calculatedRent = ref(null);
const modal = ref(null);
const modalSuccess = ref(null);
const modalError = ref(null);

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
});

onMounted(() => {
    recalc();
});

const disableBooking = ref(false);
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
                <!--                <div-->
                <!--                    class="rih-booking__promo"-->
                <!--                    v-if="needPromocode && !needCart"-->
                <!--                >-->
                <!--                    <div class="rih-booking__promo-row">-->
                <!--                        <input-->
                <!--                            class="rih-booking__promo-input rih-form-group__input"-->
                <!--                            placeholder="Введите промокод"-->
                <!--                            v-model="promocode"-->
                <!--                            :disabled="promocodeSubmited"-->
                <!--                        />-->
                <!--                        <button-->
                <!--                            class="rih-button rih-button&#45;&#45;long"-->
                <!--                            @click="checkPromo"-->
                <!--                            v-if="!promocodeSubmited"-->
                <!--                        >-->
                <!--                            Применить-->
                <!--                        </button>-->
                <!--                        <button-->
                <!--                            class="rih-button rih-button&#45;&#45;long"-->
                <!--                            @click="deletePromo"-->
                <!--                            v-else-->
                <!--                        >-->
                <!--                            Отменить-->
                <!--                        </button>-->
                <!--                    </div>-->
                <!--                    <p class="rih-booking__error" v-if="promocodeError">-->
                <!--                        {{ promocodeError }}-->
                <!--                    </p>-->
                <!--                    <p class="rih-booking__success" v-if="promocodeSubmited">-->
                <!--                        Промокод на скидку в {{ promocodeObject.value }}-->
                <!--                        <span v-if="promocodeObject.discount_type_id === 1"-->
                <!--                            ><i class="fa-solid fa-ruble-sign"></i-->
                <!--                        ></span>-->
                <!--                        <span v-else-if="promocodeObject.discount_type_id === 2"-->
                <!--                            >%</span-->
                <!--                        >-->
                <!--                        применен-->
                <!--                    </p>-->
                <!--                </div>-->
                <InventoryBookingBadge
                    :title="inventory.title"
                    :category-title="inventory.category?.title"
                    :avatar="inventory.avatar"
                    :sum-rent="sumRent"
                    :loading="calculating"
                    :disable-booking="disableBooking"
                    @open-modal="modal.show()"
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
