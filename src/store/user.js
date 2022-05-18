import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
    state: () => {
        return {
            userList: [],
        }
    },

    getters: {
        getUserList: state => {
            let list = state.userList.sort((a, b) => {
                return b.id - a.id
            })

            return list.map(user => {
                return {
                    id: user.id,
                    full_name: `${user.first_name} ${user.last_name}`,
                    birthday: user.birthday,
                    email: user.email,
                }
            })
        },

        getEdadByUser: state => (user) => {
            if (user.birthday == "") return '0 años'
            const birthday = new Date(user.birthday);
            const today = new Date();
            let age = today.getFullYear() - birthday.getFullYear();
            const m = today.getMonth() - birthday.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
                age--;
            }
            return `${age} años`;
        },

        isValidForm: state => (user) => {
            return user.first_name && user.last_name && user.birthday && user.email
        },

    },
    actions: {
        setLocalStorage() {
            localStorage.setItem("userList", JSON.stringify(this.userList))
        },

        getUsersInLocalStorage() {
            return JSON.parse(localStorage.getItem('userList')) || []
        },

        async getUsers() {
            if (this.getUsersInLocalStorage().length > 0) {
                this.userList = this.getUsersInLocalStorage()
                return
            }

            const { data } = await fetch("https://reqres.in/api/users?page=1").then(res => res.json())
            this.userList = data.map(user => {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    birthday: "",
                    email: user.email,
                }
            })
            this.setLocalStorage()
        },

        addUser(args) {
            try {
                const { first_name, last_name, birthday, email } = args
                const id = this.userList.length + 1
                this.userList.push({ id, first_name, last_name, birthday, email })
                this.setLocalStorage()
                return true
            } catch (error) {
                return false
            }
        }
    }
})