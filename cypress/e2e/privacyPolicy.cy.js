describe("Teste da página de política de privacidade", () => {
  it("testa a página da política de privacidade de forma independente", () => {
    cy.visit("src/privacy.html");
    cy.get("h1").should("contain", "CAC TAT - Política de Privacidade");
    cy.url().should("include", "privacy.html");
  });
});
