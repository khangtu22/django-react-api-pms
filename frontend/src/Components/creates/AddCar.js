import React, {useEffect, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {create, drop, update,} from '../../features/car/carsSlice';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddCar = (props) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carType, setCarType] = useState('');
    const [company, setCompany] = useState('');
    const [parkID, setParkID] = useState('');
    const [parkList, setParkList] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(() => {
        _getParkList();
        if (id) {
            setLoading(true);
            setUpdateMode(true);
            fetch('http://localhost:8000/api/cars/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
                .then(res =>
                    res.json()
                )
                .then(data => {
                    setLicensePlate(data.licensePlate)
                    setCarType(data.carType)
                    setCarColor(data.carColor)
                    setCompany(data.company)
                    setParkID(data.parkID)
                    setErrors(false)
                });
        } else {
            setUpdateMode(false)
            setLicensePlate('')
            setCarType('')
            setCarColor('')
            setCompany('')
            setParkID('')
        }
    }, [id, updateMode, errors]);

    const onSubmitCreate = e => {
        e.preventDefault();
        setLoading(true);
        const car = {
            licensePlate: licensePlate,
            carColor: carColor,
            carType: carType,
            company: company,
            parkID: parkID,
        };
        fetch('http://localhost:8000/api/cars/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(car)
        })
            .then(res => {
                if (res.status === 400) {
                    setLicensePlate('')
                    setCarType('')
                    setCarColor('')
                    setCompany('')
                    setParkID('')
                    setErrors(true);
                    return;
                }
                res.json()
                    .then(data => {
                        setLicensePlate('')
                        setCarType('')
                        setCarColor('')
                        setCompany('')
                        setParkID('')
                        setErrors(false)
                        dispatch(create());
                    });
            })
        // dispatch(create());
    }

    const onSubmitUpdate = e => {
        e.preventDefault();
        setLoading(true)
        const car = {
            licensePlate: licensePlate,
            carColor: carColor,
            carType: carType,
            company: company,
            parkID: parkID,
        };
        fetch('http://localhost:8000/api/cars/' + licensePlate + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(car)
        })
            .then(res =>
                res.json()
            )
            .then(data => {
                setLicensePlate(data.licensePlate)
                setCarType(data.carType)
                setCarColor(data.carColor)
                setCompany(data.company)
                setParkID(data.parkID)
                setErrors(false)
                setLoading(true)
            });
        dispatch(update());
    }

    const handleDelete = () => {
        fetch('http://localhost:8000/api/cars/' + id + '/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        })
            .then(res => {
                if (res.status === 204) {
                    return res.json();
                }
                return res.json()
            })
            .catch(error => {
                console.error("Can not delete car!");
            })
        handleClose()
        dispatch(drop());
        // setDeleteActionChange(!deleteActionChange);
        // props.onDeleteAction(deleteActionChange);
        history.push("/cars");

    }

    const _getParkList = () => {
        fetch("http://localhost:8000/api/parkinglot/", {
            method: 'GET',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`},
        })
            .then(res => res.json())
            .then(data => {
                setParkList(data.results);
            })
            .catch((error) => console.log(error))
    }

    function renderCreateButton() {
        return <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value='Signup'
            className={classes.submit}
        >
            Create
        </Button>;
    }

    const renderUpdateDeleteButton = () => {
        return <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                value='Update'
                className={classes.submit}
            >
                Update
            </Button>
            <Button
                onClick={handleClickOpen}
                fullWidth
                variant="contained"
                color="danger"
                value='Delete'
                className={classes.submit}
            >
                Delete
            </Button>
        </>
    }

    const renderForm = () => {
        return <form onSubmit={updateMode ? onSubmitUpdate : onSubmitCreate} className={classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        disabled={updateMode}
                        id="licensePlate"
                        label="License Plate"
                        name="licensePlate"
                        type='text'
                        value={licensePlate}
                        onChange={e => setLicensePlate(e.target.value)}
                        autoComplete="licensePlate"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="carColor"
                        label="carColor"
                        name="carColor"
                        type='text'
                        value={carColor}
                        onChange={e => setCarColor(e.target.value)}
                        autoComplete="carColor"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="carType"
                        label="carType"
                        type="text"
                        id="carType"
                        value={carType}
                        onChange={e => setCarType(e.target.value)}
                        autoComplete="carType"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="company"
                        label="company"
                        type="text"
                        id="company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        autoComplete="company"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="parkID">Park Place*</InputLabel>
                    <Select
                        labelId="parkID"
                        id="ParkID"
                        variant="outlined"
                        value={parkID}
                        required
                        fullWidth
                        onChange={e => setParkID(e.target.value)}
                        autoComplete="parkID"
                    >
                        {parkListItems}
                    </Select>
                </Grid>
                {errors === true && <h2>Error!</h2>}
            </Grid>
            {updateMode ? renderUpdateDeleteButton() : renderCreateButton()}
        </form>
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderDialogDelete = () => {
        return <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle
                id="responsive-dialog-title">{"Delete this record!"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You will lost data and can not back up!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    AGREE
                </Button>
            </DialogActions>
        </Dialog>
    }

    let parkListItems;
    if (parkList) {
        parkListItems =
            Object.values(parkList).map(function (row) {
                return (
                    <MenuItem value={row.parkID}>{row.parkName}</MenuItem>
                )
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {renderForm()}
            </div>
            {renderDialogDelete()}
        </Container>
    )
}

export default AddCar;