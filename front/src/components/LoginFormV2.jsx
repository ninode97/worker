import React, { useState, useEffect } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';
import View from './View';
import Title from './shared/Title';
import LogoImage from './shared/LogoImage';

import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import Limiter from './shared/Limiter';
import Container from './shared/Container';
import Wrapper from './shared/Wrapper';
import FlexColumn from './shared/FlexColumn';
import InputControl from './shared/InputControl';
import Input from './shared/Input';
import InputPlaceholder from './shared/InputPlaceholder';
import FormButtonContainer from './shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from './shared/buttons/formButton/FormButtonWrapper';
import FormButtonGradient from './shared/buttons/formButton/FormButtonGradient';
import FormButton from './shared/buttons/formButton/FormButton';

function formatError(error) {
  if (error) {
    return (
      <div style={styles.error} className="view_error">
        {error.error}
      </div>
    );
  }
  return null;
}

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {}, [error]);
  const signInHandler = async e => {
    e.preventDefault();

    props.login({ username, password }).then(
      console.log(username),
      // res => window.location.reload(),
      err => {
        console.log(err);
        setError({ error: 'saddly' });
      }
    );
  };

  return (
    <Limiter>
      <View className="login-view">
        <Wrapper>
          {formatError(error)}
          <FlexColumn>
            <Title style={styles.title} title="Welcome" />
            <LogoImage style={styles.logoIcon} className="zmdi zmdi-font" />
            <form onSubmit={signInHandler}>
              <InputControl>
                <Input
                  onChange={e => setUsername(e.target.value)}
                  style={styles.input}
                  type="text"
                  name="username"
                  id="username"
                />
                <InputPlaceholder placeholder="Username" />
              </InputControl>
              <InputControl>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-show-pass"
                >
                  <i className="zmdi zmdi-eye"></i>
                </span>
                <Input
                  onChange={e => setUsername(e.target.value)}
                  style={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  name="pass"
                  id="pass"
                />
                <InputPlaceholder placeholder="Password" />
              </InputControl>

              <FormButtonContainer>
                <FormButtonWrapper>
                  <FormButton>Login</FormButton>
                </FormButtonWrapper>
              </FormButtonContainer>
            </form>
            <div className="text-center p-t-115">
              <span className="txt1">Don’t have an account?</span>

              <a className="txt2" href="/contact">
                Sign Up
              </a>
            </div>
          </FlexColumn>
        </Wrapper>
      </View>
    </Limiter>
  );
};

const styles = {
  title: {
    fontSize: '3.5rem',
    fontWeight: '800'
  },
  logoIcon: {
    fontSize: '5rem',
    padding: '2rem 0 4rem 0'
  },
  input: {
    // background: '#111',
    // border: '1px solid red'
  },
  error: {
    fontSize: '1.5rem',
    color: 'red'
  }
};
export default connect(
  null,
  { login }
)(LoginForm);
