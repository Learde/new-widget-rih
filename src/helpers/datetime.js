import { Duration } from "luxon";
import humanizeDuration from "humanize-duration";

const humanizeSettings = {
    language: "ru",
    languages: {
        ru: {
            w: () => "неделя",
            d: () => "сутки",
            h: () => "час",
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

export { humanizeDurationISO };
