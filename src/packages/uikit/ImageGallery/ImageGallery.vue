<script setup>
import { debounce } from "lodash";
import { ref, computed, onMounted } from "vue";
import { Carousel, Slide } from "vue3-carousel";

const props = defineProps({
    images: Array,
    height: Number,
    heightMobile: Number,
});

const count = computed(() => {
    if (Array.isArray(props.images)) return props.images.length;
    return 0;
});

const currentSlide = ref(0);

const slideTo = (val) => {
    currentSlide.value = val;
};

const actualHeight = ref(props.height);
const checkWidth = () => {
    if (window.innerWidth < 500) {
        actualHeight.value = props.heightMobile;
    } else {
        actualHeight.value = props.height;
    }
};
const debouncedCheckWidth = debounce(checkWidth, 300);
const MEDIA = "https://media.rentinhand.ru";

window.addEventListener("resize", debouncedCheckWidth);
onMounted(checkWidth);
</script>

<template>
    <div class="gallery">
        <Carousel
            class="gallery__main"
            id="gallery"
            :items-to-show="1"
            :wrap-around="false"
            v-model="currentSlide"
        >
            <Slide v-for="image in images" :key="image.media_id">
                <div
                    class="carousel__item"
                    :style="{
                        'background-image': `url(${MEDIA + image.src})`,
                        height: actualHeight + 'px',
                    }"
                ></div>
            </Slide>
        </Carousel>

        <Carousel
            v-if="count > 1"
            class="gallery__thumbnails"
            id="thumbnails"
            :items-to-show="5"
            :wrap-around="false"
            v-model="currentSlide"
            ref="carousel"
        >
            <Slide
                v-for="(image, slide) in images"
                :key="'thumb_' + image.media_id"
            >
                <div
                    class="carousel__item"
                    :style="{ 'background-image': `url(${MEDIA + image.src})` }"
                    @click="slideTo(slide)"
                ></div>
            </Slide>
        </Carousel>
    </div>
</template>
