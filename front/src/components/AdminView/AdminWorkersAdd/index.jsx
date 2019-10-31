import React, { useState } from 'react';
import Title from '../../shared/Title';
import InputControl from '../../shared/InputControl';
import Input from '../../shared/Input';
import InputPlaceholder from '../../shared/InputPlaceholder';
import FormButton from '../../shared/buttons/formButton/FormButton';
import FormButtonContainer from '../../shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from '../../shared/buttons/formButton/FormButtonWrapper';

import { connect } from 'react-redux';
import { addUser } from '../../../actions/adminMenuActions';
import { setMessage } from '../../../actions/flashActions';

import { formatMessage } from '../../../utils/utils';

const AdminWorkersAdd = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function addNewUser(e) {
    e.preventDefault();
    const data = await props.addUser({ username, password });
    Object.keys(data.payload).forEach(key => {
      console.log(key);
    });
    if (data.payload.status === 201) {
      console.log(props.flashMessage);
      const flashMessage = {
        type: 'success',
        content: 'Successfully Added!'
      };
      props.setMessage(flashMessage);
    } else {
      let message = '';
      if (data.payload.status === 400) {
        message = 'Bad Request!';
      } else if (data.payload.status === 409) {
        message = 'Already Exists!';
      } else if (data.payload.status === 502) {
        message = 'Server is down, cannot perform this action!';
      } else {
        message = 'Opps! Something went wrong!';
      }
      props.setMessage({ type: 'error', message });
    }
  }

  return (
    <div style={styles.container}>
      {props.message ? formatMessage(props.message) : null}
      <Title title="Add Worker" />
      <form onSubmit={addNewUser} style={styles.form}>
        <InputControl>
          <Input
            onChange={e => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
          />
          <InputPlaceholder placeholder="Username" />
        </InputControl>
        <InputControl>
          <Input
            onChange={e => setPassword(e.target.value)}
            name="pass"
            id="pass"
          />
          <InputPlaceholder placeholder="Password" />
        </InputControl>

        <FormButtonContainer>
          <FormButtonWrapper>
            <FormButton>Add User</FormButton>
          </FormButtonWrapper>
        </FormButtonContainer>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    padding: '1rem 4rem'
  }
};

const mapStateToProps = state => ({
  flashMessage: state.flashReducer.flashMessage
});

const mapDispatchToProps = dispatch => ({ addUser, setMessage });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWorkersAdd);
