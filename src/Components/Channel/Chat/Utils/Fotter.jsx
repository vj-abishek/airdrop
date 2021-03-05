import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import sha1 from 'simple-sha1';
import { SendFile, SendFiles } from '../../../../Store/Actions/Peer';
import Styles from '../../../../Styles/responsive.module.css';
import Input from './Input';

function Fotter({ indicateFull, sendFile }) {
  const file = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [indicate, setIndicate] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const da =
      (indicateFull.get(id) && indicateFull.get(id).indication) || 'NO_CONTENT';
    setIndicate(da);
  }, [indicate, indicateFull, id]);

  const handleClick = () => {
    setShowEmoji(!showEmoji);
  };

  const addEmoji = (eji) => {
    setEmoji({ date: Date.now(), emoji: eji.native });
  };

  const handleClickFile = () => {
    file.current.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;

    const [FileList] = e.target.files;

    const shareID = sha1.sync(FileList.name + FileList.size);
    // sendInfo(shareID, channelId, FileList);
    const url = URL.createObjectURL(FileList);

    sendFile(FileList, url, shareID, id);
  };

  return (
    <>
      {showEmoji && (
        <Picker
          native
          className="z-10"
          style={{
            position: 'absolute',
            width: 'auto',
            maxWidth: '325px',
            bottom: 'calc(60px - 20px)',
            left: '4px',
          }}
          title="Pick your emoji…"
          emoji="point_up"
          theme="auto"
          emojiTooltip
          onSelect={addEmoji}
        />
      )}

      <div
        style={{
          border: '0px',
          borderTop: '1px solid rgba(50, 82, 88,0.49)',
          minHeight: '60px',
          transition: 'all 1s',
        }}
        className="bg-primary shadow-md sticky px-2 z-50 py-1 lg:px-3 bottom-0 w-full flex flex-row justify-between items-center "
      >
        <div className="flex flex-row items-center justify-around">
          <svg
            title="Pick a emoji"
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={`m-1 fill-current ${Styles.gray1} ${
              showEmoji && 'text-accent'
            }  ${
              !showEmoji && Styles.gray1
            }hover:text-accent cursor-pointer rounded-full`}
          >
            <path
              fill="currentCaolor"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            />
          </svg>
          <button type="button" title="Pick a file" onClick={handleClickFile}>
            <input type="file" ref={file} onChange={handleFileChange} hidden />
            <svg
              title="Send files"
              className={`${
                indicate === 'CONTENT' ? 'hidden' : 'block'
              } m-2 fill-current ${
                Styles.gray1
              } hover:text-accent cursor-pointer`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              />
            </svg>
          </button>
        </div>
        <Input emoji={emoji} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  indicateFull: state.messageReducer.data,
  channel: state.channelReducer.channels,
});

const mapDispatchToProps = (dispatch) => ({
  sendInfo: (shareID, channelId, FileList) =>
    dispatch(SendFiles(shareID, channelId, FileList)),
  sendFile: (FileList, url, shareID, id) =>
    dispatch(SendFile(FileList, url, shareID, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fotter);
