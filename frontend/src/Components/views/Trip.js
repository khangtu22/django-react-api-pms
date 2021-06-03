import React, {useEffect} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Trip() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/trips/", {
            method: 'GET',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
        })
            .then(res => res.json())
            .then(data => setResponseData(data))
            .catch((error) => console.log(error))
    }, []);

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
                        <TableCell align="right">{row.departureDate}</TableCell>
                        <TableCell align="right">{row.departureTime}</TableCell>
                        <TableCell align="right">{row.destination}</TableCell>
                        <TableCell align="right">{row.driver}</TableCell>
                        <TableCell align="right">{row.maximumOnlineTicketNumber}</TableCell>
                    </TableRow>
                )
            });
    }

    return (
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
                        <TableCell align="right">Max ticket</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Trip;