import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import PokeModal from '@/components/PokeModal.vue';
import { createTestingPinia } from '@pinia/testing';
import usePokeStore from '@/stores/usePokeStore';

describe('PokeModal', () => {
    let wrapper: VueWrapper<any>;
    let pokeStore;

    beforeEach(() => {
        const testingPinia = createTestingPinia({
            createSpy: vi.fn
        });

        pokeStore = usePokeStore();
        pokeStore.closeModal = (vi.fn());
        pokeStore.pokemon = { id: 1, name: 'bulbasaur', artwork: 'https://picsum.photos/200' };

        wrapper = mount(PokeModal, {
            global: {
                plugins: [testingPinia],
            },
        });
    });

    it('renders with data from store', async () => {
        await flushPromises();
        expect(wrapper.text()).toContain('Bulbasaur');
        expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/200');
    });
});
