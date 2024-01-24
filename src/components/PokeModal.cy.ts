import PokeModal from './PokeModal.vue'

describe('<PokeModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PokeModal)
  })
})