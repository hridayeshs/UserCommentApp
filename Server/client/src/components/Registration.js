import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import {UserRegistration,UsernameValidation} from '../services/RegistrationService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import classNames from 'classnames';
import {
  REGISTRATION_MESSAGE,
  ERROR_IN_REGISTRATION,
} from '../MessageBundle';

export default class Registration extends Component {
  constructor (props) {
    super (props);
    this.state = {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      register: false,
      error: false,
    };
  }

  handleOnChangeFirstName = e => {
    this.setState ({
      first_name: e.target.value,
    });
  };

  handleOnChangeLastName = e => {
    this.setState ({
      last_name: e.target.value,
    });
  };

  handleOnChangeUserName = e => {
    this.setState ({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };

  handleOnBlur = async e => {
    this.setState ({
      user_name: e.target.value,
    });
    const data = {
      user_name: this.state.user_name,
    };
    const isUsernameTaken = await UsernameValidation (data);

    isUsernameTaken === 204
      ? this.setState ({user_name_taken: true})
      : this.setState ({user_name_taken: false});
  };

  onSubmit = async e => {
    e.preventDefault ();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_name: this.state.user_name,
      password: this.state.password,
    };

    const registerStatus = await UserRegistration (data);
    if (registerStatus === 200) {
      this.setState ({
        first_name: '',
        last_name: '',
        user_name: '',
        password: '',
        register: true,
        error: false,
      });
    } else
      this.setState ({
        error: true,
        register: false,
      });
  };

  render () {
    const {register, error, user_name_taken} = this.state;

    return (
       <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'>
            Create a new account
          </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name' type="text"
                name="first_name"
                onChange={this.handleOnChangeFirstName}
                required />
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name' type="text"
                name="last_name"
                onChange={this.handleOnChangeLastName}
                required />
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type="text"
                className={classNames ({error: user_name_taken})}
                name="user_name"
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeUserName}
                required/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type="password"
                name="password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />
              <Button color='teal' fluid size='large' disabled={user_name_taken}>
                Register
              </Button>
            </Segment>
          </Form>
          {' '}
        {error && <Error message={ERROR_IN_REGISTRATION}/>}
        {' '}
        {register &&  <Message message={REGISTRATION_MESSAGE}/>}
        {register && setTimeout(function(){window.location.href='/?q=login';},1000)}

        {' '}
        </Grid.Column>
      </Grid>
    );
  }
}
