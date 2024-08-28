import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    users: [],
    isModalVisible: false,
    headerText: '',
    newUser: {},
  }),
  actions: {
    getUser() {
      fetch("https://dummyjson.com/users")
        .then(res => res.json())
        .then(data => {
          this.users = data.users;
        });
    },
    addUser(newUser) {
      const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
      const newId = maxId + 1;
      const userWithId = { ...newUser, id: newId };

      fetch("https://dummyjson.com/users/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userWithId),
      })
        .then(res => res.json())
        .then(() => {
          this.users.push(userWithId);
          this.closeModal();
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
    },
    editUser(editUser) {
      fetch(`https://dummyjson.com/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      })
        .then(res => res.json())
        .then(() => {
          const index = this.users.findIndex(user => user.id === editUser.id);
          if (index !== -1) {
            this.users[index] = editUser;
          }
          this.closeModal();
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    },
    deleteUser(userId) {
      fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.users = this.users.filter(user => user.id !== userId);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
});
