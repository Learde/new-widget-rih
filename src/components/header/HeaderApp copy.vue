<template>
    <header class="rih-header">
        <div class="rih-header__form-group rih-form-group">
            <label class="rih-form-group__label">Категория</label>
            <vue-treeselect
                v-model="localFilter.categories"
                :options="categories"
                :normalizer="normalizer"
                multiple
                searchable
                search-nested
                flatten-search-sesults
                close-on-select
                placeholder="Выберите категорию"
                no-results-text="Нет подходящих категорий"
                no-children-text="Отсутствуют дочерние категории"
                no-options-text="Категории отсутствуют"
                clear-all-text="Очистить все"
                class="rih-form-group__input"
            >
                <template #option-label="{ node, shouldShowCount, count }">
                    <label>
                        {{ node.raw.title }}
                        <span v-if="shouldShowCount"> ({{ count }}) </span>
                    </label>
                </template>
                <template #value-label="{ node }">
                    <div>
                        {{ node.raw.title }}
                    </div>
                </template>
            </vue-treeselect>
        </div>
        <div class="rih-header__form-group rih-form-group">
            <label class="rih-form-group__label">Пункт проката</label>
            <v-select
                multiple
                :filterable="false"
                :searchable="false"
                :reduce="(option) => option.id"
                placeholder="Выберите пункт проката"
                :options="points"
                v-model="localFilter.points"
                class="rih-form-group__input"
                :close-on-select="false"
            >
                <template v-slot:option="option">
                    {{ option.title }}
                </template>
                <template v-slot:selected-option="option">
                    {{ option.title }}
                </template>
            </v-select>
        </div>
        <div class="rih-header__form-group rih-form-group">
            <label
                class="rih-form-group__label rih-form-group__label--ml"
                style="margin-left: 18px"
                >Даты аренды</label
            >
            <div class="rih-form-group__inline">
                <span class="rih-form-group__additional">с</span>
                <date-pick
                    v-model="localFilter.dateStart"
                    :pick-time="true"
                    :is-date-disabled="isPastDate"
                    :input-attributes="{
                        placeholder: 'Выберите дату начала',
                    }"
                    :format="'YYYY-MM-DD HH:mm'"
                    class="rih-form-group__input"
                    next-month-caption="Следующий месяц"
                    prev-month-caption="Предыдущий месяц"
                    set-time-caption="Время:"
                    :weekdays="weekdays"
                    :months="months"
                ></date-pick>
            </div>
        </div>
        <div
            class="rih-header__form-group rih-form-group rih-form-group--last-child"
        >
            <label class="rih-form-group__label rih-form-group__label--empty"
                >&nbsp;</label
            >
            <div class="rih-form-group__inline">
                <span class="rih-form-group__additional">по</span>
                <date-pick
                    v-model="localFilter.dateEnd"
                    :pick-time="true"
                    :is-date-disabled="isFutureDate"
                    :input-attributes="{
                        placeholder: 'Выберите дату конца',
                    }"
                    :format="'YYYY-MM-DD HH:mm'"
                    class="rih-form-group__input"
                    next-month-caption="Следующий месяц"
                    prev-month-caption="Предыдущий месяц"
                    set-time-caption="Время:"
                    :weekdays="weekdays"
                    :months="months"
                ></date-pick>
            </div>
        </div>
        <button
            class="rih-button rih-button--long"
            style="align-self: flex-end"
            @click="$emit('refresh')"
        >
            Показать
        </button>
    </header>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
    name: "RihHeader",
    props: {
        filter: Object,
    },
    data() {
        return {
            localFilter: this.filter,
            categories: [],
            points: [],
            weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            months: [
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
            ],
        };
    },
    computed: {
        ...mapState({
            TOKEN: (state) => state.token,
            MEDIA: (state) => state.media,
            DOMAIN: (state) => state.domain,
        }),
    },
    watch: {
        localFilter: {
            handler(newValue) {
                this.$emit("update:filter", newValue);
            },
            deep: true,
        },
    },
    mounted() {
        this.loadCategories();
        this.loadPoints();
    },
    methods: {
        loadCategories() {
            axios
                .post(
                    this.DOMAIN +
                        "/v1/category/inventory/items?token=" +
                        this.TOKEN,
                    {
                        include: "children",
                    }
                )
                .then((response) => {
                    if (
                        response.error === undefined &&
                        response.data &&
                        Array.isArray(response.data.array)
                    ) {
                        this.categories = this.clearEmptyChildren(
                            response.data.array
                        );
                    }
                });
        },
        loadPoints() {
            axios
                .post(this.DOMAIN + "/v1/point/items?token=" + this.TOKEN, {
                    include: "children",
                })
                .then((response) => {
                    if (
                        response.error === undefined &&
                        response.data &&
                        Array.isArray(response.data.array)
                    ) {
                        this.points = response.data.array;
                    }
                });
        },
        isPastDate(date) {
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
        },
        isFutureDate(date) {
            if (
                this.filter.dateStart !== "" &&
                this.filter.dateStart !== null
            ) {
                const momentCurrent = moment(date);
                const momentDateStart = moment(this.filter.dateStart).set({
                    hour: 0,
                    minute: 0,
                });
                return momentCurrent.isBefore(momentDateStart);
            } else {
                return false;
            }
        },
        clearEmptyChildren(options) {
            if (options) {
                return options.map((option) => {
                    if (
                        option.children !== undefined &&
                        option.children.length === 0
                    ) {
                        delete option.children;
                    } else {
                        option.children = this.clearEmptyChildren(
                            option.children
                        );
                    }
                    return option;
                });
            }
            return options;
        },
        normalizer(node) {
            return {
                id: node.id,
                label: node.title,
                children: node.children,
            };
        },
    },
};
</script>

<style lang="scss">
#rih-widget .rih-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    @media (max-width: 1100px) {
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 25px;

        & .button {
            margin-bottom: 15px;
        }
    }

    @media (max-width: 900px) and (min-width: 751px) {
        justify-content: space-between;
    }
}

#rih-widget .rih-form-group {
    width: 100%;
    margin-right: 40px;

    &__input {
        min-height: 35px;
        width: 100%;
    }

    &__inline {
        display: flex;
        align-items: center;
    }

    &__additional {
        margin-right: 10px;

        @media (max-width: 500px) {
            display: none;
        }
    }

    & label {
        display: inline-block;
        font-size: 14px;
        margin-bottom: 2px;
    }

    @media (max-width: 900px) and (min-width: 751px) {
        width: calc(33.33% - 2 * 30px / 3);
        margin-right: 30px;
        margin-bottom: 15px;

        &:nth-child(n + 3) {
            margin-right: 0;
        }
    }

    @media (max-width: 750px) and (min-width: 501px) {
        width: calc(50% - 30px / 2);
        margin-right: 30px;
        margin-bottom: 15px;

        &:nth-child(2n) {
            margin-right: 0;
        }
    }

    @media (max-width: 500px) {
        width: 90%;
        margin-right: 0;
        margin-bottom: 15px;

        &__label--ml {
            margin-left: 0 !important;
        }

        &__label--empty {
            display: none !important;
        }
    }

    @media (max-width: 1100px) and (min-width: 901px) {
        width: calc(25% - 3 * 30px / 4);
        margin-right: 30px;
        margin-bottom: 15px;

        &:nth-child(4n) {
            margin-right: 0;
        }
    }
}

#rih-widget .rih-price {
    &__heading {
        font-size: 16px;
        margin-bottom: 8px;
    }

    &__list {
        list-style: none;
    }

    &__item {
        font-size: 15px;
        margin-bottom: 6px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
