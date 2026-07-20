import { Schema, model } from "mongoose";
import Joi from "joi";
import type { ValidationResult } from "joi";

export interface EventSchemaType {
  eventId: string; // Correlation ID
  aggregateId?: string | null; // User ID / Video ID
  eventName: string;
  serviceName: string;
  eventTime: Date;
  eventVersion: number;
  payload: Record<string, unknown>;
}

const eventSchema = new Schema<EventSchemaType>(
  {
    eventId: {
      type: String,
      required: true,
      index: true,
    },

    aggregateId: {
      type: String,
      index: true,
    },

    eventName: {
      type: String,
      required: true,
      index: true,
    },

    serviceName: {
      type: String,
      required: true,
      index: true,
    },

    eventVersion: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    eventTime: {
      type: Date,
      required: true,
      index: true,
    },

    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

/*
|--------------------------------------------------------------------------
| Compound Indexes
|--------------------------------------------------------------------------
*/

eventSchema.index({
  aggregateId: 1,
  eventTime: -1,
});

eventSchema.index({
  eventId: 1,
  eventName: 1,
});

eventSchema.index({
  serviceName: 1,
  eventTime: -1,
});

eventSchema.index({
  aggregateId: 1,
  serviceName: 1,
});

/*
|--------------------------------------------------------------------------
| Joi Validation Schema
|--------------------------------------------------------------------------
*/

const joiSchema = Joi.object<EventSchemaType>({
  eventId: Joi.string().uuid().required(),

  aggregateId: Joi.optional(),

  eventName: Joi.string().trim().required(),

  serviceName: Joi.string().trim().required(),

  eventTime: Joi.date().required(),

  eventVersion: Joi.number().integer().min(1).default(1).required(),

  payload: Joi.object().required().unknown(true),
}).unknown(false);

const validateSchema = (
  data: Partial<EventSchemaType>,
): ValidationResult<EventSchemaType> => {
  return joiSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: false,
  });
};

const eventModel = model<EventSchemaType>("Event", eventSchema);

export { validateSchema };

export default eventModel;
