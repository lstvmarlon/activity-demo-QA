describe("GROUP ACTIVITY", () => {
  it("IF-ELSE STATEMENTS", () => {
    cy.execute("npm run sheet-converter void-refund-reasons");
    cy.login("lstv", "lstventures");

    cy.get(":nth-child(1) > #home-card-styled").click();

    cy.contains("Void/Refund Reasons").click();

    cy.get("tbody").then(($table) => {
      if ($table.text().includes("wrong punch")) {
        cy.log("MERON NAAAAAAAAAAAAA!");
        cy.screenshot();
      } else {
        cy.log("WALA PA SYANG GANON :<");
        cy.wait(4000);
        cy.screenshot();

        cy.fixture("void-refund-reasons.json").then((data) => {
          for (const key in data) {
            cy.get("#add-button-icon > svg").click();
            cy.wait(4000);
            cy.get("#modal-h1").should("have.text", "Add Void/Refund Reason");
            cy.wait(4000);
            cy.get("#voidcde").click().type(data[key].voidReasons);
            cy.get("#button-form-2").click();

            cy.get(".Toastify__toast-body").then(($toast) => {
              if (
                $toast
                  .text()
                  .includes("Duplicate entry! Kindly check your inputs")
              ) {
                cy.screenshot();
                cy.log("DUPLICATE ENTRYYYYYYYYYYYY");
                cy.get("#button-form-1").click().wait(3000);
                cy.get("#warning-button-2").click().wait(2000);
                cy.get("#back-button").click().wait(2000);
                cy.contains("Void/Refund Reasons").click();
                cy.get('[aria-label="Show/Hide search"]').click();
                cy.get("#pos-table-search").click().type(data[key].voidReasons);

                cy.get("body").then(($rs1) => {
                  if ($rs1.find(".css-1gpk8l6-MuiTableCell-root").length) {
                    cy.get(".css-1gpk8l6-MuiTableCell-root").should(
                      "have.text",
                      data[key].voidReasons
                    );
                    cy.log("MERON NAAAAAAAAAAAAA!");
                    cy.screenshot();
                  } else {
                    cy.log("Wala naman eh");
                    cy.screenshot();
                  }
                });
              } else {
                cy.get("#button-form-1").click().wait(3000);
                cy.get("#back-button").click().wait(2000);
                cy.contains("Void/Refund Reasons").click();
                cy.get('[aria-label="Show/Hide search"]').click();
                cy.get("#pos-table-search").click().type(data[key].voidReasons);

                cy.get("body").then(($rs1) => {
                  if ($rs1.find(".css-1gpk8l6-MuiTableCell-root").length) {
                    cy.get(".css-1gpk8l6-MuiTableCell-root").should(
                      "have.text",
                      data[key].voidReasons
                    );
                    cy.log("MERON NAAAAAAAAAAAAA!");
                    cy.screenshot();
                  } else {
                    cy.log("Wala naman eh");
                    cy.screenshot();
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});
