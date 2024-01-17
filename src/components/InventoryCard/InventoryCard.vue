<script setup>
import {
    MEDIA,
    imageSize,
    setImageCover,
    currencyIcon,
    useRouterStore,
    generalProps,
} from "@stores";
import {
    getMinimumPriceFromArray,
    humanizeDurationISO,
    stringEscape,
} from "@helpers";
import { IconAngleRight } from "@icons";
import { useTrans } from "@packages/lang";
const { trans, lang } = useTrans();

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

const { roundedCardAvatar, shouldUseImgTag } = generalProps;
if (roundedCardAvatar) {
    setImageCover("cover");
}
</script>

<template>
    <article class="inv-card">
        <span v-if="category" class="inv-card__category">
            {{ stringEscape(category, categoryLength) }}
        </span>
        <img
            v-if="shouldUseImgTag"
            class="inv-card__image inv-card__image--real"
            :class="{
                'inv-card__image--mt': category,
                'inv-card__image--rounded': roundedCardAvatar,
            }"
            :src="MEDIA + image"
        />
        <div
            v-else
            class="inv-card__image"
            :class="{
                'inv-card__image--mt': category,
                'inv-card__image--rounded': roundedCardAvatar,
            }"
            :style="{
                'background-image': `url('${MEDIA + image}')`,
                'background-size': imageSize,
            }"
            @click="changeRoute('inventoryPage', { inventoryId: id })"
        ></div>
        <h3
            class="inv-card__heading"
            :class="{ 'inv-card__heading--real-img': shouldUseImgTag }"
        >
            {{ stringEscape(title, titleLength) }}
        </h3>
        <div
            class="inv-card__info"
            :class="{ 'inv-card__info--real-img': shouldUseImgTag }"
        >
            <span class="inv-card__price" v-if="prices">
                {{ trans["from"] }} {{ price }}
                <component
                    v-if="currencyIcon"
                    :is="currencyIcon"
                    class="inv-card__icon"
                    color="#a7a7a7"
                    width="0.9em"
                    height="0.9em"
                />
                /
                {{ humanizeDurationISO(period, lang) }}
            </span>
        </div>
        <div
            class="inv-card__more"
            @click="changeRoute('inventoryPage', { inventoryId: id })"
        >
            <span class="inv-card__more-text">{{ trans["more"] }}</span>
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
            <span class="inv-card__book-text">{{ trans["book"] }}</span>
            <icon-angle-right
                width="8"
                height="14"
                style="color: var(--widget-primary)"
            />
        </div>
    </article>
</template>
