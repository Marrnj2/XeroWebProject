import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import BusinessBankAccount from "./Dashboard/BusinessBankAccount";
import BusinessSavingsAccount from "./Dashboard/BusinessSavingsAccount";
import TotalCashInAndOut from "./Dashboard/TotalCashInAndOut";
import AccountWatchlist from "./Dashboard/AccountWatchlist";
import Bills from "./Dashboard/Bills";
import { withStyles } from '@material-ui/styles';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="component-grid">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <BusinessBankAccount/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BusinessSavingsAccount/>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TotalCashInAndOut/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AccountWatchlist/>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Bills/>
          </Grid>
        </Grid>
      </div>
    );
  }
}