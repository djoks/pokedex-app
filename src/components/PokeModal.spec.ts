import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import PokeModal from '@/components/PokeModal.vue'
import { createTestingPinia } from '@pinia/testing'
import usePokeStore from '@/stores/usePokeStore'

describe('PokeModal', () => {
  let wrapper: VueWrapper<any>
  let pokeStore

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        pokeStore: {
          pokemon: {
            __typename: 'PokemonItem',
            id: 1,
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            name: 'bulbasaur',
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            artwork:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            dreamworld:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
          },
        },
      },
    })

    pokeStore = usePokeStore(testingPinia);
    pokeStore.closeModal = vi.fn()

    wrapper = mount(PokeModal, {
      global: {
        plugins: [testingPinia],
      },
    })
  })

  it('renders with data from store', async () => {
    await flushPromises()

    wrapper.trigger('click')

    expect(wrapper.text()).toContain('bulbasaur')
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://picsum.photos/200',
    )
  })
})
