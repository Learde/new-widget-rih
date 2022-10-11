<template>
    <div class="rih-form-group">
        <label class="rih-form-group__label" :class="labelClass"
            ><slot name="labelText"></slot
        ></label>
        <slot name="input" :defaultClass="inputDefaultClass"></slot>
    </div>
</template>
<script setup>
defineProps({
    labelClass: {
        type: String,
        default: "",
    },
});

const inputDefaultClass = "rih-form-group__input";
</script>
