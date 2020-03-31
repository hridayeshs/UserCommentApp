import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import {Button, Form, Grid,Header, Image, Segment} from 'semantic-ui-react'
import Message from '../elements/Message';
import Error from '../elements/Error';
import Logo from './logo.jpg';
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from '../MessageBundle';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      user_name: this.state.user_name,
      password: this.state.password,
    };
    const loginResult = await LoginService(data);
    if (loginResult !== 200) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else
      this.setState({
        loginSuccess: true,
        error: false,
      });
  };

  render() {
    const { loginSuccess, error } = this.state;

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{maxWidth:450}}>
          <Header as ='h2' color ='teal' textAlign='center'>
            < Image src = {Logo} />
            <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '}
            </Header>
          <Form onSubmit={this.onSubmit} size='large'>
          <Segment stacked>
              <p> {COMMON_FIELDS.USER_NAME} </p>    {' '}
              <Form.input
                type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                iconPosition = 'left'
                required
              />
            {' '}
            {' '}
              {' '}
              <p> {COMMON_FIELDS.PASSWORD} </p>    {' '}
              <Form.input
                type="password"
                name="Password"
                fluid icon = 'lock'
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />{' '}
                  {' '}
                  {' '}
            {' '}

              {' '}
              <Button
              color='teal'
                type="button"
                onClick={this.onSubmit}
                fluid size = 'large'
                className="btn btn-primary"
              >
                {' '}
                  {LOGIN_FIELDS.LOGIN}    {' '}
              </Button>{' '}
                  <Link to="/register">
                     {REGISTRATION_FIELDS.REGISTER} </Link>  {' '}
               {' '}
            {' '}
               {' '}
          {' '}
           {' '}
        </Segment>{' '}
            {loginSuccess && <Message message={LOGIN_MESSAGE} />}    {' '}
        {error && <Error message={ERROR_IN_LOGIN} />}    {' '}
      </Form>
      </Grid.Column>
      </Grid>
    );
  }
}

