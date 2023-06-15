import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInActions } from '@src/redux/slices/auth/sign-in/sign-in.slice';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import '@styles/auth.css';

const StyledLink = styled(Link)`
  && {
    color: var(--primary--color);
    cursor: pointer;
    text-decoration: none !important;
    font-weight: bold;
  }
`;

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const signIn = () => {
    const signInAction = signInActions.signIn({
      request: { ...formData },
    });
    dispatch(signInAction);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    signIn();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="container">
        <div className="container-item">
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="input-field"
            autoComplete="off"
            required
          />
        </div>
        <div className="container-item">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field"
            autoComplete="off"
            required
          />
        </div>
        <div className="container-item">
          <Button variant="contained" type="submit" className="main-btn">
            Sign In
          </Button>
        </div>
        <div className="margin-top-1em">
          Not a member yet? <StyledLink to="/sign-up">Sign Up</StyledLink>{' '}
          today!
        </div>
      </div>
    </form>
  );
};

export default SignIn;
