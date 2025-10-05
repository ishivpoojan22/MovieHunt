

export const isCheckValidData = (email, password, name, isSignUp ) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  const isName = /^[A-Za-z][A-Za-z0-9'.\-\s]*$/.test(name);


  if (!isEmailValid) return "Email id not Valid";
  if (!isPasswordValid) return "Password is not Valid";
  if (isSignUp && !isName) return "Name is not Valid";
  


  return null;
};
