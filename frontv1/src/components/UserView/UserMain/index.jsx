import React from 'react';
import Title from '../../shared/Title';
import './styles.css';
import moment from 'moment';
import axios from 'axios';
import PhotoRecord from './PhotoRecord';

function renderPhotoRecords(records) {
  if (records.length > 0) {
    return records.map((record, index) => (
      <PhotoRecord key={`PhotoRecord-${index}`} record={record} />
    ));
  } else {
    return <div>There are currently no records!</div>;
  }
}

const UserMain = () => {
  const [hasError, setErrors] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format('YYYY-MM-DD')
  );

  React.useEffect(() => {
    axios
      .get(`https://workero.site/api/photos/${selectedDate}`)
      .then(res => {
        return Promise.all(
          res.data.map(async photo =>
            axios.get(photo.links.thumb).then(res => {
              photo.links.thumb = `data:image/jpg;base64 ,` + res.data;
              return photo;
            })
          )
        );
      })
      .then(res => {
        const sorted = res.sort(function(a, b) {
          return b.id - a.id;
        });

        setPhotos(sorted);
      });
  }, [selectedDate]);

  const date = new Date();
  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="UserMenu" />
      <hr />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '1rem',
          justifyContent: 'center',
          background: 'gainsboro'
        }}
      >
        <div>
          <input
            onChange={e => setSelectedDate(e.target.value)}
            type="date"
            defaultValue={selectedDate}
          />
        </div>
      </div>
      <div style={styles.photoContainer}>{renderPhotoRecords(photos)}</div>
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

export default UserMain;
