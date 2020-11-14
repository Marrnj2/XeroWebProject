import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CompanyInfo from "./Dashboard/CompanyInfo";
import BusinessSavingsAccount from "./Dashboard/BusinessSavingsAccount";
import TotalCashInAndOut from "./Dashboard/TotalCashInAndOut";
import AccountWatchlist from "./Dashboard/AccountWatchlist";
import Bills from "./Dashboard/Bills";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="component-grid">
        home page
      </div>
    );
  }
}