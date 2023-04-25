<script setup>
import { computed, onMounted, ref, watchEffect, watch } from "vue";
import {
    isNil,
    getMonth,
    getYear,
    parseISO,
    compareDatesWithDayPrecision,
    isAfter,
    isEqual,
    isBefore,
    compareDatesWithMinutePrecision,
    parseTimeString,
    compareDatesWithHourPrecision,
} from "@helpers";
import { InlineCalendar, TimePicker } from "@uikit";
import { getRentsOfInventory } from "@api";
import { bookingProps } from "@stores";

const emit = defineEmits(["update:modelValue", "disableBooking"]);
const props = defineProps({
    modelValue: Array,
    inventoryId: [Number, String],
});

// Datetime picker
const currentDates = computed({
    get() {
        return [props.modelValue[0], props.modelValue[1]];
    },
    set([value1, value2]) {
        const firstDate = new Date(datetimeStart.value.getTime());
        const secondDate = new Date(datetimeEnd.value.getTime());

        firstDate.setFullYear(
            value1.getFullYear(),
            value1.getMonth(),
            value1.getDate()
        );
        secondDate.setFullYear(
            value2.getFullYear(),
            value2.getMonth(),
            value2.getDate()
        );

        emit("update:modelValue", [firstDate, secondDate]);
    },
});

// watch(
//     () => props.modelValue,
//     ([value1, value2]) => {
//         const firstDate = new Date(datetimeStart.value.getTime());
//         const secondDate = new Date(datetimeEnd.value.getTime());
//
//         console.log(value1, firstDate);
//         console.log(value2, secondDate);
//
//         if (
//             !compareDatesWithDayPrecision(firstDate, value1, isEqual) ||
//             !compareDatesWithDayPrecision(secondDate, value2, isEqual)
//         ) {
//             firstDate.setFullYear(value1.getFullYear());
//             secondDate.setFullYear(value2.getFullYear());
//
//             emit("update:modelValue", [firstDate, secondDate]);
//         }
//     }
// );

const timeStart = computed({
    get() {
        const firstDate = props.modelValue[0];
        return {
            hours: firstDate.getHours(),
            minutes: firstDate.getMinutes(),
        };
    },
    set(value) {
        const firstDate = new Date(datetimeStart.value.getTime());
        const secondDate = new Date(datetimeEnd.value.getTime());

        let hours = value.hours;
        let minutes = value.minutes;
        const endHours = secondDate.getHours();
        const endMinutes = secondDate.getMinutes();

        if (compareDatesWithDayPrecision(firstDate, secondDate, isEqual)) {
            if (hours > endHours) {
                hours = endHours;
                minutes = endMinutes;
            } else if (hours === +endHours && minutes > endMinutes) {
                minutes = endMinutes;
            }
        }

        firstDate.setHours(hours);
        firstDate.setMinutes(minutes);

        emit("update:modelValue", [firstDate, secondDate]);
    },
});

const timeEnd = computed({
    get() {
        const secondDate = props.modelValue[1];
        return {
            hours: secondDate.getHours(),
            minutes: secondDate.getMinutes(),
        };
    },
    set(value) {
        const firstDate = new Date(datetimeStart.value.getTime());
        const secondDate = new Date(datetimeEnd.value.getTime());

        let hours = value.hours;
        let minutes = value.minutes;
        const startHours = firstDate.getHours();
        const startMinutes = firstDate.getMinutes();

        if (compareDatesWithDayPrecision(firstDate, secondDate, isEqual)) {
            if (startHours > hours) {
                hours = startHours;
                minutes = startMinutes;
            } else if (hours === +startHours && startMinutes > minutes) {
                minutes = startMinutes;
            }
        }

        secondDate.setHours(hours);
        secondDate.setMinutes(minutes);

        emit("update:modelValue", [firstDate, secondDate]);
    },
});

const datetimeStart = computed(() => {
    const firstDate = props.modelValue[0];

    if (!isNil(timeStart.value.hours) && !isNil(timeStart.value.minutes)) {
        firstDate.setHours(timeStart.value.hours);
        firstDate.setMinutes(timeStart.value.minutes);
    }

    return firstDate;
});

const datetimeEnd = computed(() => {
    const secondDate = props.modelValue[1];

    if (!isNil(timeEnd.value.hours) && !isNil(timeEnd.value.minutes)) {
        secondDate.setHours(timeEnd.value.hours);
        secondDate.setMinutes(timeEnd.value.minutes);
    }

    return secondDate;
});

// Booked days
const disabledDays = ref([]);
const partialDisabledDays = ref([]);
const bookedDays = ref([]);

const getDayClass = (date) => {
    const isPartialDisabledDay = partialDisabledDays.value.some((d) =>
        compareDatesWithDayPrecision(d, date, isEqual)
    );

    if (isPartialDisabledDay) return "partial-disabled";
    return "";
};
const changeMonthYear = async ({ month, year }) => {
    try {
        if (month && year) {
            bookedDays.value = (
                await getRentsOfInventory({
                    inventory_id: props.inventoryId,
                    month: month,
                    year: +year % 2000,
                })
            ).data?.cur;

            disabledDays.value = disableDates(month);
        }
    } catch (e) {
        console.log(e);
    }
};

onMounted(() => {
    changeMonthYear({
        month: getMonth(datetimeStart.value),
        year: getYear(datetimeStart.value),
    });
});

const getCountDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

const getDaysInterval = (s, e) => {
    const a = [];
    for (const d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        a.push(new Date(d));
    }
    return a;
};

const getDaysIntervalByMonth = (month) => {
    const first = new Date();
    first.setMonth(month);
    first.setDate(1);
    const second = new Date(first).setDate(
        getCountDaysInMonth(first.getMonth() + 1, first.getFullYear())
    );
    return getDaysInterval(first, second);
};

const disableDates = (month) => {
    const dates = getDaysIntervalByMonth(month).map((oldValue) => {
        return {
            value: oldValue,
            disabled: false,
        };
    });
    dates.forEach((date) => {
        date.disabled = bookedDays.value.some((range) => {
            const rangeStart = parseISO(range.time_start);
            const rangeEnd = parseISO(range.time_end);
            const currentDate = date.value;

            const isBetween =
                compareDatesWithDayPrecision(
                    currentDate,
                    rangeStart,
                    isAfter
                ) &&
                compareDatesWithDayPrecision(currentDate, rangeEnd, isBefore);

            if (isBetween) return true;

            const copyCurrentDate = new Date(currentDate.getTime());

            copyCurrentDate.setHours(0);
            copyCurrentDate.setMinutes(0);

            const isEqualStart = compareDatesWithMinutePrecision(
                copyCurrentDate,
                rangeStart,
                isEqual
            );

            if (isEqualStart) return true;

            copyCurrentDate.setHours(23);
            copyCurrentDate.setMinutes(59);

            const isEqualEnd = compareDatesWithMinutePrecision(
                copyCurrentDate,
                rangeEnd,
                isEqual
            );

            if (isEqualEnd) {
                return true;
            }

            const isPartialBooked =
                compareDatesWithDayPrecision(
                    currentDate,
                    rangeStart,
                    isEqual
                ) ||
                compareDatesWithDayPrecision(currentDate, rangeEnd, isEqual);
            if (isPartialBooked) {
                partialDisabledDays.value.push(currentDate);
            }

            return false;
        });
    });
    return dates.filter((item) => item.disabled).map((item) => item.value);
};

// Booked time
const limitTimeStart = parseTimeString(bookingProps.limitTimeStart);
const limitTimeEnd = parseTimeString(bookingProps.limitTimeEnd);
const limitDays = bookingProps.limitDays;
const getDisabledMinutes = (currentDate) => {
    const minutes = [...Array(60)].map((_, idx) => {
        return { time: idx, disable: false };
    });

    const currentHour = currentDate.getHours();
    const today = new Date();

    if (compareDatesWithHourPrecision(today, currentDate, isEqual)) {
        for (let i = 0; i < today.getMinutes(); i++) minutes[i].disable = true;
    }

    if (
        typeof limitTimeStart?.minutes === "number" &&
        currentHour === limitTimeStart?.hours
    ) {
        for (let i = 0; i < limitTimeStart.minutes; i++) {
            minutes[i].disable = true;
        }
    }

    if (
        typeof limitTimeEnd?.minutes === "number" &&
        currentHour === limitTimeEnd?.hours
    ) {
        for (let i = limitTimeEnd.minutes + 1; i < 60; i++) {
            minutes[i].disable = true;
        }
    }

    if (Array.isArray(bookedDays.value))
        bookedDays.value.some((range) => {
            const rangeStart = parseISO(range.time_start);
            const rangeEnd = parseISO(range.time_end);
            const isCurrentDateBetweenRange =
                compareDatesWithHourPrecision(
                    currentDate,
                    rangeStart,
                    isAfter
                ) &&
                compareDatesWithHourPrecision(currentDate, rangeEnd, isBefore);

            if (isCurrentDateBetweenRange) {
                minutes.forEach((m) => (m.disable = true));
                return true;
            }

            const isCurrentDateRangeStart = compareDatesWithHourPrecision(
                rangeStart,
                currentDate,
                isEqual
            );
            const isCurrentDateRangeEnd = compareDatesWithHourPrecision(
                rangeEnd,
                currentDate,
                isEqual
            );

            let rangeStartMinutes = rangeStart.getMinutes();
            let rangeEndMinutes = rangeStart.getMinutes();

            if (isCurrentDateRangeStart && isCurrentDateRangeEnd) {
                for (let i = rangeStartMinutes; i <= rangeEndMinutes; i++)
                    minutes[i].disable = true;
            } else if (isCurrentDateRangeStart) {
                for (let i = rangeStartMinutes; i < 60; i++)
                    minutes[i].disable = true;
            } else if (isCurrentDateRangeEnd) {
                for (let i = 0; i <= rangeEndMinutes; i++)
                    minutes[i].disable = true;
            }

            return !minutes.some((m) => m.disable === false);
        });

    return minutes.filter((item) => item.disable).map((item) => item.time);
};

const getDisabledHours = (currentDate) => {
    const hours = [...Array(24)].map((_, idx) => {
        return { time: idx, disable: false };
    });

    const today = new Date();

    if (compareDatesWithDayPrecision(today, currentDate, isEqual)) {
        for (let i = 0; i < today.getHours(); i++) hours[i].disable = true;
    }

    if (typeof limitTimeStart?.hours === "number") {
        for (let i = 0; i < limitTimeStart.hours; i++) {
            hours[i].disable = true;
        }
    }

    if (typeof limitTimeEnd?.hours === "number") {
        for (let i = limitTimeEnd.hours + 1; i < 24; i++) {
            hours[i].disable = true;
        }
    }

    if (Array.isArray(bookedDays.value)) {
        bookedDays.value.some((range) => {
            const rangeStart = parseISO(range.time_start);
            const rangeEnd = parseISO(range.time_end);

            const isCurrentDateBetweenRange =
                compareDatesWithDayPrecision(
                    currentDate,
                    rangeStart,
                    isAfter
                ) &&
                compareDatesWithDayPrecision(currentDate, rangeEnd, isBefore);

            if (isCurrentDateBetweenRange) {
                hours.forEach((h) => (h.disable = true));
                return true;
            }

            const isCurrentDateRangeStart = compareDatesWithDayPrecision(
                rangeStart,
                currentDate,
                isEqual
            );
            const isCurrentDateRangeEnd = compareDatesWithDayPrecision(
                rangeEnd,
                currentDate,
                isEqual
            );

            let rangeStartHours = rangeStart.getHours();
            let rangeStartMinutes = rangeStart.getMinutes();
            let rangeEndHours = rangeStart.getHours();
            let rangeEndMinutes = rangeStart.getMinutes();

            if (rangeStartMinutes !== 0) {
                rangeStartHours++;
            }
            if (rangeEndMinutes === 59) {
                rangeEndHours++;
            }

            if (isCurrentDateRangeStart && isCurrentDateRangeEnd) {
                for (let i = rangeStartHours; i < rangeEndHours; i++)
                    hours[i].disable = true;
            } else if (isCurrentDateRangeStart) {
                for (let i = rangeStartHours; i < 24; i++)
                    hours[i].disable = true;
            } else if (isCurrentDateRangeEnd) {
                for (let i = 0; i < rangeEndHours; i++) hours[i].disable = true;
            }

            return !hours.some((h) => h.disable === false);
        });
    }

    return hours.filter((item) => item.disable).map((item) => item.time);
};

const timeStartFilter = computed(() => {
    return {
        times: {
            hours: getDisabledHours(datetimeStart.value),
            minutes: getDisabledMinutes(datetimeStart.value),
        },
    };
});
const timeEndFilter = computed(() => {
    return {
        times: {
            hours: getDisabledHours(datetimeEnd.value),
            minutes: getDisabledMinutes(datetimeEnd.value),
        },
    };
});

const checkDateInRange = (date, rangeStart, rangeEnd) => {
    const isDateBetweenRange =
        compareDatesWithMinutePrecision(date, rangeStart, isAfter) &&
        compareDatesWithMinutePrecision(date, rangeEnd, isBefore);
    const isDateEqualRangeLimits =
        compareDatesWithMinutePrecision(date, rangeStart, isEqual) ||
        compareDatesWithMinutePrecision(date, rangeEnd, isEqual);

    return isDateBetweenRange || isDateEqualRangeLimits;
};

watchEffect(() => {
    // Disable booking if picked start date hour or minute in disabled times
    const currentStartHour = datetimeStart.value.getHours();
    const currentStartMinute = datetimeStart.value.getMinutes();
    if (
        timeStartFilter.value.times.hours.includes(currentStartHour) ||
        timeStartFilter.value.times.minutes.includes(currentStartMinute)
    ) {
        emit("disableBooking", true);
        return;
    }

    // Disable booking if picked end date hour or minute in disabled times
    const currentEndHour = datetimeEnd.value.getHours();
    const currentEndMinute = datetimeEnd.value.getMinutes();
    if (
        timeEndFilter.value.times.hours.includes(currentEndHour) ||
        timeEndFilter.value.times.minutes.includes(currentEndMinute)
    ) {
        emit("disableBooking", true);
        return;
    }

    // Disable booking if picked date in booked range on booked dates in picked range
    const isBookingDisabled = bookedDays.value.some((range) => {
        const rangeStart = parseISO(range.time_start);
        const rangeEnd = parseISO(range.time_end);

        if (checkDateInRange(datetimeStart.value, rangeStart, rangeEnd)) {
            emit("disableBooking", true);
            return true;
        }

        if (checkDateInRange(datetimeEnd.value, rangeStart, rangeEnd)) {
            emit("disableBooking", true);
            return true;
        }

        if (
            checkDateInRange(rangeStart, datetimeStart.value, datetimeEnd.value)
        ) {
            emit("disableBooking", true);
            return true;
        }

        if (
            checkDateInRange(rangeEnd, datetimeStart.value, datetimeEnd.value)
        ) {
            emit("disableBooking", true);
            return true;
        }
    });

    // Enable booking
    if (!isBookingDisabled) {
        emit("disableBooking", false);
    }
});
</script>

<template>
    <div class="rent-datetime">
        <div class="rent-datetime__time-picker rih-time-picker">
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время начала
                </span>
                <TimePicker v-model="timeStart" :filters="timeStartFilter" />
            </div>
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время конца
                </span>
                <TimePicker v-model="timeEnd" :filters="timeEndFilter" />
            </div>
        </div>
        <div>
            <span class="rent-datetime__label">Выберите срок аренды </span>
            <InlineCalendar
                v-model="currentDates"
                :enable-time-picker="false"
                :disabled-dates="disabledDays"
                :max-range="limitDays?.toString()"
                :day-class="getDayClass"
                @update-month-year="changeMonthYear"
            />
        </div>
    </div>
</template>

<style scoped></style>
