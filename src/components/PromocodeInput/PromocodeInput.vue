<script setup>
import { ref } from "vue";
import { BaseButton } from "@uikit";
import { searchDiscount } from "@api";
import { IconRubleSign } from "@icons";

const emit = defineEmits(["input"]);

const promocodeError = ref(null);
const promocode = ref(null);
const foundPromocode = ref(null);
const promocodeSubmitted = ref(false);

const checkPromocode = async () => {
    try {
        promocodeError.value = null;
        const promocodeResponse = (
            await searchDiscount({ checkPromocode: promocode.value })
        ).data;
        const promocodeData = promocodeResponse?.array?.[0];
        if (promocodeData) {
            foundPromocode.value = promocodeData;
            promocodeSubmitted.value = true;
            emit("input", promocodeData);
        } else if (promocodeResponse.error) {
            promocodeError.value = promocodeResponse.error;
        } else {
            promocodeError.value = "Промокод не найден";
        }
    } catch (error) {
        promocodeError.value = error?.response?.data?.error;
    }
};

const deletePromo = () => {
    promocode.value = null;
    foundPromocode.value = null;
    promocodeSubmitted.value = false;
    promocodeError.value = null;
    emit("input", null);
};
</script>

<template>
    <div class="promo-input">
        <div class="promo-input__promo-row">
            <input
                class="promo-input__input"
                placeholder="Введите промокод"
                v-model="promocode"
                :disabled="promocodeSubmitted"
            />
            <BaseButton v-if="!promocodeSubmitted" @click="checkPromocode">
                Применить
            </BaseButton>
            <BaseButton v-else @click="deletePromo"> Отменить </BaseButton>
        </div>
        <p class="promo-input__error" v-if="promocodeError">
            {{ promocodeError }}
        </p>
        <p class="promo-input__success" v-if="promocodeSubmitted">
            Промокод на скидку в {{ foundPromocode.value }}
            <span v-if="foundPromocode.discount_type_id === 1"
                ><IconRubleSign
            /></span>
            <span v-else-if="foundPromocode.discount_type_id === 2">%</span>
            применен
        </p>
    </div>
</template>
