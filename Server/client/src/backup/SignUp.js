import React from 'react'
import ReactDOM from 'react-dom'
import {Button,Form,Grid,Header,Image,Message,Segment} from 'semantic-ui-react'
import Logo from './logo.svg';

class SignUpForm extends React.Component{
  render(){
    return(
  <Grid textAlign = 'center' style = {{height: '100vh'}} verticalAlign = 'middle' >
    <Grid.Column style = {{maxWidth: 450}}>
      <Header as = 'h2'color = 'teal'textAlign = 'center'>
        < Image src = {Logo}/> Sign-Up
        </Header>
        < Form size = 'large'>
          <Segment stacked>
            < Form.Input fluid icon = 'user' iconPosition = 'left' placeholder = 'User Name'/>
              < Form.Input
              fluid icon = 'lock'
              iconPosition = 'left'
              placeholder = 'Password'
              type = 'password' />
            < Button color = 'teal' fluid size = 'large' > Sign-Up </Button>
           </Segment>
          </ Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUpForm
