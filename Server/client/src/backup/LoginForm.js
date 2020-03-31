import React from 'react'
import {Button, Form, Grid,Header, Image, Message, Segment} from 'semantic-ui-react'
import Logo from './logo.svg';



const LoginForm= ()=> (
<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
  <Grid.Column style={{maxWidth:450}}>
    <Header as ='h2' color ='teal' textAlign='center'>
      < Image src = {Logo} /> Log-in to your account
      </Header>
    <Form size='large'>
      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='User Name' />
        < Form.Input
            fluid icon = 'lock'
            iconPosition = 'left'
            placeholder = 'Password'
            type='password'
        />
        <Button color='teal'fluid size='large'> Login </Button>
      </Segment>
    </Form>
    <Message>New To us? <a href ='./SignUp'>Sign Up </a> </Message>
  </Grid.Column>
</Grid>
)
export default LoginForm

