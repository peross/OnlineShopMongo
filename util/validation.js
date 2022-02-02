function isEmpty(value){
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password){
    return email &&
    email.includes('@') &&
    password &&
    password.trim().length >=6;
}


function userDetailsAreValid(email,password,name,surname,street,postal,city) {
  //to check if email is real we need to send test email
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(surname) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail){
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed,
};