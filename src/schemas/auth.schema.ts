import { JSONSchemaType } from "ajv";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerSchema: JSONSchemaType<RegisterInput> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 150,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 100,
    },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

export const loginSchema: JSONSchemaType<LoginInput> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 150,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 100,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};