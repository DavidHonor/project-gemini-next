describe("E2E test", () => {
    beforeEach(() => {
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

    it("Create rocket test", () => {
        cy.get('[data-testId="create-rocket-btn"]').click();

        cy.get('[data-testId="create-rocket-confirm-btn"]').click();

        cy.get('[data-testid^="rocket-item-"]').then((items) => {
            const count = items.length;

            cy.log(`Number of rocket items: ${count}`);

            expect(count).to.be.greaterThan(0);
        });
    });
});
