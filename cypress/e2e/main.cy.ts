describe("E2E test", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Login test", () => {
        cy.visit("/");
        cy.contains("Sign in").click();

        cy.origin(Cypress.env("KINDE_ISSUER_URL"), () => {
            cy.get('input[name="p_email"]').type(
                Cypress.env("KINDE_LOGIN_EMAIL")
            );

            cy.contains("Continue").click();

            cy.get('input[name="p_password"]').type(
                Cypress.env("KINDE_LOGIN_PWD")
            );

            cy.contains("Continue").click();
        });
    });
});
