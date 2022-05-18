<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const first_name = ref("")
const last_name = ref("")
const email = ref("")
const birthday = ref("")
const view_alert = ref(false)

const clearForm = () => {
    first_name.value = ""
    last_name.value = ""
    email.value = ""
    birthday.value = ""
}


const addUser = () => {
    const obj = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        birthday: birthday.value
    }
    if (!userStore.isValidForm(obj)) {
        alert("Por favor complete todos los campos")
        return
    }

    const result = userStore.addUser(obj)
    if (!result) {
        alert("Ocurrió un error al agregar el usuario")
        return
    }
    view_alert.value = true
    clearForm()

    setTimeout(() => {
        view_alert.value = false
    }, 700);
}
</script>

<template>
    <form class="flex flex-col gap-2 p-3 rounded-xl shadow-md m-2">
        <p class="text-2xl font-bold text-center">
            Nuevo Usuario
        </p>

        <div class="flex flex-col">
            <label for="email" class="text-gray-500 text-sm">Email</label>
            <input type="email" id="email" v-model="email" class="border border-gray-400 rounded-md p-1 pl-2"
                placeholder="email" />
        </div>

        <div class="flex flex-col">
            <label for="first_name" class="text-gray-500 text-sm">Nombres</label>
            <input type="text" id="first_name" v-model="first_name" class="border border-gray-400 rounded-md p-1 pl-2"
                placeholder="Nombres" />
        </div>

        <div class="flex flex-col">
            <label for="last_name" class="text-gray-500 text-sm">Apellidos</label>
            <input type="text" id="last_name" v-model="last_name" class="border border-gray-400 rounded-md p-1 pl-2"
                placeholder="Apellidos" />
        </div>

        <div class="flex flex-col">
            <label for="birthday" class="text-gray-500 text-sm">Fecha Nacimiento</label>
            <input type="date" id="birthday" v-model="birthday" class="border border-gray-400 rounded-md p-1 pl-2" />
        </div>

        <input class="p-2 bg-green-500 rounded-lg text-white 
      hover:bg-green-600 cursor-pointer
       " type="button" @click="addUser()" value="Agregar">
        <input class="p-2 bg-red-500 rounded-lg text-white cursor-pointer" type="button" @click="clearForm()"
            value="Limpiar">
    </form>

    <div v-if="view_alert">
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-2" role="alert">
            <p class="font-bold">
                Usuario agregado correctamente
            </p>
        </div>
    </div>
</template>