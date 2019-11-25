import React from 'react';
import Title from '../../shared/Title';
import './styles.css';
import FormButton from '../../shared/buttons/formButton/FormButton';
import FormButtonContainer from '../../shared/buttons/formButton/FormButtonContainer';
import FormButtonWrapper from '../../shared/buttons/formButton/FormButtonWrapper';
import { Link } from 'react-router-dom';

const UserMain = () => {
  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="Submit Photo" />
      <hr />
      <div>
        You have not submited any photos today - {new Date().toUTCString()}
      </div>

      <Link style={{ textDecoration: 'none' }} to="works/start-work">
        <FormButtonContainer>
          <FormButtonWrapper>
            <FormButton>Start Work</FormButton>
          </FormButtonWrapper>
        </FormButtonContainer>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="works/end-work">
        <FormButtonContainer>
          <FormButtonWrapper>
            <FormButton>End Work</FormButton>
          </FormButtonWrapper>
        </FormButtonContainer>
      </Link>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem'
  }
};

export default UserMain;
