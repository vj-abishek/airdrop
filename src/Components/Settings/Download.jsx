import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import db from '../Channel/Chat/Utils/Settings.model';
import Toggle from './ToggleButtons';
import Styles from '../../Styles/responsive.module.css';

function Section({ uid }) {
  const [checked, setChecked] = useState(false);
  const [hasInDb, setHasInDb] = useState(false);

  useEffect(() => {
    try {
      db.uid
        .where('id')
        .equalsIgnoreCase(uid)
        .toArray()
        .then((data) => {
          if (data.length === 1 && data[0].autoDownload) {
            setChecked(data[0].autoDownload);
            setHasInDb(true);
            return;
          }
          if (data.length === 1 && data[0].autoDownload === undefined) {
            setChecked(false);
            setHasInDb(true);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, [checked, uid, hasInDb]);

  const Change = () => {
    if (hasInDb) {
      db.uid
        .update(uid, {
          id: uid,
          autoDownload: !checked,
        })
        .then(() => {
          setChecked(!checked);
        });
    } else {
      db.uid
        .add({
          id: uid,
          autoDownload: !checked,
        })
        .then(() => {
          setChecked(!checked);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {/* Notification Section */}

      <Toggle handleChange={Change} checked={checked} last>
        <div className="w-12 h-12 text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-7 h-7"
            height="24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-4.65 4.65c-.2.2-.51.2-.71 0L7 13h3V9h4v4h3z" />
          </svg>
        </div>
        <div className={`w-auto font-sans p-3 ${Styles.borderBorder} `}>
          <div className="text-white text-lg">
            <span>Auto Download</span>
          </div>
        </div>
      </Toggle>
    </>
  );
}

const mapStateToProps = (state) => ({
  uid: state.authReducer.user.uid,
});

export default connect(mapStateToProps)(Section);
