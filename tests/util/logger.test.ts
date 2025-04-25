import { logger } from '../../src/util/logger';

jest.mock('../../src/util/logger');

describe('Logger', () => {
    it('should call info with the provided message', () => {
        const message = 'Test info message';
        logger.info(message);
        expect(logger.info).toHaveBeenCalledWith(message);
    });

    it('should call error with the provided message', () => {
        const message = 'Test error message';
        logger.error(message);
        expect(logger.error).toHaveBeenCalledWith(message);
    });

    it('should call debug with the provided message', () => {
        const message = 'Test debug message';
        logger.debug(message);
        expect(logger.debug).toHaveBeenCalledWith(message);
    });
});
