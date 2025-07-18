import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger" className="error-message">
      {message || 'An unexpected error occurred. Please try again later.'}
    </Alert>
  );
};

export default ErrorMessage;