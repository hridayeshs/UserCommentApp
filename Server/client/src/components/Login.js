import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
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
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />

              <Button color='teal' fluid size='large' onClick={this.onSubmit}>
                Login
              </Button>
            </Segment>
          </Form>
          {' '}
          {loginSuccess && <Message message={LOGIN_MESSAGE} />}    {' '}
          {error && <Error message={ERROR_IN_LOGIN} />}    {' '}
        </Grid.Column>
      </Grid>
    );
  }
}
