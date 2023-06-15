import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { FetchStatusEnum } from '@services/fetch.type';
import { signUpActions } from '@redux/slices/auth/sign-up/sign-up.slice';
import { signUpSelector } from '@redux/slices/auth/sign-up/sign-up.selector';
import '@styles/auth.css';
const StyledLink = styled(Link)`
  && {
    color: var(--primary--color);
    cursor: pointer;
    text-decoration: none !important;
    font-weight: bold;
  }
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignUp = useSelector(signUpSelector.signUpFetchStatus);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [organization, setOrganization] = useState('');

  useEffect(() => {
    if (isSignUp === FetchStatusEnum.SUCCESS) {
      navigate('/sign-in');
    }
  }, [isSignUp, navigate]);

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      alert("Passwords don't match!");
      return;
    }

    const signUpAction = signUpActions.signUp({
      request: {
        username,
        password,
        organization,
      },
    });
    dispatch(signUpAction);
  };

  const renderTextField = (
    label: string,
    value: string,
    onChange: any,
    type = 'text'
  ) => (
    <div className="container-item">
      <TextField
        label={label}
        variant="outlined"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        required
      />
    </div>
  );

  return (
    <div className="container">
      {renderTextField('Username', username, setUsername)}
      {renderTextField('Password', password, setPassword, 'password')}
      {renderTextField(
        'Confirm Password',
        passwordConfirm,
        setPasswordConfirm,
        'password'
      )}
      {renderTextField(
        'Associated Organization',
        organization,
        setOrganization
      )}
      <div className="container-item">
        <Button variant="contained" onClick={handleSignUp} className="main-btn">
          Sign Up
        </Button>
      </div>
      <div className="margin-top-1em">
        Already have an account? <StyledLink to="/sign-in">SIGN IN</StyledLink>
      </div>
    </div>
  );
};
export default SignUp;
