
describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson#gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  })

  it('campo telefone permanece vazio caso receba digitos não numéricos', () => {
    cy.get('#phone').type('text').should('have.value', '');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');

    cy.get('#phone-checkbox').check();

    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Jefferson').should('have.value', 'Jefferson').clear().should('have.value', '');
    cy.get('#lastName').type('Ferreira').should('have.value', 'Ferreira').clear().should('have.value', '');
    cy.get('#email').type('jefferson@gmail.com').should('have.value', 'jefferson@gmail.com').clear().should('have.value', '');
    cy.get('#phone').type('84998032648').should('have.value', '84998032648').clear().should('have.value', '');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado com objeto', () => {
    
    const object = {
    firstName: "Jefferson",
    lastName: "Ferreira",
    email: "jefferson@gmail.com",
    text: "Texto do campo"
    }

  cy.fillMandatoryFieldsAndSubmitObject(object);
  cy.get('.success').should('be.visible');

  })

  it('envia formulario com comando customizado, com objeto padrão', () => {
    cy.fillMandatoryFieldsAndSubmitDefaultValues();
    cy.get('.success').should('be.visible');
  });

  it('seleciona um produto (YouTube) por seu valor', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube');
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('contain', 'YouTube');
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog');
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked');
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    //each interage no array de elementos
      .each(tipoAtendimento => {
        //wrap empacota o elemento e trabalha neles
        cy.wrap(tipoAtendimento)
        .check()
        .should('be.checked');
      })
  })

  //Nessa versão, como o seletor é genérico, todos são marcados, sem precisar interar.
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .as('inputs')
      .check()
      .should('be.checked')

    cy.get('@inputs')
    .last()
    .uncheck()
    .should('not.be.checked');
  })

  //Nessa versão, está ocorrendo interação.
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .as('inputs')
      .each(cheackAll => {
        cy.wrap(cheackAll)
        .check()
        .should('be.checked')
      })
    cy.get('@inputs')
    .last()
    .uncheck()
    .should('not.be.checked');;
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/cupom.png')
      .then((input) => {
        console.log(input)
      expect(input[0].files[0].name).to.equal("cupom.png");
    })

    cy.get('.success').should('be.visible');
    
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/cupom.png', { action : "drag-drop" })
      .then((input) => {
        console.log(input)
      expect(input[0].files[0].name).to.equal("cupom.png");
    })

    cy.get('.success').should('be.visible');
    
  })

  it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.get('#firstName').type('Jefferson');
    cy.get('#lastName').type('Ferreira');
    cy.get('#email').type('jefferson@gmail.com');
    cy.get('#open-text-area').type('Hellow World');

    cy.get('.button').as('submit').should('be.visible');
    cy.contains('button', 'Enviar').click();

    cy.fixture('cupom.png').as('cupomFiscal')
    cy.get('#file-upload').selectFile('@cupomFiscal').then((input) => {
      expect(input[0].files[0].name).to.equal('cupom.png');
    })

    cy.get('.success').should('be.visible');
    
  })

});
