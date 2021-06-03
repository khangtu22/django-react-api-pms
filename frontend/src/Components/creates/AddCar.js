import React, {useEffect, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";

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

const UpdateCar = (props) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carType, setCarType] = useState('');
    const [company, setCompany] = useState('');
    const [parkID, setParkID] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const classes = useStyles();
    const {id} = useParams()

    useEffect(() => {
        if (id) {
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
    }, [id, setUpdateMode, errors]);

    const onSubmitCreate = e => {
        e.preventDefault();
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
                    return setErrors(true)
                }
                return res.json()
            })
            .then(data => {
                setLicensePlate(data.licensePlate)
                setCarType(data.carType)
                setCarColor(data.carColor)
                setCompany(data.company)
                setParkID(data.parkID)
                setErrors(false)
                setLoading(true);
            })
            .catch(error => {
                setErrors(true)
                // console.log(error.response)
            });
    }

    const onSubmitUpdate = e => {
        e.preventDefault();
        setLoading(false)
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

    const renderUpdateButton = () => {
        return <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value='Update'
            className={classes.submit}
        >
            Update
        </Button>;
    }

    const renderForm = () => {
        return <form onSubmit={updateMode ? onSubmitUpdate : onSubmitCreate} className={classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
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
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="parkID"
                        label="parkID"
                        type="text"
                        id="parkID"
                        value={parkID}
                        onChange={e => setParkID(e.target.value)}
                        autoComplete="parkID"
                    />
                </Grid>
                {errors === true && <h2>Error!</h2>}
            </Grid>
            {updateMode ? renderUpdateButton() : renderCreateButton()}
        </form>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                {renderForm()}
            </div>
        </Container>
    )
}

export default UpdateCar;