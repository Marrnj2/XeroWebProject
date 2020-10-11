import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';
import NavigationLayout from './NavigationsLayout';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <NavigationLayout>
        <div className="back">
          <Container>
            {this.props.children}
          </Container>
        </div>
      </NavigationLayout>
      </>
    );
  }
}
