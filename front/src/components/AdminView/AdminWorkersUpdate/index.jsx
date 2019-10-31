import React, { useState } from 'react';
import axios from 'axios';
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
  const [foundUser, setFoundUser] = useState(null);

  function findUser(e) {
    e.preventDefault();
    axios
      .post('https://workero.site/api/users', { username })
      .then(response => {
        if (response.data) {
          setFoundUser(response.data);
        } else {
          setFoundUser(null);
        }
      })
      .catch(error => {
        setMessage({ type: 'error', message: "Couldn't perform action!" });
      });
  }

  return (
    <div style={styles.container}>
      {formatMessage(message)}
      <Title title="Update Worker" />
      {foundUser === null ? (
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
              <FormButton>Find User</FormButton>
            </FormButtonWrapper>
          </FormButtonContainer>
        </form>
      ) : (
        <h1>UPDATE THE USER FIELDS!</h1>
      )}
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
