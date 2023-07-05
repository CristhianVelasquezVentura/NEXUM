describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://dev-nexum-portal.btigersystem.net/')

    cy.get('ec-input-password').type('Luis11@nny')
    cy.get('ec-input-text').type('luis.lucero@e-capture.co')
  })
})
