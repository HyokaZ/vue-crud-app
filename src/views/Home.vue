<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="mt-5">
        <div class="px-5">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr class="bg-gray-400 font-bold">
                  <th></th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>
                    <button @click="handleOpenModal"
                      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Open Modal
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" class="hover">
                  <th>{{ user.id }}</th>
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.age }}</td>
                  <td>{{ user.gender }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone }}</td>
                  <td>
                    <div class="flex space-x-1">
                      <button @click="() => handleEditUser(user)"
                        class="w-24 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">Edit</button>
                      <button @click="() => handleDeleteUser(user.id)"
                        class="w-24 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useModalStore } from '@/stores/ModalStore';
  import Navbar from '@/components/Navbar.vue';
  import Modal from '@/components/Modal.vue';
  
  const modalStore = useModalStore();
  const users = computed(() => modalStore.users);
  const { openModal, getUser, deleteUser } = modalStore;
  
  onMounted(() => {
    getUser();
  });
  
  function handleOpenModal() {
    modalStore.headerText = 'เพิ่มข้อมูล';
    modalStore.newUser = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
    };
    openModal();
  }
  
  function handleEditUser(user) {
    modalStore.headerText = 'แก้ไข';
    modalStore.newUser = { ...user };
    openModal();
  }
  
  function handleDeleteUser(userId) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้คนนี้?')) {
      modalStore.deleteUser(userId);
    }
  }
  </script>
  