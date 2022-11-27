<script setup>
import { InlineCalendar, TimePicker } from "@uikit";
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const timeStartFilter = ref({
    times: {
        hours: [1, 2, 3, 4],
        minutes: [],
    },
});
const timeEndFilter = ref({
    times: {
        hours: [1, 2, 3, 4],
        minutes: [],
    },
});

const date = ref(props.modelValue);
const timeStart = ref(props.modelValue[0]);
const timeEnd = ref(props.modelValue[1]);
const setTime = () => {
    const newDate = JSON.parse(JSON.stringify(date.value));

    newDate[0] = new Date(newDate[0]);
    if (timeStart.value.hours !== undefined) {
        newDate[0].setHours(timeStart.value.hours);
        newDate[0].setMinutes(timeStart.value.minutes);
        newDate[0].setSeconds(timeStart.value.seconds);
    }

    newDate[1] = new Date(newDate[1]);
    if (timeEnd.value.minutes !== undefined) {
        newDate[1].setHours(timeEnd.value.hours);
        newDate[1].setMinutes(timeEnd.value.minutes);
        newDate[1].setSeconds(timeEnd.value.seconds);
    }

    emit("update:modelValue", newDate);
};

const changeTime = (filter, current) => {
    if (filter.hours.length < 24) {
        while (filter.hours.includes(current.hours)) {
            current.hours += 1;
            current.hours %= 24;
        }
    }
    if (filter.minutes.length < 60) {
        while (filter.minutes.includes(current.minutes)) {
            current.minutes += 1;
            current.minutes %= 60;
        }
    }
};

watch(date, () => {
    setTime();
});
watch(timeStart, () => {
    changeTime(timeStartFilter.value.times, timeStart.value);
    setTime();
});
watch(timeEnd, () => {
    changeTime(timeEndFilter.value.times, timeEnd.value);
    setTime();
});
</script>

<template>
    <div class="rent-datetime">
        <div class="rent-datetime__time-picker rih-time-picker">
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время начала
                </span>
                <TimePicker :filters="timeStartFilter" v-model="timeStart" />
                <!--                <vue-timepicker-->
                <!--                    close-on-complete-->
                <!--                    manual-input-->
                <!--                    hour-label="Часы"-->
                <!--                    minute-label="Минуты"-->
                <!--                    placeholder="Введите время"-->
                <!--                    v-model="timeStartValue"-->
                <!--                    @input="calculateRent"-->
                <!--                    :hour-range="hourRangeStart"-->
                <!--                    :minute-range="minuteRangeStart"-->
                <!--                ></vue-timepicker>-->
            </div>
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время конца
                </span>
                <TimePicker :filters="timeEndFilter" v-model="timeEnd" />
                <!--                <vue-timepicker-->
                <!--                    close-on-complete-->
                <!--                    manual-input-->
                <!--                    hour-label="Часы"-->
                <!--                    minute-label="Минуты"-->
                <!--                    placeholder="Введите время"-->
                <!--                    v-model="timeEndValue"-->
                <!--                    @input="calculateRent"-->
                <!--                    :hour-range="hourRangeEnd"-->
                <!--                    :minute-range="minuteRangeEnd"-->
                <!--                ></vue-timepicker>-->
            </div>
        </div>
        <!--                    <InlineCalendar-->
        <!--                        :key="pickerKey"-->
        <!--                        ref="picker"-->
        <!--                        opens="inline"-->
        <!--                        :ranges="false"-->
        <!--                        auto-apply-->
        <!--                        single-date-picker="range"-->
        <!--                        v-model="range"-->
        <!--                        :locale-data="rangeLocale"-->
        <!--                        :date-format="dateFormat"-->
        <!--                        :min-date="minDate"-->
        <!--                        @update="changeRange"-->
        <!--                        @change-month="loadBooking"-->
        <!--                    />-->
        <div>
            <span class="rent-datetime__label">Выберите срок аренды </span>
            <InlineCalendar v-model="date" :enable-time-picker="false" />
        </div>
    </div>
</template>
