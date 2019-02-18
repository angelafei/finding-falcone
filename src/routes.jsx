import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SplashContainer from './containers/splash-container';
import SearchContainer from './containers/search-container';
import ResultContainer from './containers/result-container';

export function Routes() {
  return (
    <BrowserRouter basename="/coding-test">
      <div className="page-wrapper">
        <div className="page-container">
          <header className="header-container">
            <Link className="header-container__link" to='/'>Home</Link>
          </header>
          <div className="content-container">
            <Switch>
                <Route exact path="/" component={SplashContainer}/>
                <Route path="/search" component={SearchContainer}/>
                <Route path="/result" component={ResultContainer}/>
            </Switch>
          </div>
          <footer className="footer-container">Coding a problem- www.geektrust.in/finding-falcone</footer>
        </div>
      </div>
    </BrowserRouter>
  );
} 