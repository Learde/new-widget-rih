<script setup>
import {
    MEDIA,
    imageSize,
    setImageCover,
    useRouterStore,
    generalProps,
} from "@stores";
import {
    getMinimumPriceFromArray,
    humanizeDurationISO,
    stringEscape,
} from "@helpers";
import { IconAngleRight, IconRubleSign } from "@icons";

const props = defineProps({
    id: [String, Number],
    title: String,
    category: {
        type: String,
        default: "",
    },
    prices: Array,
    image: String,
});

defineEmits(["pick"]);

const router = useRouterStore();
const { changeRoute } = router;

const [price, period] = getMinimumPriceFromArray(props.prices);
const categoryLength = 25;
const titleLength = 35;

const { roundedCardAvatar } = generalProps;
if (roundedCardAvatar) {
    setImageCover("cover");
}
</script>

<template>
    <article class="inv-card">
        <span v-if="category" class="inv-card__category">
            {{ stringEscape(category, categoryLength) }}
        </span>
        <div
            class="inv-card__image"
            :class="{
                'inv-card__image--mt': !category,
                'inv-card__image--rounded': roundedCardAvatar,
            }"
            :style="{
                'background-image': `url('${MEDIA + image}')`,
                'background-size': imageSize,
            }"
            @click="changeRoute('inventoryPage', { inventoryId: id })"
        ></div>
        <h3 class="inv-card__heading">
            {{ stringEscape(title, titleLength) }}
        </h3>
        <div class="inv-card__info">
            <span class="inv-card__price" v-if="prices">
                от {{ price
                }}<icon-ruble-sign
                    class="inv-card__icon"
                    color="#a7a7a7"
                    width="0.9em"
                    height="0.9em"
                />
                /
                {{ humanizeDurationISO(period) }}
            </span>
        </div>
        <div
            class="inv-card__more"
            @click="changeRoute('inventoryPage', { inventoryId: id })"
        >
            <span class="inv-card__more-text">Подробнее</span>
            <icon-angle-right width="10" height="12" style="color: #666" />
        </div>
        <div
            class="inv-card__book"
            @click="
                changeRoute('inventoryPage', {
                    inventoryId: id,
                    scrollToBooking: true,
                })
            "
        >
            <span class="inv-card__book-text">Забронировать</span>
            <icon-angle-right
                width="8"
                height="14"
                style="color: var(--widget-primary)"
            />
        </div>
    </article>
</template>
