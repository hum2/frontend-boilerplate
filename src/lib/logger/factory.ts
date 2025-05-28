import { Logger } from './logger';
import { LogLevel } from './types';

// プリセットロガーファクトリー
export const createHttpLogger = (logLevel?: LogLevel): Logger => {
    const envLogLevel = process.env.NEXT_PUBLIC_API_LOG_LEVEL as LogLevel;
    const level = logLevel || envLogLevel || 'none';
    return new Logger(level, 'HttpClient');
};

export const createAppLogger = (logLevel?: LogLevel): Logger => {
    const envLogLevel = process.env.NEXT_PUBLIC_APP_LOG_LEVEL as LogLevel;
    const level = logLevel || envLogLevel || 'none';
    return new Logger(level, 'App');
};

export const createCustomLogger = (prefix: string, logLevel?: LogLevel): Logger => {
    return new Logger(logLevel || 'none', prefix);
};
