describe("MARLON QA CYPRESS DEMO", () => {
  it("Special Request if else demo", () => {
    cy.execute("npm run sheet-converter Card-types");
    cy.login("lstv", "lstventures");

    cy.get(":nth-child(1) > #home-card-styled").click({ force: true });
    cy.contains("Card Types").click({ force: true });

    cy.get("tbody").then(($tablebody) => {
      const tableText = $tablebody.text();
    
      // List of card types to check
      const cardTypes = [
        "Credit Card",
        "Debit Card",
        "Gift Card",
        "Prepaid Card",
        "Store Card",
      ];
    
      // Check if any card type is found in the table
      const hasCardType = cardTypes.some((card) => tableText.includes(card));
    
      if (hasCardType) {
        cy.log("✅ CARD TYPE FOUND!");
        cy.screenshot();
      } else {
        cy.log("❌ NO CARD TYPE FOUND!");
        cy.wait(4000);
        cy.screenshot();
      }
    });

    cy.fixture("Card-types.json").then((data) => {
      for (const key in data) {
        cy.get("#add-button-icon > svg").click({ force: true });
        cy.wait(4000);
        cy.get("#modal-h1").should("have.text", "Add Card Type");
        cy.wait(4000);
        cy.get("#cardtype").click({ force: true }).type(data[key].Descriptions);
        cy.get("#button-form-2").click({ force: true });
        cy.wait(2000)

        cy.get(".Toastify__toast-body").invoke('text').then((valMsg) => {
          cy.log(valMsg)

          if (valMsg === "Duplicate entry! Kindly check your inputs") {
            cy.screenshot();
            cy.log("ALREADY EXISTING || DUPLICATE DATA");
            cy.get("#button-form-1").click({ force: true }).wait(3000);
            cy.get("#warning-button-2").click({ force: true }).wait(2000);
            cy.get('#back-button').click({ force: true })
            cy.wait(2000);
            cy.url().should('eq', 'http://localhost:5173/#/pages/masterfile');
            cy.contains("Card Types").click({ force: true });
            cy.wait(2000)
            cy.url().should('eq', 'http://localhost:5173/#/pages/cardType/?menfield=masterfile_card_types');
            cy.wait(4000);
            
            cy.get('body').then(($body) => {
              // Check if #pos-table-search exists
              if ($body.find('#pos-table-search').length > 0) {
                // It's already visible, do nothing or proceed with test
                cy.log('Search bar is already visible');
              } else {
                // It's not visible, click the icon to show it
                cy.get('[aria-label="Show/Hide search"]').click({ force: true });
              }
            });
            cy.get("#pos-table-search").click({ force: true }).type(data[key].Descriptions);
          
            cy.get("body").then(($rs1) => {
              if ($rs1.find(".css-1gpk8l6-MuiTableCell-root").length) {
                cy.get(".css-1gpk8l6-MuiTableCell-root").should(
                  "have.text",
                  data[key].Descriptions
                );
                cy.log("Existing");
                cy.screenshot();
              } else {
                cy.log("Not Existing");
                cy.screenshot();
              }
            });
          } else {
            cy.get("#button-form-1").click({ force: true }).wait(3000);
            cy.url().should('eq', 'http://localhost:5173/#/pages/cardType/?menfield=masterfile_card_types');
            cy.get('[aria-label="Show/Hide search"]').click({ force: true });
            cy.get("#pos-table-search").click({ force: true }).type(data[key].Descriptions);

            cy.get("body").then(($rs1) => {
              if ($rs1.find(".css-1gpk8l6-MuiTableCell-root").length) {
                cy.get(".css-1gpk8l6-MuiTableCell-root").should(
                  "have.text",
                  data[key].Descriptions
                );
                cy.log("Existing");
                cy.screenshot();
              } else {
                cy.log("Not Existing");
                cy.screenshot();
              }
            });
          }
        });
      }
    });
  });
});
