import React, { useState } from "react";
import axios from "axios";
import Title from "../../shared/Title";
import InputControl from "../../shared/InputControl";
import Input from "../../shared/Input";
import ReadOnlyInput from "../../shared/ReadOnlyInput";
import InputPlaceholder from "../../shared/InputPlaceholder";
import FormButton from "../../shared/buttons/formButton/FormButton";
import FormButtonContainer from "../../shared/buttons/formButton/FormButtonContainer";
import FormButtonWrapper from "../../shared/buttons/formButton/FormButtonWrapper";
import { formatMessage } from "../../../utils/utils";
import { withRouter } from "react-router-dom";

const AdminWorkersUpdate = props => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [foundUser, setFoundUser] = useState(null);

  function findUser(e) {
    setMessage(null);
    e.preventDefault();
    axios
      .get(`https://workero.site/api/users/user/${username}`)
      .then(response => {
        if (response.data) {
          console.log(response);
          setFoundUser(response.data);
        } else {
          console.log(response);
          setMessage({ type: "error", message: "User was not found!" });
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          setMessage({ type: "error", message: "User was not found!" });
        } else if (error.response.status === 403) {
          setMessage({ type: "error", message: "You need to sign in!" });
        } else {
          console.log(error.response);
          setMessage({ type: "error", message: "Server is down!" });
        }
      });
  }

  React.useEffect(() => {
    console.log(foundUser);
    if (foundUser) {
      setUsername(foundUser.username);
      setRole(foundUser.role.role);
      setFirstName(foundUser.firstName);
      setLastName(foundUser.lastName);
      setIsBlocked(foundUser.isBlocked);
    }
  }, [foundUser]);

  function updateUser(e) {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      role: role,
      isBlocked: isBlocked
    };

    Object.keys(data).map(key => {
      if (data[key] === null || data[key] === "") delete data[key];
    });

    console.log(data);

    axios
      .put(`https://workero.site/api/users/${username}`, data)
      .then(response => {
        setUsername("");
        setPassword("");
        setRole("");
        setFirstName("");
        setLastName("");
        setFoundUser("");
        setIsBlocked(false);
        setMessage({ type: "success", message: "Successfully Updated!" });
        props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          //.setMessage({ type: "error", message: error.response.message[0] });
        }
        console.log(`RRESSxxS`);
        console.log(error.response);
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
              <p style={{ fontSize: "1.8rem" }} className="">
                Username:
                {foundUser.username === null ? "" : foundUser.username}
              </p>
            </InputControl>
            <InputControl>
              <input
                onChange={e => setFirstName(e.target.value)}
                className={`input`}
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
              />

              <InputPlaceholder placeholder="First Name" />
            </InputControl>
            <InputControl>
              <input
                onChange={e => setLastName(e.target.value)}
                className={`input`}
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
              />

              <InputPlaceholder placeholder="Last Name" />
            </InputControl>
            <InputControl>
              <Input
                onChange={e => setPassword(e.target.value)}
                type="text"
                name="password"
                id="password"
                value={password}
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
                value={role === null ? "" : role}
              />

              <InputPlaceholder placeholder="Role" />
            </InputControl>

            <div className="form-check">
              <input
                onChange={e => setIsBlocked(e.target.checked)}
                type="checkbox"
                className="form-check-input"
                id="isBlocked"
                checked={isBlocked}
              />
              <label className="form-check-label" htmlFor="isBlocked">
                Block user ?
              </label>
            </div>

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
    display: "flex",
    flexDirection: "column"
  },
  form: {
    padding: "1rem 4rem"
  }
};
export default withRouter(AdminWorkersUpdate);
