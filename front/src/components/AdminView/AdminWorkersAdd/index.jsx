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

const AdminWorkersAdd = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function addNewUser(e) {
    e.preventDefault();
    alert(`${username} = ${password}`);
    console.log(props.addUser());
  }

  return (
    <div style={styles.container}>
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
const mapDispatchToProps = dispatch => ({ addUser });
export default connect(mapDispatchToProps)(AdminWorkersAdd);
