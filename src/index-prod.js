import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Home from './Home';
import Docs from './Docs';
import Guides from './Guides';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <main>
        <Route exact path='/TickTock/' component={Home} />
        <Route exact path="/TickTock/docs" component={Docs}/>
        <Route exact path="/TickTock/guides" component={Guides}/>
      </main>
      <Footer />
    </div>
  </Router>
, document.getElementById('root'));
