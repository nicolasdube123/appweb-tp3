import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import NavigationBar from '../NavigationBar.vue' // Ajustez le chemin selon votre structure
import { useAuthStore } from '@/stores/authStore'

describe('NavigationBar.vue', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
})

  describe('utilisateur non connecté', async () => {
    let wrapper = mount(NavigationBar)
    let store = useAuthStore()
    store.logout()

    const login = wrapper.find("#login")
    // 1 test ici
    expect(login.exists()).toBeTruthy()
  })
  
  describe('utilisateur connecté', async () => {
    let wrapper = mount(NavigationBar)
    let store = useAuthStore()
    store.login({ email: "test@test.com", password: "test"})

    let profile = wrapper.find("#profile")

    // 1 test ici
    expect(profile.exists()).toBeTruthy()
  })
})
