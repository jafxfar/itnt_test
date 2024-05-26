import {defineStore} from 'pinia'

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        post: {},
        postStatus: ''
    }),
    actions: {
        addPost(post) {
            this.posts.push(post)
        },
        getPost(id) {
            this.post = this.posts.find(post => post.id === id)
        },
        // deletePost(id) {
        //     this.posts = this.posts.filter(post => post.id !== id)
        // },
        // updatePost(post) {
        //     this.posts = this.posts.map(p => p.id === post.id ? post : p)
        // },
        // setPostStatus(status) {
        //     this.postStatus = status
        // }
    }
})