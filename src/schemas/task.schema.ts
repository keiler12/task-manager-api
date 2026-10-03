import { JSONSchemaType } from "ajv";

export interface TaskInput {
  titulo: string;
  descripcion?: string | null;
  fecha_vencimiento: string;
  estado: "pendiente" | "en curso" | "completada";
}

export const taskSchema: JSONSchemaType<TaskInput> = {
  type: "object",
  properties: {
    titulo: {
      type: "string",
      minLength: 1,
      maxLength: 150,
    },
    descripcion: {
      type: "string",
      nullable: true,
      maxLength: 1000,
    },
    fecha_vencimiento: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    },
    estado: {
      type: "string",
      enum: ["pendiente", "en curso", "completada"],
    },
  },
  required: ["titulo", "fecha_vencimiento", "estado"],
  additionalProperties: false,
};