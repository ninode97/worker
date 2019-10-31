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
    props.addUser({ username, password }).then(console.log(props), err => {
      alert(err);
    });

    // if (data.payload.status === 201) {
    //   const flashMessage = {
    //     type: 'success',
    //     content: 'Successfully Added!'
    //   };
    //   props.setMessage(flashMessage);
    // } else {
    //   let content = '';
    //   if (data.payload.status === 400) {
    //     content = 'Bad Request!';
    //   } else if (data.payload.status === 409) {
    //     content = 'Already Exists!';
    //   } else if (data.payload.status === 502) {
    //     content = 'Server is down, cannot perform this action!';
    //   } else {
    //     content = 'Opps! Something went wrong!';
    //   }
    //   props.setMessage({ type: 'error', content });
    //   console.log(props);
    // }
  }
  console.log(props.flashReducer);
  return (
    <div style={styles.container}>
      {props.flashReducer.flashMessage
        ? formatMessage(props.flashReducer.flashMessage)
        : null}
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
  flashReducer: state.flashReducer
});

const mapDispatchToProps = dispatch => ({ addUser, setMessage });
export default connect(
  mapStateToProps,
  { addUser, setMessage }
)(AdminWorkersAdd);
