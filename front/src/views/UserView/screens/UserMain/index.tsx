import React from 'react';
import Title from '../../../../components/shared/Title';

const UserMain: React.FC = () => {
  return (
    <div className="visitor-container">
      <Title style={styles} title="User Menu" />
    </div>
  );
};

const styles = {
  margin: 0,
  padding: 0,
  fontSize: '2rem',
  fontWeight: 700
};

export default UserMain;
