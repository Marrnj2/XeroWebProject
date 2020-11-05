import React from "react";
import InvoicesTable from "./Invoices/InvoiceTable";
import InvoicesGraph from "./Invoices/InvoiceGraph";

export default function Employees() {
  return (
    <>
      <InvoicesGraph />
      <InvoicesTable />
    </>
  );
}
