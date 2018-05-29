describe("Form submission", () => {
    it("submits a job", () => {
        cy.visit("/"),

        cy.get("button").click(),
        cy.get('.drop-down').select('Aarhus').should('contain', 'Aarhus'),
        cy.get('.info-card img').should('have.class', 'urban-image'),
        
        cy.get('.info-card .text-info').as('textInfo'),

        cy.get('@textInfo').find('h3').eq(0).should('have.class', 'fullName'),
        cy.get('@textInfo').find('h3').eq(1).should('have.class', 'continent'),
        cy.get('@textInfo').find('p').should('have.class', 'summary')
    });
});
