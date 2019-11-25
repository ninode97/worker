import React from 'react';
import PhotoRecord from '../PhotoRecord';
import PropTypes from 'prop-types';

function renderPhotoRecords(records) {
  if (records.length > 0) {
    return records.map((record, index) => (
      <PhotoRecord record={record} />
    ));
  } else {
    return <div>
      There are currently no records!
    </div>
  }
}


const PhotoRecords = (props) => {
  const { records } = props;
  return (
    <div className="photo-records">{renderPhotoRecords(records)}</div>

  )
}

PhotoRecords.propTypes = {
  records: PropTypes.array.isRequired
}

export default PhotoRecords;