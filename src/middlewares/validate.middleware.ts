import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
  allErrors: true,
});

addFormats(ajv);

export function validate<T>(
  schema: JSONSchemaType<T>
) {
  const validateSchema: ValidateFunction<T> = ajv.compile(schema);

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const valid = validateSchema(req.body);

    if (!valid) {
      res.status(400).json({
        message: "Datos de entrada inválidos",
        errors: validateSchema.errors,
      });

      return;
    }

    next();
  };
}