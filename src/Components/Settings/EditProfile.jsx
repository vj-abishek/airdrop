import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TextBox from './TextBox';
import { updateProfile } from '../../Store/Actions/Login';

function MyDialog({
 isOpen, setIsOpen, auth, submit,
}) {
    const [value, setValue] = useState(null);

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            setIsOpen(false);
            return;
        }

        submit(value, { uid: auth.user.uid });
        setIsOpen(false);
        console.log(value);
    };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed left-0  z-50 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay style={{ background: 'rgba(0,0,0,0.5)' }} className="fixed left-0 inset-0" />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="flex items-center justify-center min-h-screen"
        >

          <div className="bg-primary m-2 w-11/12 md:m-0 lg:w-2/5 p-5 rounded-lg absolute z-50">

            <Dialog.Title className="flex mb-2 font-bold justify-between">
              <div className="text-xl">Edit profile</div>
              <button type="button" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45 text-light">
                  <g clipPath="url(#clip12)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C8.55228 0 9 0.447715 9 1V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V1C7 0.447715 7.44772 0 8 0Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.000976562 8C0.000976562 7.44772 0.448692 7 1.00098 7H15.001C15.5533 7 16.001 7.44772 16.001 8C16.001 8.55228 15.5533 9 15.001 9H1.00098C0.448692 9 0.000976562 8.55228 0.000976562 8Z" />
                  </g>
                  <defs><clipPath id="cSlip12"><rect width="16" height="16" fill="white" /></clipPath></defs>
                </svg>
              </button>
            </Dialog.Title>
            {auth.update_error && (<p className="m-3 text-red-500">{auth.update_error}</p>)}

            <form onSubmit={handleSubmit}>
              <TextBox name="photoURL" value={auth.user.photoURL} label="Profile photo URL" onChange={onChange} />
              <TextBox name="displayName" value={auth.user.displayName || 'User'} label="Display Name" onChange={onChange} />
              {/* <TextBox name="user_Id" label="UserId" onChange={onChange} /> */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center px-8 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Save
                </button>

                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium underline ml-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </motion.div>

      </AnimatePresence>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
  });

const mapDispatchToProps = (dispatch) => ({
    submit: (data, uid) => dispatch(updateProfile(data, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDialog);
