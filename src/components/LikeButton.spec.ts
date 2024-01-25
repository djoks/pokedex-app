import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LikeButton from '@/components/LikeButton.vue';
import { createTestingPinia } from '@pinia/testing';
import { useLikePokemon } from '@/composables';
import { useToastStore } from '@/stores';
import { ref } from 'vue';

vi.mock('@/composables/useLikePokemon', () => ({
    default: vi.fn(() => ({
        isLiked: ref(false),
        toggleLike: vi.fn(),
        loadLikes: vi.fn(),
    })),
}));

describe('LikeButton', () => {
    beforeEach(() => {
        createTestingPinia({
            createSpy: vi.fn,
        });
    });

    it('displays the correct icon based on like state and shows toast on click', async () => {
        const wrapper = mount(LikeButton, {
            props: { pokemon: { id: 1, name: 'pikachu', artwork: 'https://picsum.photos/200' } },
            global: {
                stubs: {
                    HeartIcon: true,
                    HeartFilledIcon: true,
                },
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            },
        });

        const { isLiked, toggleLike } = useLikePokemon('pikachu');
        const toastStore = useToastStore();

        // Initial state: not liked
        expect(wrapper.find('[role="like"]').exists()).toBe(true);
        expect(wrapper.find('[role="dislike"]').exists()).toBe(false);

        // Simulate click to like
        await wrapper.trigger('click',);
        await wrapper.vm.$nextTick();

        expect(toggleLike).toHaveBeenCalled();
        expect(toastStore.makeToast).toHaveBeenCalledWith('You liked Pikachu!');

        // Change like state to liked
        isLiked.value = true;
        await wrapper.vm.$nextTick();

        // Liked state
        expect(wrapper.find('[role="dislike"]').exists()).toBe(true);
        expect(wrapper.find('[role="like"]').exists()).toBe(false);

        // Simulate click to dislike
        await wrapper.trigger('click');
        expect(toastStore.makeToast).toHaveBeenCalledWith('You disliked Pikachu!');
    });
});
