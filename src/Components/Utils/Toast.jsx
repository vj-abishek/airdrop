import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Toast = ({ aerror, ferror, smessage, nuser }) => {
  const { addToast } = useToasts();

  useEffect(() => {
    if (aerror) {
      addToast(aerror.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
    }
    if (ferror) {
      addToast(ferror.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
    }

    if (smessage) {
      addToast(smessage.message, {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
    }
    if (nuser) {
      const obj = {
        message: 'Welcome to SafeShare. Invite your friend to get started',
      };
      addToast(obj.message, {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
    }
  }, [ferror, aerror, smessage, nuser, addToast]);

  return null;
};

const mapStateToProps = (state) => ({
  aerror: state.authReducer.error,
  ferror: state.firestoreReducer.error,
  smessage: state.firestoreReducer.message,
  nuser: state.authReducer.isnewUser,
});

export default connect(mapStateToProps)(Toast);
