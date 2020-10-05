﻿import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from './components/navigation/side-menu';
import TopNav from './components/navigation/top-nav';

ReactDOM.render(
    <>
        <SideMenu/>
        <h1>Its working</h1>
    </>,
    document.getElementById('content')
);