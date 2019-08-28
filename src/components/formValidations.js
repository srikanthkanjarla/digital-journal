// validate username
export const validateUsername = username => {
  if (username === '' || username.length <= 3) {
    return 'Please enter a username ( minimum 3 characters )';
  }
  return null;
};
// validate email
export const validateEmail = email => {
  if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid Email address';
  }
  return null;
};

// validate password
export const validatepassword = password => {
  if (password === '' || password.length <= 5) {
    return 'Please Enter a password ( minimum 6 characters )';
  }
  return null;
};

// validate confirm password
export const validateConfirmPassword = (password1, password2) => {
  if (password1 !== '' && password1 !== password2) {
    return 'password and confirm password should be same';
  }
  return null;
};
