// import { log } from 'mercedlogger';

const ResponseHandler = (res, data) => {
    // log.green('Response', data);
    res.status(200).json({ status: 'success', data: data });
};
export default ResponseHandler;
