import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCar from "../creates/AddCar";
import UpdateCar from "../creates/UpdateCar";
import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination';
import {recordPerPage} from "../helpers/Constants";
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import {Link, Route, Switch, useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    Car: {
        margin: 10,
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4)
        },
    },
}));

function Car() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState('');
    let [numberOfPage, setNumberOfPage] = React.useState(null);
    let [pageSize, setPageSize] = React.useState(recordPerPage);
    let [currentPage, setCurrentPage] = React.useState(1);
    let [url, setUrl] = React.useState('http://localhost:8000/api/cars/');
    let {licensePlate} = useParams();

    useEffect(() => {
        if (!pageSize) {
            setPageSize(recordPerPage);
        }
        fetch("http://localhost:8000/api/cars/?p=" + currentPage + "&page_size=" + pageSize, {
            method: 'GET',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
        })
            .then(res => res.json())
            .then(data => {
                setResponseData(data.results);
                setNumberOfPage(Math.ceil(data.count / pageSize));
            })
            .catch((error) => console.log(error))
    }, [currentPage, pageSize]);

    let tableRows;
    if (responseData) {
        tableRows =
            Object.values(responseData).map(function (row) {
                return (
                    <TableRow key={row.licensePlate}>

                        <TableCell component="th" scope="row">
                            <Link to={"/cars/" + row.licensePlate + "/"}>
                                {row.licensePlate}
                            </Link>
                        </TableCell>
                        <TableCell align="right">{row.carColor}</TableCell>
                        <TableCell align="right">{row.carType}</TableCell>
                        <TableCell align="right">{row.company}</TableCell>
                        <TableCell align="right">{row.parkID}</TableCell>
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
                                <TableCell>License template</TableCell>
                                <TableCell align="right">Car Color</TableCell>
                                <TableCell align="right">Car type</TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right">Park ID</TableCell>
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

            </Grid>
            <Grid item xs={3} >
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
    )
}

export default Car;
