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
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
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

      {foundUser === null ? (
        <React.Fragment>
          <Title title="Find Worker" />
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Title title="Update Worker" />
          <form onSubmit={findUser} style={styles.form}>
            <InputControl>
              <Input
                onChange={e => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
              />
              <InputPlaceholder placeholder="Password" />
            </InputControl>
            <InputControl>
              <Input
                onChange={e => setPassword(e.target.value)}
                type="text"
                name="password"
                id="password"
              />
              <InputPlaceholder placeholder="Password" />
            </InputControl>
            <InputControl>
              <Input
                onChange={e => setRole(e.target.value)}
                type="text"
                name="role"
                id="role"
              />
              <InputPlaceholder placeholder="Role" />
            </InputControl>
            <FormButtonContainer>
              <FormButtonWrapper>
                <FormButton>Update User</FormButton>
              </FormButtonWrapper>
            </FormButtonContainer>
          </form>
        </React.Fragment>
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
