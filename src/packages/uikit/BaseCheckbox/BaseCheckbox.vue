<script setup>
import { computed } from "vue";
import { IconCheck } from "@icons";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    modelValue: Boolean,
});

const checked = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <div class="base-checkbox" @click="checked = !checked">
        <div
            class="base-checkbox__field"
            :class="{ 'base-checkbox__field--checked': checked }"
        >
            <IconCheck />
        </div>
        <label>
            <slot>
                {{ label }}
            </slot>
        </label>
    </div>
</template>
