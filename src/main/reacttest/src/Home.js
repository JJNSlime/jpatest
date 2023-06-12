
import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/boards">게시판 가기</Link></Button>
          <Button color="link"><Link to="/report">보고서 양식</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;