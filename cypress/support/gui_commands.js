Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitObject', (object) => {
    cy.get('#firstName').type(object.firstName);
    cy.get('#lastName').type(object.lastName);
    cy.get('#email').type(object.email);
    cy.get('#open-text-area').type(object.text);

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmitDefaultValues', (object = {
    firstName: 'Juliana',
    lastName: 'Dantas',
    email: 'juliana@gmail.com',
    text: 'Ô Juliana, o que tu quer de mim.'
}) => {
    cy.get('#firstName').type(object.firstName);
    cy.get('#lastName').type(object.lastName);
    cy.get('#email').type(object.email);
    cy.get('#open-text-area').type(object.text);

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();
});