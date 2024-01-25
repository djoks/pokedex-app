import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import PokeTile from '@/components/PokeTile.vue';
import { createTestingPinia } from '@pinia/testing';
import usePokeStore from '@/stores/usePokeStore';
import useThemeStore from '@/stores/useThemeStore';

describe('PokeTile', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        const testingPinia = createTestingPinia({
            createSpy: vi.fn,
        });

        wrapper = mount(PokeTile, {
            props: {
                pokemon: { id: 1, name: 'bulbasaur', artwork: 'https://picsum.photos/200' },
            },
            global: {
                plugins: [testingPinia],
            },
        });
    });

    it('renders correctly and handles image load', async () => {
        // Check initial state
        expect(wrapper.find('skeleton-loader').exists()).toBe(true);
        expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/200');

        // Mock stores
        const pokeStore = usePokeStore();
        const themeStore = useThemeStore();

        // Simulate image loading
        await wrapper.find('img').trigger('load');

        // Check if imageLoaded state is true after image load
        expect(wrapper.vm.imageLoaded).toBe(true);

        // Check if the color of the card and caption has been set
        expect(wrapper.find('.card').attributes('style')).toContain('background-color');
        expect(wrapper.find('.caption').attributes('style')).toContain('background-color');

        // Simulate clicking the card
        await wrapper.find('.card').trigger('click');

        // Check if setPokemon method in pokeStore is called
        expect(pokeStore.setPokemon).toHaveBeenCalled();
    });
});
