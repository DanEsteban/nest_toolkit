import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './env.validations';

export function validate(config: Record<string, unknown>) {
     const validatedConfig = plainToClass(EnvironmentVariables, config, {
          enableImplicitConversion: true,
     });
     const errors = validateSync(validatedConfig, {
          skipMissingProperties: false,
     });

     if (errors.length > 0) {
          throw new Error(
               `Config validation error: ${errors.map(error => error.toString()).join(', ')}`
          );
     }
     return validatedConfig;
}