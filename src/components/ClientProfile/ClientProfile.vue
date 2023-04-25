<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useClientStore, MEDIA } from "@stores";
import { IconPencil } from "@icons";
import { formatDateISO } from "@helpers";
import { BaseLoading } from "@uikit";
import { getClientRents } from "@api";
import ModalEditting from "@/components/ModalEditting/ModalEditting.vue";

const clientStore = useClientStore();
const { client } = storeToRefs(clientStore);

const loading = ref(false);
const rents = ref([]);
const modal = ref(null);

const loadClientRents = async () => {
    try {
        loading.value = true;
        rents.value = (
            await getClientRents({ clientId: client.value.id })
        ).data?.reverse();
    } catch (e) {
        console.log(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadClientRents();
});

const defaultPhone = computed(() => {
    let phone = null;
    if (client.value.contacts) {
        client.value.contacts.some((contact) => {
            if (contact.contact_type.const === "PHONE") {
                phone = contact.value;
                return true;
            }
        });
    }
    return phone;
});

const defaultEmail = computed(() => {
    let email = null;
    if (client.value.contacts) {
        client.value.contacts.some((contact) => {
            if (contact.contact_type.const === "EMAIL") {
                email = contact.value;
                return true;
            }
        });
    }
    return email;
});
</script>

<template>
    <div class="client-lk container">
        <div class="client-lk__row">
            <div class="client-lk__heading">
                <h2 class="client-lk__fio">{{ client.fio }}</h2>
                <div class="client-lk__edit" @click="modal.show()">
                    <IconPencil />
                </div>
            </div>

            <template v-for="contact in client.contacts">
                <h4
                    v-if="contact.contact_type.const === 'PHONE'"
                    :key="contact.value"
                >
                    Телефон: {{ contact.value }}
                </h4>
                <h4
                    v-else-if="contact.contact_type.const === 'EMAIL'"
                    :key="contact.value"
                >
                    Email: {{ contact.value }}
                </h4>
            </template>
            <h2 class="client-lk__history">
                История аренд (всего: {{ rents.length }})
            </h2>
            <div class="client-lk__list">
                <BaseLoading v-if="loading" style="padding-top: 40px" />
                <template v-else>
                    <div
                        class="client-lk__inv cart-item"
                        v-for="rent in rents"
                        :key="rent.id"
                    >
                        <template
                            v-if="
                                Array.isArray(rent.inventories) &&
                                rent.inventories.length > 0
                            "
                        >
                            <div
                                class="client-lk__one-inv"
                                :key="rent.id + '' + inventory.id"
                                v-for="(inventory, ind) in rent.inventories"
                            >
                                <div class="cart-item__inventory">
                                    <img
                                        class="cart-item__img"
                                        :src="
                                            MEDIA + inventory.inventory.avatar
                                        "
                                        :alt="inventory.inventory.title"
                                    />
                                    <div class="cart-item__info">
                                        <span class="cart-item__title">{{
                                            inventory.inventory.title
                                        }}</span>
                                        <span
                                            v-if="inventory.inventory.category"
                                            class="cart-item__category"
                                        >
                                            {{
                                                inventory.inventory.category
                                                    .title
                                            }}
                                        </span>
                                    </div>
                                </div>
                                <template v-if="ind === 0">
                                    <span class="cart-item__period">
                                        {{ formatDateISO(rent.time_start) }} -
                                        {{ formatDateISO(rent.time_end) }}
                                    </span>
                                    <span class="cart-item__total">
                                        {{ rent.sum }} руб.
                                    </span>
                                </template>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <!--        <div class="client-lk__avatar-wrapper">-->
        <!--            <div class="client-lk__avatar" :style="avatarStyles"></div>-->
        <!--        </div>-->
        <ModalEditting
            ref="modal"
            :default-name="client.human.name"
            :default-surname="client.human.surname"
            :default-email="defaultEmail"
            :default-phone="defaultPhone"
            :id="client.id"
        />
        <!--        <profile-edit-->
        <!--            v-if="showEdit"-->
        <!--            @close="showEdit = false"-->
        <!--            @success="onEdit"-->
        <!--        />-->
    </div>
</template>
