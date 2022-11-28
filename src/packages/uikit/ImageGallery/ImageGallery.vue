<script setup>
import { MEDIA } from "@stores";
import { ref, computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";

const props = defineProps({
    images: Array,
});

const count = computed(() => {
    if (Array.isArray(props.images)) return props.images.length;
    return 0;
});

const currentSlide = ref(0);

const slideTo = (val) => {
    currentSlide.value = val;
};
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
                    :style="{ 'background-image': `url(${MEDIA + image.src})` }"
                ></div>
            </Slide>
        </Carousel>

        <Carousel
            class="gallery__thumbnails"
            id="thumbnails"
            :items-to-show="5"
            :wrap-around="true"
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
