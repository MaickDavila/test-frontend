<script setup>
import UserForm from "./components/user-form.vue";
import UserList from "./components/user-list.vue";
</script>

<template>
  <div class="flex justify-center items-center w-full md:h-screen bg-blue-900 p-5">
    <div class="grid gap-2 grid-cols-1 md:grid-cols-2 bg-gray-50 p-3 rounded-lg">
      <div>
        <UserForm />
      </div>
      <UserList />
    </div>
  </div>
</template>