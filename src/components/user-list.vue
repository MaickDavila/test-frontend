<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from "../store/user"
const userStore = useUserStore()

onMounted(() => {
    userStore.getUsers()
});
</script>

<template>
    <div class="flex">
        <div class="overflow-auto lg:overflow-visible">
            <table class="table text-gray-400 border-separate text-sm">
                <thead class="bg-blue-900 text-white">
                    <tr>
                        <th class="p-3">Id</th>
                        <th class="p-3 text-left">Nombre</th>
                        <th class="p-3 text-left">Edad</th>
                        <th class="p-3 text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-black shadow cursor-pointer" v-for="user in userStore.getUserList">
                        <td class="p-3">
                            {{ user.id }}
                        </td>
                        <td class="p-3">
                            {{ user.full_name }}
                        </td>
                        <td class="p-3 font-bold">
                            {{ userStore.getEdadByUser(user) }}
                        </td>

                        <td class="p-3 font-bold">
                            {{ user.email }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.table {
    border-spacing: 0 15px;
}

i {
    font-size: 1rem !important;
}

.table tr {
    border-radius: 20px;
}

tr td:nth-child(n+5),
tr th:nth-child(n+5) {
    border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
    border-radius: .625rem 0 0 .625rem;
}
</style>