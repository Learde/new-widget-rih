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

export { humanizeDurationISO };
