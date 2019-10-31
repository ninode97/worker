import React, { useState } from 'react';
import axios from 'axios';
import Title from '../../shared/Title';
import InputControl from '../../shared/InputControl';
import Input from '../../shared/Input';
import ReadOnlyInput from '../../shared/ReadOnlyInput';
import InputPlaceholder from '../../shared/InputPlaceholder';
import FormButton from '../../shared/buttons/formButton/FormButton';
import FormButtonContainer from '../../shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from '../../shared/buttons/formButton/FormButtonWrapper';
import { formatMessage } from '../../../utils/utils';

const AdminWorkersUpdate = () => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [foundUser, setFoundUser] = useState(null);

  function findUser(e) {
    e.preventDefault();
    axios
      .post('https://workero.site/api/users', { username })
      .then(response => {
        if (response.data) {
          setFoundUser(response.data);
          setRole(response.data.role);
          console.log(response.data.role);
        } else {
          setFoundUser(null);
        }
      })
      .catch(error => {
        setMessage({ type: 'error', message: "Couldn't perform action!" });
      });
  }

  function updateUser(e) {
    e.preventDefault();
    const data = {
      password: password,
      role: role
    };

    axios
      .put(`https://workero.site/api/users/${username}`, data)
      .then(
        response => {
          setMessage({ type: 'success', message: 'Successfully Updated!' });
        },
        err => {
          setMessage({ type: 'error', message: 'Error Occurred!!' });
        }
      )
      .catch(error => {
        console.log(error);
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
          <form onSubmit={updateUser} style={styles.form}>
            <InputControl>
              <input
                onChane={() => {}}
                className={`input`}
                type="text"
                name="username"
                id="username"
                value={foundUser.username === null ? '' : foundUser.username}
              />

              <InputPlaceholder placeholder="Username" />
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
              <input
                onChange={e => setRole(e.target.value)}
                className={`input`}
                type="text"
                name="role"
                id="role"
                value={role === null ? '' : role}
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
