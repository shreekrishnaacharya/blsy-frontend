A simple project for OTP verification with following rules

- Users should be able to both manually enter the digits and paste the code from the
clipboard.
- Only one digit is allowed per input, entering a digit should automatically focus the
browser on the next input if any are left.
- After entering the code and clicking submit, the application should send a POST request
to the server and handle a success/error response.
- If the request results in an error, display a “Verification Error” message on the page
- If the request is successful, redirect the user to /success route.