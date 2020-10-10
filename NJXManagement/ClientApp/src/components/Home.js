import React, { Component } from 'react';
import BusinessBankAccount from "./Dashboard/BusinessBankAccount";
import BusinessSavingsAccount from "./Dashboard/BusinessSavingsAccount";
import TotalCashInAndOut from "./Dashboard/TotalCashInAndOut";
import AccountWatchlist from "./Dashboard/AccountWatchlist";
import Bills from "./Dashboard/Bills";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="cards">
        <BusinessBankAccount/>
        <BusinessSavingsAccount/>
        <TotalCashInAndOut/>
        <AccountWatchlist/>
        <Bills/>
      </div>
    );
  }
}
