import React, { useState } from "react";
import Title from "../../shared/Title";
import InputControl from "../../shared/InputControl";
import Input from "../../shared/Input";
import InputPlaceholder from "../../shared/InputPlaceholder";
import FormButton from "../../shared/buttons/formButton/FormButton";
import FormButtonContainer from "../../shared/buttons/formButton/FormButtonContainer";
import FormButtonWrapper from "../../shared/buttons/formButton/FormButtonWrapper";

import { connect } from "react-redux";
import { addUser } from "../../../actions/adminMenuActions";
// import { setMessage } from '../../../actions/flashActions';

import { formatMessage } from "../../../utils/utils";

const AdminWorkersAdd = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState(null);

  async function addNewUser(e) {
    e.preventDefault();
    e.persist();

    const data = await props.addUser({
      username,
      password,
      firstName,
      lastName
    });
    console.log(data);
    Object.keys(data.payload).forEach(key => {
      console.log(key);
    });
    if (data.payload.status === 201) {
      console.log(props.flashMessage);
      const flashMessage = {
        type: "success",
        message: "Successfully Added!"
      };
      e.target.reset();
      //clearInputs();
      //e.target.submit();

      setMessage(flashMessage);
    } else {
      let message = "";
      if (data.payload.status === 400) {
        message = "Bad Request!";
      } else if (data.payload.status === 409) {
        message = "Already Exists!";
      } else if (data.payload.status === 502) {
        message = "Server is down, cannot perform this action!";
      } else {
        message = "Opps! Something went wrong!";
      }
      setMessage({ type: "error", message: message });
    }
  }

  function clearInputs() {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  console.log(`Username is => ${username}`);

  React.useEffect(() => {}, [username, password, firstName, lastName]);

  return (
    <div style={styles.container}>
      {formatMessage(message)}
      <Title title="Add Worker" />
      <form onSubmit={addNewUser} style={styles.form}>
        <InputControl>
          <Input
            onChange={e => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            value={username}
          />
          <InputPlaceholder placeholder="Username" />
        </InputControl>
        <InputControl>
          <Input
            onChange={e => setPassword(e.target.value)}
            name="pass"
            id="pass"
            value={password}
          />
          <InputPlaceholder placeholder="Password" />
        </InputControl>
        <InputControl>
          <Input
            onChange={e => setFirstName(e.target.value)}
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
          />
          <InputPlaceholder placeholder="First name" />
        </InputControl>
        <InputControl>
          <Input
            onChange={e => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
          />
          <InputPlaceholder placeholder="Last Name" />
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
    display: "flex",
    flexDirection: "column"
  },
  form: {
    padding: "1rem 4rem"
  }
};

const mapStateToProps = state => ({
  flashMessage: state.flashReducer.flashMessage
});

const mapDispatchToProps = dispatch => ({ addUser });
export default connect(mapStateToProps, mapDispatchToProps)(AdminWorkersAdd);
