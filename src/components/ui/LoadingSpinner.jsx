import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container text-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <p className="mt-3 text-muted">{text}</p>
    </div>
  );
};

export default LoadingSpinner;