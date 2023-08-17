import { Logger } from 'log4js';
import { tap } from 'rxjs';

export const tapLog = (logger: Logger, value?: string) => {
  return tap((item) => {
    if (value) {
      return logger.info(value);
    }
    return item ? logger.info(`result is =`, item) : logger.info(value);
  });
};
