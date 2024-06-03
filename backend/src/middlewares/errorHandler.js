import { log } from 'mercedlogger';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    log.red('ERROR LOG ', new Date().toLocaleString());
    log.cyan(
        'Request:',
        JSON.stringify(req.method),
        JSON.stringify(req.originalUrl)
    );
    log.cyan('Params:', JSON.stringify(req.params));
    log.cyan('Body:', JSON.stringify(req.body));
    log.cyan('Query:', JSON.stringify(req.query));
    log.red('Error: ', JSON.stringify(err));
    log.red('Error stack: ', err.stack);
    log.yellow(
        '--------------------------------------------------------------------------------------'
    );

    const messageError = err.messageObject || err.message;
    // create format error response
    const error = {
        status: 'Error',
        error: messageError,
    };
    const status = err?.status || 400;
    res.status(status).json(error);
};

export default errorHandler;
