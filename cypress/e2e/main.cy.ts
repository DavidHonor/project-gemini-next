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

    it("Create rocket and interact", () => {
        //Create a new rocket instance
        cy.get('[data-testid="create-rocket-btn"]').click();

        cy.get('[data-testid="create-rocket-confirm-btn"]').click();

        cy.get('[data-testid^="card-rocket-item"]').then((items) => {
            const rocketCount = items.length;

            cy.log(`Number of rocket items: ${rocketCount}`);

            expect(rocketCount).to.be.greaterThan(0);

            const lastRocketIndex = rocketCount - 1;
            cy.wrap(lastRocketIndex).as("lastRocketIndex");

            const rocketCardSelector = `[data-testid="card-rocket-item-${lastRocketIndex}"]`;

            cy.get(rocketCardSelector).invoke("text").as("rocketCard");

            cy.get(rocketCardSelector).click();
        });

        //Interact with the rocket inside the editor
        cy.get('[data-testid^="part-rocket-"]').then((items) => {
            const partCount = items.length;

            cy.log(`Number of rocket parts: ${partCount}`);

            expect(partCount).to.be.greaterThan(0);
        });

        //Navigate to rocket list
        cy.get('[data-testid="navbar-profile-btn"]').click();
        cy.contains("Dashboard").click();

        //Delete the rocket
        cy.get("@lastRocketIndex").then((lastRocketIndex) => {
            const deleteSelector = `[data-testid="delete-rocket-${lastRocketIndex}"]`;
            cy.get(deleteSelector).click();
        });

        cy.contains("Confirm").click();
    });
});
