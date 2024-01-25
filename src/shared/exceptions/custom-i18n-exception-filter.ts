import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  I18nValidationException,
  I18nValidationExceptionFilter,
  I18nValidationExceptionFilterDetailedErrorsOption,
  I18nValidationExceptionFilterErrorFormatterOption,
} from 'nestjs-i18n';

/**
 * Custom exception filter that extends the base I18nValidationExceptionFilter.
 * This filter handles various types of exceptions, specifically focusing on
 * internationalized validation errors, standard HTTP exceptions ...etc .
 * It also provides a default case for unhandled exceptions.
 */
@Catch()
export class CustomI18nValidationExceptionFilter extends I18nValidationExceptionFilter {
  /**
   * Constructs the custom I18nValidationExceptionFilter.
   *
   * @param options Options for detailed errors or custom error formatting.
   */
  constructor(
    options?:
      | I18nValidationExceptionFilterDetailedErrorsOption
      | I18nValidationExceptionFilterErrorFormatterOption,
  ) {
    super(options);
  }

  /**
   * Catches exceptions thrown in the application.
   *
   * @param exception The exception object thrown.
   * @param host The arguments host providing context about the exception.
   * @returns The handled exception response.
   */
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // [1] I18N VALIDATION ERRORS
    if (exception instanceof I18nValidationException) {
      Logger.error(
        'I18N_VALIDATION_ERRORS',
        exception.message,
        exception.stack,
      );
      return super.catch(exception, host);
    }

    // [2] HTTP ERRORS
    else if (exception instanceof HttpException) {
      Logger.error('HTTP_ERRORS', exception.message);
      const status = exception.getStatus();
      return response.status(status).json({
        statusCode: status,
        error: exception.name,
        message: exception.message,
      });
    }

    // [3] UNHANDLED_ERRORS
    Logger.error('UNHANDLED_ERRORS', exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
}
