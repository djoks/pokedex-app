import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLogo from '@/components/AppLogo.vue'

describe('AppLogo', () => {

    it('renders logo correctly', () => {
        const wrapper = mount(AppLogo);

        expect(wrapper.find('svg[role="logo"]').exists()).toBeTruthy();
    });

    it('applies correct classes based on size prop', () => {
        const wrapper = mount(AppLogo, {
            props: { size: 'xl' }
        });

        expect(wrapper.find('*[role="logo"]').classes()).toContain('w-36');
    });
});
