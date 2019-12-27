import React, { useState, useEffect } from "react";
import Title from "../../shared/Title";
import "./styles.css";
import FormButton from "../../shared/buttons/formButton/FormButton";
import FormButtonContainer from "../../shared/buttons/formButton/FormButtonContainer";
import FormButtonWrapper from "../../shared/buttons/formButton/FormButtonWrapper";
import { Link } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import axios from "axios";

const UserMain = () => {
  const [isWorkStarted, setIsWorkStarted] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // check if work started!
    axios
      .get("https://workero.site/api/workday/status")
      .then(res => {
        if (res.status === 200) {
          setIsWorkStarted(res.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        if (err.status) {
          console.log(err.status);
        }
        console.log(err);
        setError("Server is down! Contact administrator!");
        setIsLoading(false);
      });
  }, []);

  const loader = (
    <div style={styles.loader} className="loader">
      <LoadingSpin style={styles.loader} size="100px" />
      <span style={{ paddingTop: "3rem" }}>Loading...</span>
    </div>
  );

  const displayError = <React.Fragment>{error}</React.Fragment>;

  const displayBtns = (
    <React.Fragment>
      {isWorkStarted ? (
        <div className="end-work">
          <Link style={{ textDecoration: "none" }} to="works/attach-photo">
            <FormButtonContainer>
              <FormButtonWrapper>
                <FormButton>Attach Photo</FormButton>
              </FormButtonWrapper>
            </FormButtonContainer>
          </Link>
          <Link style={{ textDecoration: "none" }} to="works/end-work">
            <FormButtonContainer>
              <FormButtonWrapper>
                <FormButton>End Work</FormButton>
              </FormButtonWrapper>
            </FormButtonContainer>
          </Link>
        </div>
      ) : (
        <div className="start-work">
          <Link style={{ textDecoration: "none" }} to="works/start-work">
            <FormButtonContainer>
              <FormButtonWrapper>
                <FormButton>Start Work</FormButton>
              </FormButtonWrapper>
            </FormButtonContainer>
          </Link>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="Submit Photo" />
      <hr />
      {/* <div>
        You have not submited any photos today - {new Date().toUTCString()}
      </div> */}
      <div
        style={styles.workActionButtonContainer}
        className="work-action-buttons"
      >
        {isLoading ? loader : error ? displayError : displayBtns}
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem"
  },
  workActionButtonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  loader: {
    paddingTop: "5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center"
  }
};

export default UserMain;
