import { writable } from 'svelte/store'

export const userStore = writable(null)
export const batchesStore = writable([])
export const modalShowStore = writable('')
