import React from "react";
import InvoicesTable from "./Invoices/InvoiceTable";
import InvoicesGraph from "./Invoices/InvoiceGraph";

/*
* A component building the invoices page
* @component
*/
export default function Employees() {
  return (
    <>
      <InvoicesGraph />
      <InvoicesTable />
    </>
  );
}
