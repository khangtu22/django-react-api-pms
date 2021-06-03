import React, {Component} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemRows: [],
            loaded: false,
            placeholder: "Loading"
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/cars/", {
            method: 'GET',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
        })
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            })
    }

    render() {
        let tableRows;
        if (this.state.data) {
            tableRows =
                Object.values(this.state.data).map(function (row) {
                    return (
                        <TableRow key={row.licensePlate}>
                            <TableCell component="th" scope="row">
                                {row.licensePlate}
                            </TableCell>
                            <TableCell align="right">{row.carColor}</TableCell>
                            <TableCell align="right">{row.carType}</TableCell>
                            <TableCell align="right">{row.company}</TableCell>
                            <TableCell align="right">{row.parkID}</TableCell>
                        </TableRow>
                    )
                });
        }
        const {classes} = this.props;

        return (
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
        )
    }
}

Car.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Car);
