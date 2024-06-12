const fs = require('fs');
const path = require('path');
const { createLogger, transports, format } = require('winston');

class CustomLogger {
    constructor(name = 'custom_logger', level = 'debug', log_folder = 'logs', max_file_size = 5 * 1024 * 1024) {
        // Log dizinini kontrol et ve oluştur
        if (!fs.existsSync(log_folder)) {
            fs.mkdirSync(log_folder, { recursive: true });
        }

        const date_format = new Date().toLocaleDateString('en-US').replace(/\//g, '-');

        const log_file = path.join(log_folder, `${name}_${date_format}.log`);

        this.logger = createLogger({
            level: level,
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(info => `${info.timestamp} - ${info.level.toUpperCase()} - ${info.message}`)
            ),
            transports: [
                // new transports.File({ filename: log_file, maxsize: max_file_size, maxFiles: 5 }),
                new transports.Console()
            ]
        });
    }

    debug(message) {
        this.logger.debug(message);
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }

    fatal(message) {
        this.logger.error(message);
    }
}

// Creating a global instance of the CustomLogger
const logger = new CustomLogger('logger', 'debug', 'logs');

module.exports = { logger };
