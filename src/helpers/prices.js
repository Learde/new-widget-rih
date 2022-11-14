/**
 * Find minimal price in format [price, period]
 * @param prices - array of prices
 * @returns {[null,null]|[number,string]}
 */
const getMinimumPriceFromArray = (prices) => {
    if (!Array.isArray(prices)) return [null, null];

    let min = Number.MAX_VALUE;
    let period = "";

    prices.forEach((price) => {
        const minPrice = price?.values
            ?.slice()
            ?.sort((a, b) => +a.value > +b.value)?.[0];
        if (minPrice !== undefined && min > +minPrice.value) {
            min = +minPrice.value;
            period = minPrice.period;
        }
    });

    if (min === Number.MAX_VALUE || period === "") return [null, null];

    return [min, period];
};

export { getMinimumPriceFromArray };
