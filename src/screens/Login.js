import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleLogin = async (e) => {
    e.preventDefault();
    let login = await axios.post('http://localhost:3001/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        localStorage.setItem('token', response.data);
        this.props.history.push('/admin/dashboard');
      })
      .catch((error) => {
        alert(error);
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <div className='login-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
        </Header>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e) => this.setState({ username: e.target.value })} />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

                <Button color='teal' fluid size='large'>
                  Login
            </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;