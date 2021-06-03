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

function ParkingLot() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/parkinglot/", {
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
                    <TableRow key={row.parkID}>
                        <TableCell component="th" scope="row">
                            {row.parkID}
                        </TableCell>
                        <TableCell align="right">{row.parkArea}</TableCell>
                        <TableCell align="right">{row.parkName}</TableCell>
                        <TableCell align="right">{row.parkPlace}</TableCell>
                        <TableCell align="right">{row.parkPrice}</TableCell>
                        <TableCell align="right">{row.parkStatus}</TableCell>
                    </TableRow>
                )
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Park ID</TableCell>
                        <TableCell align="right">Park area</TableCell>
                        <TableCell align="right">Park name</TableCell>
                        <TableCell align="right">Park place</TableCell>
                        <TableCell align="right">Park price</TableCell>
                        <TableCell align="right">Park status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ParkingLot;