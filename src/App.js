import React from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div classname="App">
      <Navbar dark color="primary">
        <div classname="container">
          <NavbarBrand href="/"> Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
