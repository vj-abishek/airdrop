import { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../Store/Actions/Login';

export const Logout = ({ out }) => {
  useEffect(() => {
    out();
  }, [out]);
  return null;
};

const mapDispatchToProps = (dispatch) => ({
  out: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
