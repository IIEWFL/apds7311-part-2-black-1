import LoginAttempt from '../models/loginAttempt.js';

const loginAttemptLogger = (req, res, next) => {

    const originalJson = req.json;
    //request information about about request - could be body, id or address
    req.json = (data) => {
            const accountNumber = req.body.accountNumber
            // getting a clear IP address diffrent ways for all browser
            const ipAddress = req.ip || req.connection.remoteAddress
            // check if they were able to login
            const successfulLogin = !data.message || data.message !== 'Invalid Credentials'
        
            //crete login
            LoginAttempt.create({
                accountNumber,
                ipAddress,
                successfulLogin
            })
            .catch(err => console.error('Error logging login attempt:', err))
            originalJson.call(this, data);
    };
    next();
}
export default loginAttemptLogger;