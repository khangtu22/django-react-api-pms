import React from 'react';
import Sidebar from "./Sidebar";
import Grid from '@material-ui/core/Grid';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {items} from "./helpers/Constants";
import Ticket from "./Ticket";
import Logout from "./auth/Logout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import BookingOffice from "./BookingOffice";
import Car from "./Car";
import ParkingLot from "./ParkingLot";
import Trip from "./Trip";
import Nav from "./utils/Nav";

const HomePage = () => {

    return (
        <div className='HomePage'>
            <Router>
                <div className="Home">
                    <Nav/>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Sidebar items={items}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Switch>
                                <Route path='/login' component={Login} exact/>
                                <Route path='/signup' component={Signup} exact/>
                                <Route path='/logout' component={Logout} exact/>
                                <Route path='/bookingoffices' component={BookingOffice}/>
                                <Route path='/cars' component={Car}/>
                                <Route path='/parkinglots' component={ParkingLot}/>
                                <Route path='/tickets' component={Ticket}/>
                                <Route path='/trips' component={Trip}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </Router>
        </div>
    )
}

export default HomePage;