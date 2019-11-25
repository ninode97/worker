import React from 'react';
import Title from '../../../components/shared/Title';

const VisitorMain: React.FC = () => {
  return (
    <div className="visitor-container">
      <Title style={styles} title="Workero.site" />
    </div>
  );
};

const styles = {
  margin: 0,
  padding: 0,
  fontSize: '2rem',
  fontWeight: 700
};

export default VisitorMain;
