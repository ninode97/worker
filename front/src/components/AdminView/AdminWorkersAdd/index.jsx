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

  async function addNewUser(e) {
    e.preventDefault();
    const data = await props.addUser({ username, password });
    Object.keys(data.payload).forEach(key => {
      console.log(key);
    });
    if (data.payload.response.code) {
    } else {
      let msg = '';
      if (data.payload.response.code === 400) {
        msg = 'Bad Request!';
      } else if (data.payload.response.code === 409) {
        msg = 'Already Exists!';
      } else if (data.payload.response.code === 502) {
        msg = 'Server is down, cannot perform this action!';
      } else {
        msg = 'Opps! Something went wrong!';
      }
      console.log(msg);
    }
    //   data => {
    //     console.log(data);
    //   },
    //   err => {
    //     let msg = `Some error occurred! Please contact administrator!`;
    //     if (err.response) {
    //       if (err.response.status === 404) {
    //         msg = `Perhaps server is down?`;
    //       } else if (err.response.status === 401) {
    //         msg = `Wrong credentials!`;
    //       } else if (err.response.status === 400) {
    //         msg = `Perhaps server is down?`;
    //       } else if (err.response.status === 409) {
    //         msg = `Username already exists in database`;
    //       }
    //     }
    //     console.log(msg);
    //     //props.setError(msg);
    //   }
    // );
    // props.addUser({ username, password }).then(res => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
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
