
import pino from 'pino';

const logger = pino({
    level: 'info',
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: { destination: 'error.log', level: 'error' }
            },
            {
                target: 'pino-pretty',
                options: { colorize: true }
            }
        ]
    }
});

export default logger;