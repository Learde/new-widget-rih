import { Duration, DateTime } from "luxon";
import humanizeDuration from "humanize-duration";

const humanizeSettings = {
    language: "ru",
    languages: {
        ru: {
            w: () => "неделя",
            d: () => "сутки",
            h: () => "часов",
            m: () => "минут",
        },
    },
    delimiter: " ",
    units: ["w", "d", "h", "m"],
};

const humanizeDurationISO = (isoDuration) => {
    const millis = Duration.fromISO(isoDuration).toMillis();
    return humanizeDuration(millis, humanizeSettings);
};

const humanizeDurationMillis = (millisDuration) => {
    return humanizeDuration(millisDuration, humanizeSettings);
};

const formatDateJs = (date, format = "dd.MM.yyyy HH:mm") => {
    return DateTime.fromJSDate(date).toFormat(format);
};

const dateJsToISO = (date) => {
    return DateTime.fromJSDate(date).toISO();
};

const differenceDatesJs = (date1, date2) => {
    return date2 - date1;
};

// const humanizeDurationDate = (dateDuration) => {
//     const millis = Duration.from
// }

// isPastDate(date) {
//     if (this.filter.dateEnd !== "" && this.filter.dateEnd !== null) {
//         const momentCurrent = moment(date);
//         const momentDateEnd = moment(this.filter.dateEnd).set({
//             hour: 0,
//             minute: 0,
//         });
//         return momentCurrent.isAfter(momentDateEnd);
//     } else {
//         return false;
//     }
// },
// isFutureDate(date) {
//     if (
//         this.filter.dateStart !== "" &&
//         this.filter.dateStart !== null
//     ) {
//         const momentCurrent = moment(date);
//         const momentDateStart = moment(this.filter.dateStart).set({
//             hour: 0,
//             minute: 0,
//         });
//         return momentCurrent.isBefore(momentDateStart);
//     } else {
//         return false;
//     }
// },

export {
    humanizeDurationISO,
    formatDateJs,
    differenceDatesJs,
    humanizeDurationMillis,
    dateJsToISO,
};
