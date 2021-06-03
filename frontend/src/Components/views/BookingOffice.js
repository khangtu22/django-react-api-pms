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

function BookingOffice() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/bookingoffices/", {
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
                    <TableRow key={row.officeID}>
                        <TableCell component="th" scope="row">
                            {row.officeID}
                        </TableCell>
                        <TableCell align="right">{row.officeName}</TableCell>
                        <TableCell align="right">{row.officePhone}</TableCell>
                        <TableCell align="right">{row.officePlace}</TableCell>
                        <TableCell align="right">{row.officePrice}</TableCell>
                        <TableCell align="right">{row.startContractDeadline}</TableCell>
                        <TableCell align="right">{row.endContractDeadline}</TableCell>
                        <TableCell align="right">{row.tripID}</TableCell>
                    </TableRow>
                )
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Office ID</TableCell>
                        <TableCell align="right">Office name</TableCell>
                        <TableCell align="right">Office phone</TableCell>
                        <TableCell align="right">Office place</TableCell>
                        <TableCell align="right">Office price</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">Trip ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BookingOffice;