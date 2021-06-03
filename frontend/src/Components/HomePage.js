import React from 'react';
import Grid from '@material-ui/core/Grid';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Ticket from "./views/Ticket";
import Logout from "./auths/Logout";
import Login from "./auths/Login";
import Signup from "./auths/Signup";
import BookingOffice from "./views/BookingOffice";
import Car from "./views/Car";
import ParkingLot from "./views/ParkingLot";
import Trip from "./views/Trip";
import Nav from "./utils/Nav";
import AddCar from "./creates/AddCar";

const HomePage = () => {

    return (
        <div className='HomePage'>
            <Router>
                <div className="Home">
                    <Nav/>
                    <Grid container>
                        <Grid item xs={12}>
                            <Switch>
                                <Route path='/login' component={Login} exact/>
                                <Route path='/signup' component={Signup} exact/>
                                <Route path='/logout' component={Logout} exact/>
                                {/*<Route path='/bookingoffices' component={BookingOffice}/>*/}
                                <Route path='/cars' component={Car}/>
                                {/*<Route path='/parkinglots' component={ParkingLot}/>*/}
                                {/*<Route path='/tickets' component={Ticket}/>*/}
                                {/*<Route path='/trips' component={Trip}/>*/}
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </Router>
        </div>
    )
}

export default HomePage;