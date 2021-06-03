import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    AppBar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Nav() {
    const [isAuth, setIsAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        HOME
                    </Typography>

                    <div>
                        {isAuth === true ? (
                            <Fragment>
                                {' '}
                                <Button to='/home'>Home</Button>
                                {/*<Link to='/logout'>Logout</Link>*/}
                                <Button onClick={handleClickOpen}>
                                    Logout
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle
                                        id="responsive-dialog-title">{"Do you want to logout?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            You will have to login again to use our service.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose} color="primary">
                                            Disagree
                                        </Button>
                                        <Link to='/logout' color="primary" autoFocus>
                                            AGREE
                                        </Link>
                                    </DialogActions>
                                </Dialog>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {' '}
                                <Link to='/login'>Login</Link>

                                <Link to='/signup'>Signup</Link>
                            </Fragment>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav;
