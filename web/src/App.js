import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './Messages';
import Upload from './Upload';
import Navigation from './Navigation';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Messages />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
