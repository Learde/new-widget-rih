<script setup>
import { ref, onMounted } from "vue";
import { BaseButton, BaseLoading } from "@uikit";
import { formatDateJs } from "@helpers";
import {
    currencyIcon,
    generalProps,
    useCartStore,
    useClientStore,
} from "@stores";
import InventoryBookingBadge from "@/components/InventoryBooking/components/InventoryBookingBadge/InventoryBookingBadge.vue";
import ModalBooking from "@/components/InventoryBooking/components/ModalBooking/ModalBooking.vue";
import ModalSuccess from "@/components/ModalSuccess/ModalSuccess.vue";
import ModalError from "@/components/ModalError/ModalError.vue";
import PromocodeInput from "@/components/PromocodeInput/PromocodeInput.vue";
import { calculateRents, openRent } from "@api";
import { storeToRefs } from "pinia";

const props = defineProps({
    startDate: [Date, Number, String],
    endDate: [Date, Number, String],
    inventories: Array,
});

const { promocode, authorization } = generalProps;
const modal = ref(null);
const modalError = ref(null);
const modalSuccess = ref(null);
const cartStore = useCartStore();
const { removeInventory } = cartStore;

const deleteFromCart = (inv) => {
    removeInventory(
        inv,
        new Date(props.startDate).getTime(),
        new Date(props.endDate).getTime()
    );
};

const calculating = ref(false);
const calculatedRent = ref(null);
const selectedPromo = ref(null);
const price = ref(null);
const format = "yyyy-MM-dd'T'HH:mm:00ZZZ";

const recalc = async () => {
    try {
        calculating.value = true;
        calculatedRent.value = (
            await calculateRents({
                inventories: props.inventories,
                timeStart: formatDateJs(new Date(props.startDate), format),
                timeEnd: formatDateJs(new Date(props.endDate), format),
                closePoint: props.inventories[0]?.point,
                closePointId: props.inventories[0]?.point?.id,
                openPoint: props.inventories[0]?.point,
                openPointId: props.inventories[0]?.point?.id,
                discount: selectedPromo.value,
                discountId: selectedPromo.value?.id,
            })
        )?.data.array?.[0];
        price.value = calculatedRent.value.sum_total;
    } catch (e) {
        //TODO: вывести ошибку
        console.log(e);
    } finally {
        calculating.value = false;
    }
};

const changePromo = (promo) => {
    selectedPromo.value = promo;
    recalc();
};

const tryCreateRent = async (client) => {
    try {
        if (calculatedRent.value) {
            calculatedRent.value.client = client;
            calculatedRent.value.human_id = client.id;
            const payload = (await openRent(calculatedRent.value)).data;
            if (payload.error !== undefined) {
                modalError.value.show(payload.error);
            }
            modal.value.hide();
            modalSuccess.value.show();

            setTimeout(() => {
                props.inventories.forEach((inv) => {
                    deleteFromCart(inv);
                });
            }, 3000);
        }
    } catch (e) {
        modalError.value.show(e?.response?.data?.error);
    }
};

const handleBook = () => {
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

onMounted(() => {
    recalc();
});
</script>

<template>
    <div class="cart-component">
        <h3 class="cart-component__heading">
            Период: {{ formatDateJs(new Date(startDate)) }} -
            {{ formatDateJs(new Date(endDate)) }}
        </h3>
        <div class="cart-component__list">
            <div
                class="cart-component__item cart-item"
                v-for="inv in inventories"
                :key="inv.id"
            >
                <InventoryBookingBadge
                    class="cart-component__badge"
                    :category-title="inv.category?.title"
                    :title="inv.title"
                    :avatar="inv.avatar"
                    :category-title-length="40"
                    :title-length="40"
                    no-shadow
                    no-price
                    no-media-queries
                >
                    <template #button> &#160; </template>
                </InventoryBookingBadge>
                <span class="cart-item__total">
                    Цена: {{ inv.sumRent }}
                    <component :is="currencyIcon" class="inv-card__icon" />
                </span>
                <BaseButton variant="danger" @click="deleteFromCart(inv)">
                    Удалить
                </BaseButton>
            </div>
        </div>
        <div class="cart-component__footer">
            <PromocodeInput
                v-if="promocode"
                @input="changePromo"
                style="margin-top: 0; margin-right: auto"
            />

            <div class="cart-component__footer-row">
                <span class="cart-component__total"
                    >Итого: {{ price }}
                    <component :is="currencyIcon" class="inv-card__icon" />
                </span>
                <BaseButton @click="handleBook"> Забронировать </BaseButton>
            </div>
        </div>
        <BaseLoading v-if="calculating" background />
        <ModalBooking
            ref="modal"
            :sum-rent="price"
            :start-date="startDate"
            :end-date="endDate"
            @error="(error) => modalError.show(error)"
            @create-rent="tryCreateRent"
        />
        <ModalSuccess ref="modalSuccess" />
        <ModalError ref="modalError" />
    </div>
</template>
