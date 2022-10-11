import moment from "moment";

export const isPastDate = (date) => {
    if (this.filter.dateEnd !== "" && this.filter.dateEnd !== null) {
        const momentCurrent = moment(date);
        const momentDateEnd = moment(this.filter.dateEnd).set({
            hour: 0,
            minute: 0,
        });
        return momentCurrent.isAfter(momentDateEnd);
    } else {
        return false;
    }
};

export const isFutureDate = (date) => {
    if (this.filter.dateStart !== "" && this.filter.dateStart !== null) {
        const momentCurrent = moment(date);
        const momentDateStart = moment(this.filter.dateStart).set({
            hour: 0,
            minute: 0,
        });
        return momentCurrent.isBefore(momentDateStart);
    } else {
        return false;
    }
};
