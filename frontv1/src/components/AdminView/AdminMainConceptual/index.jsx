import React from 'react';
import Title from '../../shared/Title';
import PhotoRecords from './PhotoRecords';
import './styles.css';

const data = {
  recrods: [
    {
      id: 1,
      username: 'lukas_pabijonavicius',
      date: '2019/11/01 20:55',
      image:
        'https://i.pinimg.com/originals/54/6c/dc/546cdcd1159ca21a8c4d4b7eb96fa344.jpg',
      country: 'Norway',
      city: 'Oslo',
      comments: [
        {
          id: 1,
          username: 'lukas_pabijonavicius',
          comment:
            'Everything went smoothly, good day, good teammates, good owners happy to work here!'
        },
        {
          id: 2,
          username: 'admin',
          comment: 'Alright, Well Done!'
        }
      ]
    },
    {
      id: 2,
      username: 'gediminas_lankanas',
      date: '2019/11/02 19:42',
      image:
        'https://orientalhousetop.com/wp-content/uploads/2018/04/additional_services_work1.png',
      country: 'Norway',
      city: 'Oslo',
      comments: [
        {
          id: 1,
          username: 'lukas_pabijonavicius',
          comment: 'Everything went smoothly'
        },
        {
          id: 2,
          username: 'admin',
          comment: 'Alright, Well Done!'
        }
      ]
    }
  ]
};

const AdminMainConceptual = () => {
  return (
    <div className="admin-main__contents" style={styles.container}>
      <Title title="Latest Uploads" />
      <hr />

      <div style={styles.photoContainer}>
        <PhotoRecords records={data.recrods} />
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  photoContainer: {
    height: '450px',
    overflowY: 'scroll',
    background: '#FAFAFA'
  }
};

export default AdminMainConceptual;
