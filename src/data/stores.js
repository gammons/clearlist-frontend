import { writable } from 'svelte/store'

export const userStore = writable(null)
export const batchesStore = writable(null)
export const modalShowStore = writable('')
