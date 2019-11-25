import React from 'react';
import { formatError } from '../../../utils/utils';
import ProgressRing from '../ProgressRing';
import axios from 'axios';

function onClickHandler(event, fileInputId, state) {
  const { setError, setProgress } = state;
  setError(null);
  const data = new FormData();
  data.append('file', document.getElementById(fileInputId).files[0]);
  let config = {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 79) / progressEvent.total
      );
      setProgress(percentCompleted);
    }
  };
  axios
    .put('https://workero.site/api/photos', data, config)
    .then(function(res) {
      setProgress(100);
    })
    .catch(function(err) {
      setProgress(25);
      setError(err.message);
    });
}

const FileUpload = props => {
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  return (
    <React.Fragment>
      {progress === 100 ? (
        <div style={{ color: 'green' }}>Uploaded Successfully</div>
      ) : null}
      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center'
        }}
        className="file-upload"
      >
        <input
          style={{
            padding: '1.5rem',
            background: '#eee',
            borderRadius: '1rem'
          }}
          id="file"
          type="file"
          name="file"
          accept="image/*;capture=camera"
        ></input>
        />
        <button
          style={{
            padding: '1.5rem',
            background: '#eee',
            borderRadius: '1rem'
          }}
          type="button"
          class="btn btn-success btn-block"
          onClick={e => onClickHandler(e, 'file', { setError, setProgress })}
        >
          Upload
        </button>
        <ProgressRing
          radius={20}
          stroke={4}
          progress={progress}
          color={error ? 'red' : 'green'}
        />
      </div>
    </React.Fragment>
  );
};

export default FileUpload;
