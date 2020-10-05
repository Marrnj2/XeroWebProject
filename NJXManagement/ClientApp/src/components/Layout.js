import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import SideMenu from './side-menu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <SideMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
