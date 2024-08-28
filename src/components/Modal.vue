<template>
  <div v-if="modalStore.isModalVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div class="relative p-5 bg-white w-full max-w-md m-auto rounded-md shadow-lg">
      <h3 class="text-lg font-bold mb-2">{{ modalStore.headerText }}</h3>
      <input v-model="modalStore.newUser.firstName" type="text" placeholder="ชื่อจริง" class="input w-full max-w-xs mb-2" />
      <input v-model="modalStore.newUser.lastName" type="text" placeholder="นามสกุล" class="input w-full max-w-xs mb-2" />
      <input v-model="modalStore.newUser.age" type="number" placeholder="อายุ" class="input w-full max-w-xs mb-2" />
      <input v-model="modalStore.newUser.gender" type="text" placeholder="เพศ" class="input w-full max-w-xs mb-2" />
      <input v-model="modalStore.newUser.email" type="email" placeholder="อีเมล" class="input w-full max-w-xs mb-2" />
      <input v-model="modalStore.newUser.phone" type="text" placeholder="เบอร์โทร" class="input w-full max-w-xs mb-4" />
      <div class="flex justify-end space-x-2">
        <button @click="handleSubmit" class="px-4 py-2 bg-blue-500 text-white rounded-md  hover:bg-blue-700">บันทึก</button>
        <button @click="modalStore.closeModal" class="px-4 py-2 bg-red-500 text-white rounded-md  hover:bg-red-700">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/ModalStore';

const modalStore = useModalStore();

function handleSubmit() {
  if (Object.values(modalStore.newUser).every(field => field)) {
    if (modalStore.headerText === 'เพิ่มข้อมูล') {
      modalStore.addUser(modalStore.newUser);
    } else if (modalStore.headerText === 'แก้ไข') {
      modalStore.editUser(modalStore.newUser);
    }
  } 
}
</script>
