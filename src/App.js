// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Governance from './pages/Governance';
import Staking from './pages/Staking';
import Liquidity from './pages/Liquidity';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <AppProvider>
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/governance" component={Governance} />
                        <Route path="/staking" component={Staking} />
                        <Route path="/liquidity" component={Liquidity} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </AppProvider>
    );
}

export default App;
