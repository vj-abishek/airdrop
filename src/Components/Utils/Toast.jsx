import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { sentNotification } from '../../Store/Actions/Login';

const Toast = ({ aerror, ferror, smessage, nuser, noti, sent }) => {
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
      if (!noti) {
        const obj = {
          message: 'Welcome to Relp. Invite your friend to get started',
        };
        addToast(obj.message, {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 6000,
        });
        sent();
      }
    }
  }, [ferror, aerror, smessage, nuser, addToast, noti, sent]);

  return null;
};

const mapStateToProps = (state) => ({
  aerror: state.authReducer.error,
  ferror: state.firestoreReducer.error,
  smessage: state.firestoreReducer.message,
  nuser: state.authReducer.isnewUser,
  noti: state.authReducer.notified,
});

const mapDispatchToProps = (dispatch) => ({
  sent: () => dispatch(sentNotification()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
