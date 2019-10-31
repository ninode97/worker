import React, { useState } from 'react';
import Title from '../../shared/Title';
import InputControl from '../../shared/InputControl';
import Input from '../../shared/Input';
import InputPlaceholder from '../../shared/InputPlaceholder';
import FormButton from '../../shared/buttons/formButton/FormButton';
import FormButtonContainer from '../../shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from '../../shared/buttons/formButton/FormButtonWrapper';
import { formatMessage } from '../../../utils/utils';

const AdminWorkersUpdate = () => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');

  function findUser() {}

  return (
    <div style={styles.container}>
      {formatMessage(message)}
      <Title title="Add Worker" />
      <form onSubmit={findUser} style={styles.form}>
        <InputControl>
          <Input
            onChange={e => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
          />
          <InputPlaceholder placeholder="Username" />
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

export default AdminWorkersUpdate;
