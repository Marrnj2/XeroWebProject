import React, { Component } from "react";
import Example from "./BankAccount/AccountHistoryBlock";

export default function BankAccounts() {
  return (
    <>
      <h1>Bank Accounts</h1>
      <div className="cards">
        <Example />
        <Example />
        <Example />
        <Example />
        <Example />
      </div>
    </>
  );
}
