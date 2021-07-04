import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from 'react-redux'
import UserModal from "./UserModal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { LocalStorage } from "../helper/LocalStorage";
import { Button as AntdButton } from 'antd';
import { useHistory } from "react-router-dom";

const localStore = new LocalStorage();

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
  backButton: {
    margin: '20px 0'
  },
}));

const Favorite = (props) => {
  let history = useHistory();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState();

  let data = localStore.getFavoriteUserList();

  useEffect(() => {
    localStore.getFavoriteUserList()
  })

  const toggleUserModal = (user) => {
    setIsUserModalVisible(!isUserModalVisible);
    setUserDetails(user);
  }

  const goBack = () => {
    history.goBack()
  }

  const classes = useStyles();

  return (
    <div className={classes.main}>
      {isUserModalVisible && <UserModal visible={isUserModalVisible} userDetails={userDetails} toggleUserModal={toggleUserModal} />}
      <AntdButton type="primary" htmlType="submit" onClick={() => goBack()} className={classes.backButton}>
        Go back
      </AntdButton>
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Favorite User List
        </Typography>
        <List className={classes.list}>
          {data.length ?
            data.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem button onClick={() => toggleUserModal(user)}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.email} />
                </ListItem>
              </React.Fragment>
            )) :
            <ListItem>
              No Favorite User added yet
            </ListItem>}

        </List>
      </Paper>

    </div>
  );
};


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
