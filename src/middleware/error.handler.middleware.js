import { ApplicationError } from '../../src/error-handler/applicationError.js';

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }else{
        console.error('Internal server error \n', err); // Log the error to the console for debugging
        res.status(500).send('Something went wrong at the server, please try again later');
        // Can also send the email to the developers to fix the error.
        // Can also log the 500 errors separately
    }

}

export default errorHandler;