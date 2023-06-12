import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardEdit from './BoardEdit';
import ReportEdit from './ReportEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Home />}/>
          <Route path='/Boards' exact={true} element={<BoardList />}/>
          <Route path="/Board/:id" element={<BoardEdit />}/>
          <Route path="/Report" element={<ReportEdit />}/>
        </Routes>
      </Router>
    )
  }
}

export default App;
