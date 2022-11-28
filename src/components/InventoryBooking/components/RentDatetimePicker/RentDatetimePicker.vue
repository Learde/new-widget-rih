<script setup>
import { InlineCalendar, TimePicker } from "@uikit";
import { getRentsOfInventory } from "@api";
import { ISOtoMillis } from "@helpers";
import { ref, watch, computed, nextTick } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
    inventoryId: [Number, String],
});

const date = ref(props.modelValue);
const timeStart = ref(props.modelValue[0]);
const timeEnd = ref(props.modelValue[1]);

const fullDateStart = computed(() => {
    const newDate = JSON.parse(JSON.stringify(date.value));

    newDate[0] = new Date(newDate[0]);
    if (timeStart.value.hours !== undefined) {
        newDate[0].setHours(timeStart.value.hours);
        newDate[0].setMinutes(timeStart.value.minutes);
        newDate[0].setSeconds(timeStart.value.seconds);
    }

    return newDate[0];
});

const fullDateEnd = computed(() => {
    const newDate = JSON.parse(JSON.stringify(date.value));

    newDate[1] = new Date(newDate[1]);
    if (timeEnd.value.minutes !== undefined) {
        newDate[1].setHours(timeEnd.value.hours);
        newDate[1].setMinutes(timeEnd.value.minutes);
        newDate[1].setSeconds(timeEnd.value.seconds);
    }

    return newDate[1];
});

const setTime = () => {
    emit("update:modelValue", [fullDateStart.value, fullDateEnd.value]);
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

const bookedDays = ref([]);
const disabledDays = ref([]);

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
            console.log(disabledDays.value);
        }
    } catch (e) {
        console.log(e);
    }
};

changeMonthYear({
    month: date.value[0].getMonth(),
    year: date.value[0].getFullYear(),
});

const hourRangeStart = computed(() => {
    return getUnbookedHours(fullDateStart.value);
});

const hourRangeEnd = computed(() => {
    return getUnbookedHours(fullDateEnd.value);
});

const minuteRangeStart = computed(() => {
    return getUnbookedMinutes(fullDateStart.value);
});

const minuteRangeEnd = computed(() => {
    return getUnbookedMinutes(fullDateEnd.value);
});

const getUnbookedMinutes = (currentDate) => {
    const minutes = [...Array(60)].map((_, idx) => {
        return { time: idx, disable: false };
    });

    const currentDateTime = currentDate.getTime();
    const todayTime = Date.now();
    // < 1 hour
    if (Math.abs(currentDateTime - todayTime) < 3600000)
        for (let i = 0; i < new Date().getMinutes(); i++)
            minutes[i].disable = true;

    if (Array.isArray(bookedDays.value))
        bookedDays.value.some((range) => {
            const rangeStart = ISOtoMillis(range.time_start);
            const rangeEnd = ISOtoMillis(range.time_end);
            const isSameStart =
                Math.abs(currentDateTime - rangeStart) < 3600000;
            const isSameEnd = Math.abs(currentDateTime - rangeEnd) < 3600000;

            if (currentDateTime > rangeStart && currentDateTime < rangeEnd) {
                if (
                    new Date(currentDateTime).getHours() >
                        new Date(rangeStart).getHours() &&
                    new Date(currentDateTime).getHours() <
                        new Date(rangeEnd).getHours()
                ) {
                    minutes.forEach((item) => (item.disable = true));
                    return true;
                }
            }

            if (!isSameStart && !isSameEnd) return false;

            let minutesStart = new Date(rangeStart).getMinutes();
            let minutesEnd = new Date(rangeEnd).getMinutes();

            const leftIter = isSameStart ? minutesStart : 0;
            const rightIter = isSameEnd ? minutesEnd : minutes.length - 1;

            for (let i = leftIter; i <= rightIter; i++)
                minutes[i].disable = true;
        });

    return minutes.filter((item) => item.disable).map((item) => item.time);
};

const getUnbookedHours = (currentDate) => {
    const hours = [...Array(24)].map((_, idx) => {
        return { time: idx, disable: false };
    });

    const currentDateTime = currentDate.getTime();
    const todayTime = Date.now();

    // < 1 day
    if (Math.abs(currentDateTime - todayTime) < 86400000)
        for (let i = 0; i < new Date().getHours(); i++) hours[i].disable = true;

    if (Array.isArray(bookedDays.value))
        bookedDays.value.some((range) => {
            const rangeStart = ISOtoMillis(range.time_start);
            const rangeEnd = ISOtoMillis(range.time_end);
            const isSameStart =
                Math.abs(currentDateTime - rangeStart) < 86400000;
            const isSameEnd = Math.abs(currentDateTime - rangeEnd) < 86400000;

            if (currentDateTime > rangeStart && currentDateTime < rangeEnd) {
                if (
                    new Date(currentDateTime).getDate() >
                        new Date(rangeStart).getDate() &&
                    new Date(currentDateTime).getDate() <
                        new Date(rangeEnd).getDate()
                ) {
                    hours.forEach((item) => (item.disable = true));
                    return true;
                }
            }

            if (!isSameStart && !isSameEnd) return false;

            let hoursStart = new Date(rangeStart).getHours();
            if (new Date(rangeStart).getMinutes() > 0) hoursStart += 1;
            let hoursEnd = new Date(rangeEnd).getHours();
            if (new Date(rangeEnd).getMinutes() < 59) hoursEnd -= 1;

            const leftIter = isSameStart ? hoursStart : 0;
            const rightIter = isSameEnd ? hoursEnd : hours.length - 1;

            for (let i = leftIter; i <= rightIter; i++) hours[i].disable = true;
        });

    return hours.filter((item) => item.disable).map((item) => item.time);
};

const timeStartFilter = computed(() => {
    return {
        times: {
            hours: hourRangeStart.value,
            minutes: minuteRangeStart.value,
        },
    };
});
const timeEndFilter = computed(() => {
    return {
        times: {
            hours: hourRangeEnd.value,
            minutes: minuteRangeEnd.value,
        },
    };
});

const getDaysArray = function (s, e) {
    for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
    ) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        a.push(new Date(d));
    }
    return a;
};

const daysInMonth = (month, year) => {
    console.log(month, new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
};

const disableDates = (month) => {
    const first = new Date();
    first.setMonth(month);
    first.setDate(1);
    const second = new Date(first).setDate(
        daysInMonth(first.getMonth() + 1, first.getFullYear())
    );
    const dates = getDaysArray(first, second).map((oldValue) => {
        return {
            value: oldValue,
            disabled: false,
        };
    });
    console.log(dates);
    dates.forEach((date) => {
        const datetime = date.value.getTime();
        date.disabled = bookedDays.value.some((range) => {
            const rangeStart = ISOtoMillis(range.time_start);
            const rangeEnd = ISOtoMillis(range.time_end);

            const isStart = Math.abs(rangeStart - datetime) < 86400000;
            const isEnd = Math.abs(rangeEnd - datetime) < 86400000;
            const isBetween =
                datetime > rangeStart &&
                datetime < rangeEnd &&
                new Date(datetime).getDate() > new Date(rangeStart).getDate() &&
                new Date(datetime).getDate() < new Date(rangeEnd).getDate();

            const isStartDay =
                isStart &&
                +new Date(rangeStart).getMinutes() === 0 &&
                +new Date(rangeStart).getHours() === 0;
            const isEndDay =
                isEnd &&
                +new Date(rangeStart).getMinutes() === 23 &&
                +new Date(rangeStart).getHours() === 59;

            return isStartDay || isEndDay || isBetween;
        });
    });
    return dates.filter((item) => item.disabled).map((item) => item.value);
};
</script>

<template>
    <div class="rent-datetime">
        <div class="rent-datetime__time-picker rih-time-picker">
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время начала
                </span>
                <TimePicker :filters="timeStartFilter" v-model="timeStart" />
            </div>
            <div>
                <span class="rent-datetime__label rih-time-picker__label">
                    Время конца
                </span>
                <TimePicker :filters="timeEndFilter" v-model="timeEnd" />
            </div>
        </div>
        <div>
            <span class="rent-datetime__label">Выберите срок аренды </span>
            <InlineCalendar
                v-model="date"
                :enable-time-picker="false"
                :disabled-dates="disabledDays"
                @update-month-year="changeMonthYear"
            />
        </div>
    </div>
</template>
