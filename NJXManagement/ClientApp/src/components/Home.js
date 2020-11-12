import React, { Component,useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import BusinessBankAccount from "./Dashboard/BusinessBankAccount";
import BusinessSavingsAccount from "./Dashboard/BusinessSavingsAccount";
import TotalCashInAndOut from "./Dashboard/TotalCashInAndOut";
import AccountWatchlist from "./Dashboard/AccountWatchlist";
import Bills from "./Dashboard/Bills";

export function Home (){
    const [displayName,setDisplayname] = useState(Home.name)
    useEffect(() => {
      fetch("/SignIn")
      .then(r => r.text())
      .then(data => {
        if(data != "")
        {
          window.location.href = data
        }
      })
      },[])
          
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