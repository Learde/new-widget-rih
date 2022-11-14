<template>
    <div class="form-group">
        <label class="form-group__label" :class="labelClass"
            ><slot name="labelText"></slot
        ></label>
        <slot name="input"></slot>
    </div>
</template>
<script setup>
defineProps({
    labelClass: {
        type: String,
        default: "",
    },
});
</script>
