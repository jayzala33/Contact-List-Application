import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import UserModal from "./UserModal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0)
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2)
    },
    subheader: {
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        position: 'inherit'
    },
    grow: {
        flexGrow: 1
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    },
    main: {
        maxWidth: '400px',
        margin: 'auto'
    },
    select: {
        color: 'white',
        fontSize: '20px'
    }
}));

const UserList = (props) => {
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [userDetails, setUserDetails] = useState();

    let data = props.userList;

    const [sort, setSort] = useState("all");

    const handleChange = (event) => {
        setSort(event.target.value);
        const { getUser } = props
        if (event.target.value === 'a2z') {
            data = data.sort(function (a, b) {
                if (a.first_name < b.first_name) { return -1; }
                if (a.first_name > b.first_name) { return 1; }
                return 0;
            })
        } else if (event.target.value === 'z2a') {
            data = data.sort(function (a, b) {
                if (a.first_name < b.first_name) { return -1; }
                if (a.first_name > b.first_name) { return 1; }
                return 0;
            }).reverse()
        } else {
            getUser()
        }
    };

    const toggleUserModal = (user) => {
        setIsUserModalVisible(!isUserModalVisible);
        setUserDetails(user);
    }

    useEffect(() => {
        const { getUser } = props
        getUser()
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.main}>
            {isUserModalVisible && <UserModal visible={isUserModalVisible} userDetails={userDetails} toggleUserModal={toggleUserModal} />}
            <AppBar color="primary" className={classes.appBar}>
                <Toolbar>
                    <Select
                        className={classes.select}
                        value={sort}
                        onChange={handleChange}
                        input={<InputBase />}
                    >
                        <MenuItem value={'all'}>ALL</MenuItem>
                        <MenuItem value={'a2z'}>A to Z</MenuItem>
                        <MenuItem value={'z2a'}>Z to A</MenuItem>
                    </Select>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                    User List
                </Typography>
                <List className={classes.list}>
                    {data.map((user) => (
                        <React.Fragment key={user.id}>
                            <ListItem button onClick={() => toggleUserModal(user)}>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={user.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.email} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        userList: state.userList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(userActions.getUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
