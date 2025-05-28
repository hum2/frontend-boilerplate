import { LogLevel } from './types';

// ログ管理クラス
export class Logger {
    private level: LogLevel;
    private isProduction: boolean;
    private prefix: string;

    constructor(level: LogLevel = 'none', prefix: string = 'App') {
        this.level = level;
        this.isProduction = process.env.NODE_ENV === 'production';
        this.prefix = prefix;
    }

    private shouldLog(targetLevel: LogLevel): boolean {
        if (this.isProduction && this.level === 'none') return false;

        const levels: Record<LogLevel, number> = {
            none: 0,
            error: 1,
            info: 2,
            debug: 3
        };

        return levels[this.level] >= levels[targetLevel];
    }

    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${this.prefix} ${level}] ${message}`;
    }

    error(message: string, data?: any): void {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('Error', message), data);
        }
    }

    info(message: string, data?: any): void {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('Info', message), data);
        }
    }

    debug(message: string, data?: any): void {
        if (this.shouldLog('debug')) {
            console.log(this.formatMessage('Debug', message), data);
        }
    }

    warn(message: string, data?: any): void {
        if (this.shouldLog('info')) {
            console.warn(this.formatMessage('Warn', message), data);
        }
    }
}
