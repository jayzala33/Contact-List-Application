import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { Modal, Button as AntdButton } from 'antd';
import * as userActions from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Avatar from "@material-ui/core/Avatar";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom";
import { LocalStorage } from '../helper/LocalStorage';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    textAlign: 'center'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: 'white',
    width: '100px',
    height: '100px',
    '& > span > div': {
      width: 'inherit',
      height: 'inherit'
    }
  },
  cardMedia: {
    position: 'relative'
  },
  userName: {
    marginTop: '30px'
  },
  followButton: {
    width: '100%',
    height: '50px',
    backgroundColor: '#00800099',
    color: 'white',
    fontSize: '18px',
    '& :hover': {
      color: '#00800099',
    }
  },
  followDetails: {
    display: 'flex',
    '& > :first-child': {
      borderRight: '2px solid gray',
    },
    '& > div': {
      borderTop: '1px solid gray',
      width: '50%',
      display: 'inline-grid',
      fontSize: '18px',
      '& > :first-child': {
        fontWeight: 600,
      }
    }
  },
  info: {
    display: 'flex',
    margin: '20px 0',
    '& > div': {
      display: 'flex',
      width: '50%',
      justifyContent: 'center',
      '& > svg': {
        fill: 'gray',
        marginRight: '4px'
      }
    }
  },
  headerButtons: {
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: '10px',
    '& > button': {
      display: 'flex',
      '& > svg': {
        width: '18px',
        height: '18px',
        margin: '2px 4px 0 0'
      }
    }
  }
});

const localStore = new LocalStorage();

const UserModal = (props) => {
  let history = useHistory();
  const [isAddFavorite, setIsAddFavorite] = useState(false);

  const { visible } = props;

  useEffect(() => {
    const userList = localStore.getFavoriteUserList().some((x) => x.id === props.userDetails.id)
    setIsAddFavorite(!userList);
  })

  const handleCancel = () => {
    props.toggleUserModal();
  };

  const goToFavorite = (user) => {
    history.push('/favorite')
  }

  const addToFavoriteList = (user) => {
    localStore.setFavoriteUser(user);
    setIsAddFavorite(false);
  }

  const removeFromFavorite = (user) => {
    localStore.removeFavoriteUser(user)
    setIsAddFavorite(true);
  }

  const classes = useStyles();

  return (
    <>
      <Modal
        title="User Details"
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={classes.headerButtons}>
          <AntdButton type="primary" htmlType="submit" onClick={() => goToFavorite(props.userDetails)}>
            Go to favorites list
          </AntdButton>
          <AntdButton type="primary" danger htmlType="submit" onClick={() => isAddFavorite ? addToFavoriteList(props.userDetails) : removeFromFavorite(props.userDetails)}>
            {isAddFavorite ?
              <>
                <FavoriteIcon />
                Add to favorite
              </>
              : <>Remove from favorite</>}
          </AntdButton>
        </div>
        <Card className={classes.root}>
          <CardActionArea>
            <div className={classes.cardMedia}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="\backgroundImage.jpg"
                title="Contemplative Reptile"
              />
              <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                <Avatar alt="Profile Picture" src={props.userDetails.avatar} />
              </Fab>
            </div>
            <Typography gutterBottom variant="h5" component="h2" className={classes.userName}>
              {props.userDetails.first_name}
              {' '}
              {props.userDetails.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </Typography>
            <div className={classes.info}>
              <div><LocationOnIcon />Hungary</div>
              <div><EmailIcon />Send E-mail</div>
            </div>
            <div className={classes.followDetails}>
              <div><span>8100</span><span>Followers</span></div>
              <div><span>3650</span><span>Following</span></div>
            </div>
          </CardActionArea>
          <Button size="medium" color="primary" className={classes.followButton}>
            Follow
          </Button>
        </Card>
      </Modal>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)
