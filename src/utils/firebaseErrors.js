// utils/firebaseErrors.js
export const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    default:
      return "An error occurred. Please try again.";
  }
};
