# OTP Verification Project

This is a simple React-based project for OTP (One Time Password) verification with the following features:

## Features

- **Manual Entry and Pasting**: Users can manually enter each digit of the OTP or paste the entire code from the clipboard.
- **Auto-Focus**: Each input field accepts only one digit. Entering a digit automatically moves the focus to the next input field if available.
- **Submit and Verify**: Upon entering the OTP and clicking the submit button, the application sends a POST request to the server for verification.
- **Error Handling**: If the server returns an error, a "Verification Error" message is displayed on the page.
- **Successful Verification**: If the server response indicates a successful verification, the user is redirected to the `/success` route.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to the server.
- **Material-UI**: For styling the components.

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server by running `npm start`.

## File Structure

- `src/VerificationCode.js`: Main component handling OTP verification logic.
- `src/SuccessPage.js`: Component displayed on successful OTP verification.
- `src/index.js`: Entry point for the React application.
- `public/index.html`: HTML template for the application.
- `src/App.js`: Contains routing logic for the application.

## Testing

- Tests for the OTP verification functionality are written using React Testing Library and can be found in `src/VerificationCode.test.js`.

## License

This project is licensed under the MIT License.

