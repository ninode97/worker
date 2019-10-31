import React, { useState } from 'react';
import View from './View';
import Title from './shared/Title';
import LogoImage from './shared/LogoImage';

import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { setError } from '../actions/errorActions';

import Limiter from './shared/Limiter';
import Wrapper from './shared/Wrapper';
import FlexColumn from './shared/FlexColumn';
import InputControl from './shared/InputControl';
import Input from './shared/Input';
import InputPlaceholder from './shared/InputPlaceholder';
import FormButtonContainer from './shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from './shared/buttons/formButton/FormButtonWrapper';
import FormButton from './shared/buttons/formButton/FormButton';

import { formatError } from '../utils/utils';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const signInHandler = async e => {
    e.preventDefault();

    props.login({ username, password }).then(console.log(props), err => {
      let msg = `Some error occurred! Please contact administrator!`;
      if (err.response) {
        if (err.response.status === 404) {
          msg = `Perhaps server is down?`;
        } else if (err.response.status === 401) {
          msg = `Wrong credentials!`;
        } else if (err.response.status === 400) {
          msg = `Perhaps server is down?`;
        }
      }
      props.setError(msg);
    });
  };
  return (
    <Limiter>
      <View className="login-view">
        <Wrapper>
          {formatError(props.error)}
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
                  onChange={e => setPassword(e.target.value)}
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

const mapStateToProps = state => ({
  error: state.errorReducer
});

export default connect(
  mapStateToProps,
  { login, setError }
)(LoginForm);
