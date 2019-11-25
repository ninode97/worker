import React from 'react';
import Title from '../../../shared/Title';
import './styles.css';
import { onFileUploadButtonClick } from '../../../../utils/helpers';
import ProgressRing from '../../../shared/ProgressRing';
import axios from 'axios';

function onClickHandler(event, fileInputId, state) {
  const { setError, setProgress, comment } = state;
  setError(null);
  const data = new FormData();
  data.append('file', document.getElementById(fileInputId).files[0]);
  data.append('comment', comment);
  data.append('submisionType', 'start');
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
      setProgress(100);
      setError(err.message);
    });
}

const StartWork = () => {
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [comment, setComment] = React.useState(null);
  console.log(comment);
  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="Start Work" />
      <hr />
      <p>Attach photo </p>
      <div>
        {progress === 100 ? (
          <div style={{ color: 'green' }}>Uploaded Successfully</div>
        ) : null}
        {error ? <div style={{ color: 'red' }}>{error}</div> : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center'
          }}
          className="file-upload"
        >
          <input
            style={{
              margin: '1rem',
              padding: '1.5rem',
              background: '#eee',
              borderRadius: '1rem'
            }}
            id="file"
            type="file"
            name="file"
            accept="image/*;capture=camera"
          ></input>

          <textarea
            onChange={e => setComment(e.target.value)}
            className="comment-box"
            placeholder="Add a comment..."
            style={{
              margin: '1rem',
              width: '90%',
              resize: 'none',
              height: 50,
              border: '1px solid gainsboro',
              borderRadius: '1rem'
            }}
          ></textarea>
          <button
            style={{
              margin: '1rem',
              padding: '1.5rem',
              background: '#eee',
              borderRadius: '1rem'
            }}
            type="button"
            className="btn btn-success btn-block"
            onClick={e =>
              onClickHandler(e, 'file', { setError, setProgress, comment })
            }
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
      </div>
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

export default StartWork;
