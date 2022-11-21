<script setup>
import { ref, computed } from "vue";
import RentDatetimePicker from "./components/RentDatetimePicker/RentDatetimePicker.vue";
import InventoryBookingBadge from "./components/InventoryBookingBadge/InventoryBookingBadge.vue";
import RentInformation from "@/components/InventoryBooking/components/RentInformation/RentInformation.vue";

defineProps({
    inventory: Object,
});

const datetime = ref([
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(),
]);
const startDate = computed(() => datetime.value[0]);
const endDate = computed(() => datetime.value[1]);
const sumRent = 0;
</script>

<template>
    <div class="rih-booking" id="rih-booking">
        <h2 class="rih-booking__heading">Расчет аренды</h2>
        <div class="rih-booking__wrapper">
            <RentDatetimePicker class="rih-booking__time" v-model="datetime" />
            <div class="rih-booking__info">
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
                />
                <div class="rih-booking__error-wrapper" v-if="disableBooking">
                    <span class="rih-booking__error">
                        *Выбранный промежуток недоступен для аренды<br />
                        Выберите другие даты
                    </span>
                </div>
            </div>
        </div>
        <!--        <rih-modal-->
        <!--            v-if="showModal"-->
        <!--            @close="showModal = false"-->
        <!--            :picked-inventory="inventory"-->
        <!--            :calculated-rent="calculatedRent"-->
        <!--            :sum-rent="sumRent"-->
        <!--            :time-start="timeStart"-->
        <!--            :time-end="timeEnd"-->
        <!--            :saved-modal-data="savedModalData"-->
        <!--        ></rih-modal>-->
    </div>
</template>
