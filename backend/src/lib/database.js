/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { log } from 'mercedlogger';

const ConnectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);
        mongoose.connection
            .on('open', () =>
                log.green('DATABASE STATE', 'Connection Open')
            )
            .on('close', () =>
                log.magenta('DATABASE STATE', 'Connection Close')
            )
            .on('error', (error) => log.red('DATABASE STATE', error));
        return connection;
    } catch (error) {
        throw new Error('Connect DB false.');
    }
};

export default ConnectDB;
