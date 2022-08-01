import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { connect } from 'react-redux'
import UserList from './UserList'
import { useHistory } from "react-router-dom";

const Main = (props) => {
  let history = useHistory();

  const goToFavorite = () => {
    history.push('/favorite')
  }

  return (
    <div className='main'>
      <div>
        <h1>User Detail</h1>
        <div className='addUser'>
          <Button type="primary" onClick={goToFavorite}>
            Go to favorites list
          </Button>
        </div>
        <UserList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

