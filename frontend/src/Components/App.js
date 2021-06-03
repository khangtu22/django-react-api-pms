import React, {Component} from 'react';
import HomePage from './HomePage';
import Nav from "./utils/Nav";
import Sidebar from "./Sidebar";
import Grid from "@material-ui/core/Grid";
import {items} from "./helpers/Constants";
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <HomePage/>
        )
    }
}

export default App;