import React, {useEffect, useState} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import {recordPerPage} from "../helpers/Constants";
import {useSelector} from "react-redux";
import {selectAction} from "../../features/car/carsSlice";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";
import {Route, Switch} from "react-router-dom";
import AddCar from "../creates/AddCar";


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4)
        },
    },
}));


function Trip() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState('');
    let [pageSize, setPageSize] = useState(recordPerPage);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalRecord, setTotalRecord] = useState(0);
    let [numberOfPage, setNumberOfPage] = useState(null);

    const actionsChanged = useSelector(selectAction);
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            window.location.replace('http://localhost:3000/login');
        }
        if (!pageSize) {
            setPageSize(recordPerPage);
        }
        fetch("http://localhost:8000/api/trips/?p=" + currentPage + "&page_size=" + pageSize, {
            method: 'GET',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
        })
            .then(res => {
                if (res.status === 401) {
                    localStorage.clear();
                    window.location.replace('http://localhost:3000/login');
                    return;
                }
                res.json()
                    .then(data => {
                        setResponseData(data.results);
                        setTotalRecord(data.count);
                        setNumberOfPage(Math.ceil(data.count / pageSize));
                    })
                    .catch((error) => console.log(error))
            })
    }, [currentPage, pageSize, actionsChanged]);

    let tableRows;
    if (responseData) {
        tableRows =
            Object.values((responseData)).map(function (row) {
                return (
                    <TableRow key={row.tripID}>
                        <TableCell component="th" scope="row">
                            {row.tripID}
                        </TableCell>
                        <TableCell align="right">{row.bookedTicketNumber}</TableCell>
                        <TableCell align="right">{row.carType}</TableCell>
                        <TableCell align="right">{row.departureDate}</TableCell>
                        <TableCell align="right">{row.departureTime}</TableCell>
                        <TableCell align="right">{row.destination}</TableCell>
                        <TableCell align="right">{row.driver}</TableCell>
                        <TableCell align="right">{row.maximumOnlineTicketNumber}</TableCell>
                    </TableRow>
                )
            });
    }

    const handleChange = (event, value) => {
        setCurrentPage(value);
        console.log(value)
    };


    return (
        <Grid container classes={classes.Car}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={8}>
                <Box m={2}>
                    <Grid xs={2}>
                        <TextField
                            required
                            id="pageSize"
                            label="Page Size"
                            name="pageSize"
                            type='number'
                            autoComplete="pageSize"
                            // value={pageSize}
                            onChange={e => setPageSize(parseInt(e.target.value))}
                        />
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Trip ID</TableCell>
                                <TableCell align="right">Booked ticket</TableCell>
                                <TableCell align="right">Car type</TableCell>
                                <TableCell align="right">Departure date</TableCell>
                                <TableCell align="right">Departure time</TableCell>
                                <TableCell align="right">Destination</TableCell>
                                <TableCell align="right">Driver</TableCell>
                                <TableCell align="right">Max ticket</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.root}>
                    <Pagination count={numberOfPage} page={currentPage} onChange={handleChange}/>
                </div>
                <div>
                    Total: {totalRecord}
                </div>

            </Grid>
            <Grid item xs={3}>
                <Switch>
                    <Route exact path="/cars/:id">
                        <AddCar/>
                    </Route>
                    <Route exact path="/cars">
                        <AddCar/>
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
}

export default Trip;