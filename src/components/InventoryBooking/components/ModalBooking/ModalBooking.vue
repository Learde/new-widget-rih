<script setup>
import { BaseModal, BaseButton, PhoneNumberInput } from "@uikit";
import { ref } from "vue";

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
</script>

<template>
    <BaseModal ref="modal">
        <div class="modal-booking">
            <h3 class="modal-booking__heading">Забронировать</h3>
            <form
                class="modal-booking__form"
                :class="{ 'modal-booking__form--flex': needPassport }"
            >
                <div :class="{ 'modal-booking__form-half': needPassport }">
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
                        <PhoneNumberInput />
                        <!--                        <vue-phone-number-input-->
                        <!--                            class="rih-phone-number-input"-->
                        <!--                            :preferred-countries="preferredCountries"-->
                        <!--                            :translations="{-->
                        <!--                                phoneNumberLabel: 'Телефон *',-->
                        <!--                            }"-->
                        <!--                            :color="colors.primary"-->
                        <!--                            valid-color="#1ab394"-->
                        <!--                            error-color="#ce352c"-->
                        <!--                            @update="changeNumber"-->
                        <!--                            v-model="phone"-->
                        <!--                        ></vue-phone-number-input>-->
                    </div>
                    <div class="modal-booking__form-group" v-if="needPassport">
                        <input
                            class="modal-booking__input"
                            type="text"
                            placeholder="Серия паспорта *"
                            v-model="passportSeries"
                        />
                    </div>
                </div>
                <div class="modal-booking__form-half" v-if="needPassport">
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
                        <!--                        <date-pick-->
                        <!--                            v-model="passportTakeDate"-->
                        <!--                            :input-attributes="{-->
                        <!--                                placeholder: 'Дата получения паспорта *',-->
                        <!--                            }"-->
                        <!--                            :format="'YYYY-MM-DD'"-->
                        <!--                            class="modal-booking__date"-->
                        <!--                            next-month-caption="Следующий месяц"-->
                        <!--                            prev-month-caption="Предыдущий месяц"-->
                        <!--                            set-time-caption="Время:"-->
                        <!--                            :weekdays="weekdays"-->
                        <!--                            :months="months"-->
                        <!--                        ></date-pick>-->
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
                    <!--                    Аренда с <b>{{ format(timeStart) }}</b> по-->
                    <!--                    <b>{{ format(timeEnd) }}</b>-->
                </span>
            </div>

            <div class="modal-booking__personal-data">
                <!--                <p-check-->
                <!--                    class="p-curve p-svg p-jelly"-->
                <!--                    name="check"-->
                <!--                    color="success"-->
                <!--                    v-model="personalData"-->
                <!--                >-->
                <!--                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">-->
                <!--                        <path-->
                <!--                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"-->
                <!--                            style="stroke: white; fill: white"-->
                <!--                        ></path>-->
                <!--                    </svg>-->
                <!--                    Согласие на обработку персональных данных *-->
                <!--                </p-check>-->
            </div>

            <div class="modal-booking__footer">
                <!--                <div-->
                <!--                    class="rih-booking-form__inventory modal-booking__inventory"-->
                <!--                >-->
                <!--                    <img-->
                <!--                        class="rih-booking-form__img"-->
                <!--                        :src="MEDIA + pickedInventory.avatar"-->
                <!--                        :alt="pickedInventory.title"-->
                <!--                    />-->
                <!--                    <div class="rih-booking-form__info">-->
                <!--                        <span class="rih-booking-form__title">-->
                <!--                            {{ pickedInventory.title | cutString }}-->
                <!--                        </span>-->
                <!--                        <span-->
                <!--                            v-if="pickedInventory.category"-->
                <!--                            class="rih-booking-form__category"-->
                <!--                        >-->
                <!--                            {{ pickedInventory.category.title }}-->
                <!--                        </span>-->
                <!--                    </div>-->
                <!--                </div>-->

                <span class="modal-booking__price"
                    >К оплате: {{ sumRent }} руб.
                </span>

                <button
                    v-if="payable"
                    class="rih-button rih-button--long"
                    :disabled="disableButton"
                    @click="addRent"
                >
                    Оплатить
                </button>
                <button
                    v-else
                    class="rih-button rih-button--long"
                    :disabled="disableButton"
                    @click="addRent"
                >
                    Забронировать
                </button>
            </div>
            <div class="modal-booking__error" v-if="disableButton">
                <span>*Заполните все обязательные поля</span>
            </div>
            <BaseButton> Забронировать </BaseButton>
        </div>
    </BaseModal>
</template>
