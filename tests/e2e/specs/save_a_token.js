describe("Saved", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("Saved").click();
    cy.contains("Load a Saved KLE");
    const token = Cypress.env("GHTOKEN");
    cy.get("input[name=gh_token]").type(token);
    cy.contains("Ok").click();
    cy.contains("Token:");
  });
});
