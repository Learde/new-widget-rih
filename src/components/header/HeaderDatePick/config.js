const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

export const config = {
    "pick-time": true,
    "input-attributes": {
        placeholder: "Выберите дату начала",
    },
    format: "YYYY-MM-DD HH:mm",
    "next-month-caption": "Следующий месяц",
    "prev-month-caption": "Предыдущий месяц",
    "set-time-caption": "Время:",
    weekdays: weekdays,
    months: months,
};
