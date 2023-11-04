import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','stripeCustomerId','stripeSubscriptionId','stripePriceId','stripeCurrentPeriodEnd']);

export const FileScalarFieldEnumSchema = z.enum(['id','name','uploadStatus','url','key','createdAt','uploadedAt','userId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','text','isUserMessage','createdAt','uploadedAt','userId','fileId']);

export const RocketScalarFieldEnumSchema = z.enum(['id','createdAt','name','activeStage','activeChart','scaleSlider','userId']);

export const RocketStageScalarFieldEnumSchema = z.enum(['id','createdAt','stageIndex','rocketId']);

export const RocketPartScalarFieldEnumSchema = z.enum(['id','createdAt','stageId','part_type','name','image','diameter','length','weight','scale','width','height','scaled_width','scaled_height','targetStage','x','y']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UploadStatusSchema = z.enum(['PENDING','PROCESSING','FAILED','SUCCESS']);

export type UploadStatusType = `${z.infer<typeof UploadStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
  stripePriceId: z.string().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////

export const FileSchema = z.object({
  uploadStatus: UploadStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date(),
  uploadedAt: z.coerce.date(),
  userId: z.string().nullable(),
})

export type File = z.infer<typeof FileSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string().cuid(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date(),
  uploadedAt: z.coerce.date(),
  userId: z.string().nullable(),
  fileId: z.string().nullable(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// ROCKET SCHEMA
/////////////////////////////////////////

export const RocketSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string().nullable(),
  activeStage: z.number().int(),
  activeChart: z.string().nullable(),
  scaleSlider: z.number(),
  userId: z.string().nullable(),
})

export type Rocket = z.infer<typeof RocketSchema>

/////////////////////////////////////////
// ROCKET STAGE SCHEMA
/////////////////////////////////////////

export const RocketStageSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  stageIndex: z.number().int(),
  rocketId: z.string().nullable(),
})

export type RocketStage = z.infer<typeof RocketStageSchema>

/////////////////////////////////////////
// ROCKET PART SCHEMA
/////////////////////////////////////////

export const RocketPartSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  stageId: z.string().nullable(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().nullable(),
  length: z.number().nullable(),
  weight: z.number(),
  scale: z.number(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int(),
  x: z.number(),
  y: z.number(),
})

export type RocketPart = z.infer<typeof RocketPartSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Message: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  Rocket: z.union([z.boolean(),z.lazy(() => RocketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  File: z.boolean().optional(),
  Message: z.boolean().optional(),
  Rocket: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  stripeSubscriptionId: z.boolean().optional(),
  stripePriceId: z.boolean().optional(),
  stripeCurrentPeriodEnd: z.boolean().optional(),
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Message: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  Rocket: z.union([z.boolean(),z.lazy(() => RocketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FILE
//------------------------------------------------------

export const FileIncludeSchema: z.ZodType<Prisma.FileInclude> = z.object({
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FileArgsSchema: z.ZodType<Prisma.FileDefaultArgs> = z.object({
  select: z.lazy(() => FileSelectSchema).optional(),
  include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();

export const FileCountOutputTypeArgsSchema: z.ZodType<Prisma.FileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FileCountOutputTypeSelectSchema: z.ZodType<Prisma.FileCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const FileSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  uploadStatus: z.boolean().optional(),
  url: z.boolean().optional(),
  key: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  uploadedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  isUserMessage: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  uploadedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  fileId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileArgsSchema)]).optional(),
}).strict()

// ROCKET
//------------------------------------------------------

export const RocketIncludeSchema: z.ZodType<Prisma.RocketInclude> = z.object({
  stages: z.union([z.boolean(),z.lazy(() => RocketStageFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RocketCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RocketArgsSchema: z.ZodType<Prisma.RocketDefaultArgs> = z.object({
  select: z.lazy(() => RocketSelectSchema).optional(),
  include: z.lazy(() => RocketIncludeSchema).optional(),
}).strict();

export const RocketCountOutputTypeArgsSchema: z.ZodType<Prisma.RocketCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RocketCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RocketCountOutputTypeSelectSchema: z.ZodType<Prisma.RocketCountOutputTypeSelect> = z.object({
  stages: z.boolean().optional(),
}).strict();

export const RocketSelectSchema: z.ZodType<Prisma.RocketSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  activeStage: z.boolean().optional(),
  activeChart: z.boolean().optional(),
  scaleSlider: z.boolean().optional(),
  userId: z.boolean().optional(),
  stages: z.union([z.boolean(),z.lazy(() => RocketStageFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RocketCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROCKET STAGE
//------------------------------------------------------

export const RocketStageIncludeSchema: z.ZodType<Prisma.RocketStageInclude> = z.object({
  rocket: z.union([z.boolean(),z.lazy(() => RocketArgsSchema)]).optional(),
  parts: z.union([z.boolean(),z.lazy(() => RocketPartFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RocketStageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RocketStageArgsSchema: z.ZodType<Prisma.RocketStageDefaultArgs> = z.object({
  select: z.lazy(() => RocketStageSelectSchema).optional(),
  include: z.lazy(() => RocketStageIncludeSchema).optional(),
}).strict();

export const RocketStageCountOutputTypeArgsSchema: z.ZodType<Prisma.RocketStageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RocketStageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RocketStageCountOutputTypeSelectSchema: z.ZodType<Prisma.RocketStageCountOutputTypeSelect> = z.object({
  parts: z.boolean().optional(),
}).strict();

export const RocketStageSelectSchema: z.ZodType<Prisma.RocketStageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  stageIndex: z.boolean().optional(),
  rocketId: z.boolean().optional(),
  rocket: z.union([z.boolean(),z.lazy(() => RocketArgsSchema)]).optional(),
  parts: z.union([z.boolean(),z.lazy(() => RocketPartFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RocketStageCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROCKET PART
//------------------------------------------------------

export const RocketPartIncludeSchema: z.ZodType<Prisma.RocketPartInclude> = z.object({
  rocketStage: z.union([z.boolean(),z.lazy(() => RocketStageArgsSchema)]).optional(),
}).strict()

export const RocketPartArgsSchema: z.ZodType<Prisma.RocketPartDefaultArgs> = z.object({
  select: z.lazy(() => RocketPartSelectSchema).optional(),
  include: z.lazy(() => RocketPartIncludeSchema).optional(),
}).strict();

export const RocketPartSelectSchema: z.ZodType<Prisma.RocketPartSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  stageId: z.boolean().optional(),
  part_type: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  diameter: z.boolean().optional(),
  length: z.boolean().optional(),
  weight: z.boolean().optional(),
  scale: z.boolean().optional(),
  width: z.boolean().optional(),
  height: z.boolean().optional(),
  scaled_width: z.boolean().optional(),
  scaled_height: z.boolean().optional(),
  targetStage: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  rocketStage: z.union([z.boolean(),z.lazy(() => RocketStageArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stripeCustomerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripePriceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  File: z.lazy(() => FileListRelationFilterSchema).optional(),
  Message: z.lazy(() => MessageListRelationFilterSchema).optional(),
  Rocket: z.lazy(() => RocketListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripePriceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeCurrentPeriodEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  File: z.lazy(() => FileOrderByRelationAggregateInputSchema).optional(),
  Message: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  Rocket: z.lazy(() => RocketOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string()
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    id: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    id: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    email: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    email: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string(),
  }),
  z.object({
    stripeCustomerId: z.string(),
  }),
  z.object({
    stripeSubscriptionId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  stripePriceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  File: z.lazy(() => FileListRelationFilterSchema).optional(),
  Message: z.lazy(() => MessageListRelationFilterSchema).optional(),
  Rocket: z.lazy(() => RocketListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripePriceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeCurrentPeriodEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stripeCustomerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stripePriceId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const FileWhereInputSchema: z.ZodType<Prisma.FileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uploadStatus: z.union([ z.lazy(() => EnumUploadStatusFilterSchema),z.lazy(() => UploadStatusSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FileOrderByWithRelationInputSchema: z.ZodType<Prisma.FileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  uploadStatus: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FileWhereUniqueInputSchema: z.ZodType<Prisma.FileWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uploadStatus: z.union([ z.lazy(() => EnumUploadStatusFilterSchema),z.lazy(() => UploadStatusSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const FileOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  uploadStatus: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional()
}).strict();

export const FileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uploadStatus: z.union([ z.lazy(() => EnumUploadStatusWithAggregatesFilterSchema),z.lazy(() => UploadStatusSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUserMessage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  File: z.union([ z.lazy(() => FileNullableRelationFilterSchema),z.lazy(() => FileWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  isUserMessage: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  File: z.lazy(() => FileOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUserMessage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  File: z.union([ z.lazy(() => FileNullableRelationFilterSchema),z.lazy(() => FileWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  isUserMessage: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isUserMessage: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fileId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RocketWhereInputSchema: z.ZodType<Prisma.RocketWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketWhereInputSchema),z.lazy(() => RocketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketWhereInputSchema),z.lazy(() => RocketWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  activeStage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  activeChart: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scaleSlider: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stages: z.lazy(() => RocketStageListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const RocketOrderByWithRelationInputSchema: z.ZodType<Prisma.RocketOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  activeChart: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stages: z.lazy(() => RocketStageOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RocketWhereUniqueInputSchema: z.ZodType<Prisma.RocketWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RocketWhereInputSchema),z.lazy(() => RocketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketWhereInputSchema),z.lazy(() => RocketWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  activeStage: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  activeChart: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scaleSlider: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stages: z.lazy(() => RocketStageListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const RocketOrderByWithAggregationInputSchema: z.ZodType<Prisma.RocketOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  activeChart: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RocketCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RocketAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RocketMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RocketMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RocketSumOrderByAggregateInputSchema).optional()
}).strict();

export const RocketScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RocketScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RocketScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  activeStage: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  activeChart: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scaleSlider: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RocketStageWhereInputSchema: z.ZodType<Prisma.RocketStageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketStageWhereInputSchema),z.lazy(() => RocketStageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketStageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketStageWhereInputSchema),z.lazy(() => RocketStageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageIndex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rocketId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rocket: z.union([ z.lazy(() => RocketNullableRelationFilterSchema),z.lazy(() => RocketWhereInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => RocketPartListRelationFilterSchema).optional()
}).strict();

export const RocketStageOrderByWithRelationInputSchema: z.ZodType<Prisma.RocketStageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageIndex: z.lazy(() => SortOrderSchema).optional(),
  rocketId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rocket: z.lazy(() => RocketOrderByWithRelationInputSchema).optional(),
  parts: z.lazy(() => RocketPartOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RocketStageWhereUniqueInputSchema: z.ZodType<Prisma.RocketStageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RocketStageWhereInputSchema),z.lazy(() => RocketStageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketStageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketStageWhereInputSchema),z.lazy(() => RocketStageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageIndex: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  rocketId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rocket: z.union([ z.lazy(() => RocketNullableRelationFilterSchema),z.lazy(() => RocketWhereInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => RocketPartListRelationFilterSchema).optional()
}).strict());

export const RocketStageOrderByWithAggregationInputSchema: z.ZodType<Prisma.RocketStageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageIndex: z.lazy(() => SortOrderSchema).optional(),
  rocketId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RocketStageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RocketStageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RocketStageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RocketStageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RocketStageSumOrderByAggregateInputSchema).optional()
}).strict();

export const RocketStageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RocketStageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RocketStageScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketStageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketStageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketStageScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketStageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  stageIndex: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rocketId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RocketPartWhereInputSchema: z.ZodType<Prisma.RocketPartWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketPartWhereInputSchema),z.lazy(() => RocketPartWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketPartWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketPartWhereInputSchema),z.lazy(() => RocketPartWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  part_type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diameter: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  length: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scale: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  targetStage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rocketStage: z.union([ z.lazy(() => RocketStageNullableRelationFilterSchema),z.lazy(() => RocketStageWhereInputSchema) ]).optional().nullable(),
}).strict();

export const RocketPartOrderByWithRelationInputSchema: z.ZodType<Prisma.RocketPartOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  part_type: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  diameter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  length: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  rocketStage: z.lazy(() => RocketStageOrderByWithRelationInputSchema).optional()
}).strict();

export const RocketPartWhereUniqueInputSchema: z.ZodType<Prisma.RocketPartWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RocketPartWhereInputSchema),z.lazy(() => RocketPartWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketPartWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketPartWhereInputSchema),z.lazy(() => RocketPartWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  part_type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diameter: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  length: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scale: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  targetStage: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rocketStage: z.union([ z.lazy(() => RocketStageNullableRelationFilterSchema),z.lazy(() => RocketStageWhereInputSchema) ]).optional().nullable(),
}).strict());

export const RocketPartOrderByWithAggregationInputSchema: z.ZodType<Prisma.RocketPartOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  part_type: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  diameter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  length: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RocketPartCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RocketPartAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RocketPartMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RocketPartMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RocketPartSumOrderByAggregateInputSchema).optional()
}).strict();

export const RocketPartScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RocketPartScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RocketPartScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketPartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketPartScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketPartScalarWhereWithAggregatesInputSchema),z.lazy(() => RocketPartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  stageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  part_type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  diameter: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  length: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  scale: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  width: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  scaled_width: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  scaled_height: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  targetStage: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Message: z.lazy(() => MessageCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Message: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Message: z.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Message: z.lazy(() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileCreateInputSchema: z.ZodType<Prisma.FileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutFileInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFileInputSchema).optional()
}).strict();

export const FileUncheckedCreateInputSchema: z.ZodType<Prisma.FileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutFileInputSchema).optional()
}).strict();

export const FileUpdateInputSchema: z.ZodType<Prisma.FileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutFileNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutFileNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateInputSchema: z.ZodType<Prisma.FileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutFileNestedInputSchema).optional()
}).strict();

export const FileCreateManyInputSchema: z.ZodType<Prisma.FileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const FileUpdateManyMutationInputSchema: z.ZodType<Prisma.FileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutMessageInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  fileId: z.string().optional().nullable()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutMessageNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  fileId: z.string().optional().nullable()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketCreateInputSchema: z.ZodType<Prisma.RocketCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  stages: z.lazy(() => RocketStageCreateNestedManyWithoutRocketInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutRocketInputSchema).optional()
}).strict();

export const RocketUncheckedCreateInputSchema: z.ZodType<Prisma.RocketUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  userId: z.string().optional().nullable(),
  stages: z.lazy(() => RocketStageUncheckedCreateNestedManyWithoutRocketInputSchema).optional()
}).strict();

export const RocketUpdateInputSchema: z.ZodType<Prisma.RocketUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.lazy(() => RocketStageUpdateManyWithoutRocketNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutRocketNestedInputSchema).optional()
}).strict();

export const RocketUncheckedUpdateInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stages: z.lazy(() => RocketStageUncheckedUpdateManyWithoutRocketNestedInputSchema).optional()
}).strict();

export const RocketCreateManyInputSchema: z.ZodType<Prisma.RocketCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const RocketUpdateManyMutationInputSchema: z.ZodType<Prisma.RocketUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketStageCreateInputSchema: z.ZodType<Prisma.RocketStageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  rocket: z.lazy(() => RocketCreateNestedOneWithoutStagesInputSchema).optional(),
  parts: z.lazy(() => RocketPartCreateNestedManyWithoutRocketStageInputSchema).optional()
}).strict();

export const RocketStageUncheckedCreateInputSchema: z.ZodType<Prisma.RocketStageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  rocketId: z.string().optional().nullable(),
  parts: z.lazy(() => RocketPartUncheckedCreateNestedManyWithoutRocketStageInputSchema).optional()
}).strict();

export const RocketStageUpdateInputSchema: z.ZodType<Prisma.RocketStageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rocket: z.lazy(() => RocketUpdateOneWithoutStagesNestedInputSchema).optional(),
  parts: z.lazy(() => RocketPartUpdateManyWithoutRocketStageNestedInputSchema).optional()
}).strict();

export const RocketStageUncheckedUpdateInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rocketId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => RocketPartUncheckedUpdateManyWithoutRocketStageNestedInputSchema).optional()
}).strict();

export const RocketStageCreateManyInputSchema: z.ZodType<Prisma.RocketStageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  rocketId: z.string().optional().nullable()
}).strict();

export const RocketStageUpdateManyMutationInputSchema: z.ZodType<Prisma.RocketStageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketStageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rocketId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketPartCreateInputSchema: z.ZodType<Prisma.RocketPartCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  rocketStage: z.lazy(() => RocketStageCreateNestedOneWithoutPartsInputSchema).optional()
}).strict();

export const RocketPartUncheckedCreateInputSchema: z.ZodType<Prisma.RocketPartUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageId: z.string().optional().nullable(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional()
}).strict();

export const RocketPartUpdateInputSchema: z.ZodType<Prisma.RocketPartUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rocketStage: z.lazy(() => RocketStageUpdateOneWithoutPartsNestedInputSchema).optional()
}).strict();

export const RocketPartUncheckedUpdateInputSchema: z.ZodType<Prisma.RocketPartUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketPartCreateManyInputSchema: z.ZodType<Prisma.RocketPartCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageId: z.string().optional().nullable(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional()
}).strict();

export const RocketPartUpdateManyMutationInputSchema: z.ZodType<Prisma.RocketPartUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketPartUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RocketPartUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FileListRelationFilterSchema: z.ZodType<Prisma.FileListRelationFilter> = z.object({
  every: z.lazy(() => FileWhereInputSchema).optional(),
  some: z.lazy(() => FileWhereInputSchema).optional(),
  none: z.lazy(() => FileWhereInputSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const RocketListRelationFilterSchema: z.ZodType<Prisma.RocketListRelationFilter> = z.object({
  every: z.lazy(() => RocketWhereInputSchema).optional(),
  some: z.lazy(() => RocketWhereInputSchema).optional(),
  none: z.lazy(() => RocketWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const FileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RocketOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  stripePriceId: z.lazy(() => SortOrderSchema).optional(),
  stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  stripePriceId: z.lazy(() => SortOrderSchema).optional(),
  stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  stripePriceId: z.lazy(() => SortOrderSchema).optional(),
  stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumUploadStatusFilterSchema: z.ZodType<Prisma.EnumUploadStatusFilter> = z.object({
  equals: z.lazy(() => UploadStatusSchema).optional(),
  in: z.lazy(() => UploadStatusSchema).array().optional(),
  notIn: z.lazy(() => UploadStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => NestedEnumUploadStatusFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const FileCountOrderByAggregateInputSchema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  uploadStatus: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  uploadStatus: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMinOrderByAggregateInputSchema: z.ZodType<Prisma.FileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  uploadStatus: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUploadStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUploadStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UploadStatusSchema).optional(),
  in: z.lazy(() => UploadStatusSchema).array().optional(),
  notIn: z.lazy(() => UploadStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => NestedEnumUploadStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUploadStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUploadStatusFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const FileNullableRelationFilterSchema: z.ZodType<Prisma.FileNullableRelationFilter> = z.object({
  is: z.lazy(() => FileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FileWhereInputSchema).optional().nullable()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  isUserMessage: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  fileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  isUserMessage: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  fileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  isUserMessage: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  fileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const RocketStageListRelationFilterSchema: z.ZodType<Prisma.RocketStageListRelationFilter> = z.object({
  every: z.lazy(() => RocketStageWhereInputSchema).optional(),
  some: z.lazy(() => RocketStageWhereInputSchema).optional(),
  none: z.lazy(() => RocketStageWhereInputSchema).optional()
}).strict();

export const RocketStageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RocketStageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketCountOrderByAggregateInputSchema: z.ZodType<Prisma.RocketCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  activeChart: z.lazy(() => SortOrderSchema).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RocketAvgOrderByAggregateInput> = z.object({
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RocketMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  activeChart: z.lazy(() => SortOrderSchema).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketMinOrderByAggregateInputSchema: z.ZodType<Prisma.RocketMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  activeChart: z.lazy(() => SortOrderSchema).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketSumOrderByAggregateInputSchema: z.ZodType<Prisma.RocketSumOrderByAggregateInput> = z.object({
  activeStage: z.lazy(() => SortOrderSchema).optional(),
  scaleSlider: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const RocketNullableRelationFilterSchema: z.ZodType<Prisma.RocketNullableRelationFilter> = z.object({
  is: z.lazy(() => RocketWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RocketWhereInputSchema).optional().nullable()
}).strict();

export const RocketPartListRelationFilterSchema: z.ZodType<Prisma.RocketPartListRelationFilter> = z.object({
  every: z.lazy(() => RocketPartWhereInputSchema).optional(),
  some: z.lazy(() => RocketPartWhereInputSchema).optional(),
  none: z.lazy(() => RocketPartWhereInputSchema).optional()
}).strict();

export const RocketPartOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RocketPartOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketStageCountOrderByAggregateInputSchema: z.ZodType<Prisma.RocketStageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageIndex: z.lazy(() => SortOrderSchema).optional(),
  rocketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketStageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RocketStageAvgOrderByAggregateInput> = z.object({
  stageIndex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketStageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RocketStageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageIndex: z.lazy(() => SortOrderSchema).optional(),
  rocketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketStageMinOrderByAggregateInputSchema: z.ZodType<Prisma.RocketStageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageIndex: z.lazy(() => SortOrderSchema).optional(),
  rocketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketStageSumOrderByAggregateInputSchema: z.ZodType<Prisma.RocketStageSumOrderByAggregateInput> = z.object({
  stageIndex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RocketStageNullableRelationFilterSchema: z.ZodType<Prisma.RocketStageNullableRelationFilter> = z.object({
  is: z.lazy(() => RocketStageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RocketStageWhereInputSchema).optional().nullable()
}).strict();

export const RocketPartCountOrderByAggregateInputSchema: z.ZodType<Prisma.RocketPartCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageId: z.lazy(() => SortOrderSchema).optional(),
  part_type: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  diameter: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketPartAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RocketPartAvgOrderByAggregateInput> = z.object({
  diameter: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketPartMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RocketPartMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageId: z.lazy(() => SortOrderSchema).optional(),
  part_type: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  diameter: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketPartMinOrderByAggregateInputSchema: z.ZodType<Prisma.RocketPartMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  stageId: z.lazy(() => SortOrderSchema).optional(),
  part_type: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  diameter: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RocketPartSumOrderByAggregateInputSchema: z.ZodType<Prisma.RocketPartSumOrderByAggregateInput> = z.object({
  diameter: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  scale: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  scaled_width: z.lazy(() => SortOrderSchema).optional(),
  scaled_height: z.lazy(() => SortOrderSchema).optional(),
  targetStage: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const FileCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageCreateWithoutUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RocketCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RocketCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketCreateWithoutUserInputSchema).array(),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema),z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageCreateWithoutUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RocketUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RocketUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketCreateWithoutUserInputSchema).array(),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema),z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const FileUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FileUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageCreateWithoutUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RocketUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RocketUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketCreateWithoutUserInputSchema).array(),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema),z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RocketUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RocketUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RocketUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketScalarWhereInputSchema),z.lazy(() => RocketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageCreateWithoutUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RocketUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketCreateWithoutUserInputSchema).array(),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema),z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RocketUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RocketUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RocketUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketScalarWhereInputSchema),z.lazy(() => RocketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutFileInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutFileInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageCreateWithoutFileInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MessageUncheckedCreateNestedManyWithoutFileInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutFileInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageCreateWithoutFileInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumUploadStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUploadStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UploadStatusSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const MessageUpdateManyWithoutFileNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageCreateWithoutFileInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutFileInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutFileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutFileInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutFileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutFileInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutFileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutFileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFileInputSchema),z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutFileNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageCreateWithoutFileInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutFileInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutFileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutFileInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutFileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutFileInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutFileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMessageInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessageInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessageInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FileCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.FileCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => FileWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneWithoutMessageNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessageInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessageInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMessageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMessageInputSchema),z.lazy(() => UserUpdateWithoutMessageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessageInputSchema) ]).optional(),
}).strict();

export const FileUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.FileUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => FileUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FileUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => FileUpdateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const RocketStageCreateNestedManyWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageCreateNestedManyWithoutRocketInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageCreateWithoutRocketInputSchema).array(),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema),z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketStageCreateManyRocketInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRocketInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRocketInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRocketInputSchema),z.lazy(() => UserUncheckedCreateWithoutRocketInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRocketInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RocketStageUncheckedCreateNestedManyWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUncheckedCreateNestedManyWithoutRocketInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageCreateWithoutRocketInputSchema).array(),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema),z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketStageCreateManyRocketInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RocketStageUpdateManyWithoutRocketNestedInputSchema: z.ZodType<Prisma.RocketStageUpdateManyWithoutRocketNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageCreateWithoutRocketInputSchema).array(),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema),z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketStageUpsertWithWhereUniqueWithoutRocketInputSchema),z.lazy(() => RocketStageUpsertWithWhereUniqueWithoutRocketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketStageCreateManyRocketInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketStageUpdateWithWhereUniqueWithoutRocketInputSchema),z.lazy(() => RocketStageUpdateWithWhereUniqueWithoutRocketInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketStageUpdateManyWithWhereWithoutRocketInputSchema),z.lazy(() => RocketStageUpdateManyWithWhereWithoutRocketInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketStageScalarWhereInputSchema),z.lazy(() => RocketStageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutRocketNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutRocketNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRocketInputSchema),z.lazy(() => UserUncheckedCreateWithoutRocketInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRocketInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRocketInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRocketInputSchema),z.lazy(() => UserUpdateWithoutRocketInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRocketInputSchema) ]).optional(),
}).strict();

export const RocketStageUncheckedUpdateManyWithoutRocketNestedInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateManyWithoutRocketNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageCreateWithoutRocketInputSchema).array(),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema),z.lazy(() => RocketStageCreateOrConnectWithoutRocketInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketStageUpsertWithWhereUniqueWithoutRocketInputSchema),z.lazy(() => RocketStageUpsertWithWhereUniqueWithoutRocketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketStageCreateManyRocketInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketStageWhereUniqueInputSchema),z.lazy(() => RocketStageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketStageUpdateWithWhereUniqueWithoutRocketInputSchema),z.lazy(() => RocketStageUpdateWithWhereUniqueWithoutRocketInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketStageUpdateManyWithWhereWithoutRocketInputSchema),z.lazy(() => RocketStageUpdateManyWithWhereWithoutRocketInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketStageScalarWhereInputSchema),z.lazy(() => RocketStageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RocketCreateNestedOneWithoutStagesInputSchema: z.ZodType<Prisma.RocketCreateNestedOneWithoutStagesInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedCreateWithoutStagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RocketCreateOrConnectWithoutStagesInputSchema).optional(),
  connect: z.lazy(() => RocketWhereUniqueInputSchema).optional()
}).strict();

export const RocketPartCreateNestedManyWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartCreateNestedManyWithoutRocketStageInput> = z.object({
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema).array(),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketPartCreateManyRocketStageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RocketPartUncheckedCreateNestedManyWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUncheckedCreateNestedManyWithoutRocketStageInput> = z.object({
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema).array(),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketPartCreateManyRocketStageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RocketUpdateOneWithoutStagesNestedInputSchema: z.ZodType<Prisma.RocketUpdateOneWithoutStagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedCreateWithoutStagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RocketCreateOrConnectWithoutStagesInputSchema).optional(),
  upsert: z.lazy(() => RocketUpsertWithoutStagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RocketWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RocketWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RocketWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RocketUpdateToOneWithWhereWithoutStagesInputSchema),z.lazy(() => RocketUpdateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedUpdateWithoutStagesInputSchema) ]).optional(),
}).strict();

export const RocketPartUpdateManyWithoutRocketStageNestedInputSchema: z.ZodType<Prisma.RocketPartUpdateManyWithoutRocketStageNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema).array(),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketPartUpsertWithWhereUniqueWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpsertWithWhereUniqueWithoutRocketStageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketPartCreateManyRocketStageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketPartUpdateWithWhereUniqueWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpdateWithWhereUniqueWithoutRocketStageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketPartUpdateManyWithWhereWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpdateManyWithWhereWithoutRocketStageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketPartScalarWhereInputSchema),z.lazy(() => RocketPartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RocketPartUncheckedUpdateManyWithoutRocketStageNestedInputSchema: z.ZodType<Prisma.RocketPartUncheckedUpdateManyWithoutRocketStageNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema).array(),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema),z.lazy(() => RocketPartCreateOrConnectWithoutRocketStageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RocketPartUpsertWithWhereUniqueWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpsertWithWhereUniqueWithoutRocketStageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketPartCreateManyRocketStageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RocketPartWhereUniqueInputSchema),z.lazy(() => RocketPartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RocketPartUpdateWithWhereUniqueWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpdateWithWhereUniqueWithoutRocketStageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RocketPartUpdateManyWithWhereWithoutRocketStageInputSchema),z.lazy(() => RocketPartUpdateManyWithWhereWithoutRocketStageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RocketPartScalarWhereInputSchema),z.lazy(() => RocketPartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RocketStageCreateNestedOneWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageCreateNestedOneWithoutPartsInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RocketStageCreateOrConnectWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => RocketStageWhereUniqueInputSchema).optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RocketStageUpdateOneWithoutPartsNestedInputSchema: z.ZodType<Prisma.RocketStageUpdateOneWithoutPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RocketStageCreateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RocketStageCreateOrConnectWithoutPartsInputSchema).optional(),
  upsert: z.lazy(() => RocketStageUpsertWithoutPartsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RocketStageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RocketStageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RocketStageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RocketStageUpdateToOneWithWhereWithoutPartsInputSchema),z.lazy(() => RocketStageUpdateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedUpdateWithoutPartsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumUploadStatusFilterSchema: z.ZodType<Prisma.NestedEnumUploadStatusFilter> = z.object({
  equals: z.lazy(() => UploadStatusSchema).optional(),
  in: z.lazy(() => UploadStatusSchema).array().optional(),
  notIn: z.lazy(() => UploadStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => NestedEnumUploadStatusFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUploadStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUploadStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UploadStatusSchema).optional(),
  in: z.lazy(() => UploadStatusSchema).array().optional(),
  notIn: z.lazy(() => UploadStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => NestedEnumUploadStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUploadStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUploadStatusFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const FileCreateWithoutUserInputSchema: z.ZodType<Prisma.FileCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutFileInputSchema).optional()
}).strict();

export const FileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutFileInputSchema).optional()
}).strict();

export const FileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FileCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FileCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FileCreateManyUserInputSchema),z.lazy(() => FileCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessageCreateWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  File: z.lazy(() => FileCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export const MessageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  fileId: z.string().optional().nullable()
}).strict();

export const MessageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MessageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyUserInputSchema),z.lazy(() => MessageCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RocketCreateWithoutUserInputSchema: z.ZodType<Prisma.RocketCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  stages: z.lazy(() => RocketStageCreateNestedManyWithoutRocketInputSchema).optional()
}).strict();

export const RocketUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RocketUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  stages: z.lazy(() => RocketStageUncheckedCreateNestedManyWithoutRocketInputSchema).optional()
}).strict();

export const RocketCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RocketCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RocketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RocketCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RocketCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RocketCreateManyUserInputSchema),z.lazy(() => RocketCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FileUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FileUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FileUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FileUpdateManyMutationInputSchema),z.lazy(() => FileUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FileScalarWhereInputSchema: z.ZodType<Prisma.FileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uploadStatus: z.union([ z.lazy(() => EnumUploadStatusFilterSchema),z.lazy(() => UploadStatusSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutUserInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutUserInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUserMessage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RocketUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RocketUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RocketWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RocketUpdateWithoutUserInputSchema),z.lazy(() => RocketUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RocketUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RocketUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RocketWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RocketUpdateWithoutUserInputSchema),z.lazy(() => RocketUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RocketUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RocketUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RocketScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RocketUpdateManyMutationInputSchema),z.lazy(() => RocketUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RocketScalarWhereInputSchema: z.ZodType<Prisma.RocketScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketScalarWhereInputSchema),z.lazy(() => RocketScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketScalarWhereInputSchema),z.lazy(() => RocketScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  activeStage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  activeChart: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scaleSlider: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MessageCreateWithoutFileInputSchema: z.ZodType<Prisma.MessageCreateWithoutFileInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutMessageInputSchema).optional()
}).strict();

export const MessageUncheckedCreateWithoutFileInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutFileInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const MessageCreateOrConnectWithoutFileInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutFileInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export const MessageCreateManyFileInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyFileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyFileInputSchema),z.lazy(() => MessageCreateManyFileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutFileInputSchema: z.ZodType<Prisma.UserCreateWithoutFileInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  Message: z.lazy(() => MessageCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFileInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  Message: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutFileInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutFileInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutFileInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutFileInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutFileInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutFileInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutFileInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutFileInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutFileInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutFileInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutFileInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutFileInputSchema) ]),
}).strict();

export const UserUpsertWithoutFileInputSchema: z.ZodType<Prisma.UserUpsertWithoutFileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]),
}).strict();

export const UserUpdateWithoutFileInputSchema: z.ZodType<Prisma.UserUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Message: z.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Message: z.lazy(() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutMessageInputSchema: z.ZodType<Prisma.UserCreateWithoutMessageInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMessageInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessageInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMessageInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessageInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMessageInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessageInputSchema) ]),
}).strict();

export const FileCreateWithoutMessagesInputSchema: z.ZodType<Prisma.FileCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFileInputSchema).optional()
}).strict();

export const FileUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const FileCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const UserUpsertWithoutMessageInputSchema: z.ZodType<Prisma.UserUpsertWithoutMessageInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMessageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessageInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMessageInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessageInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMessageInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMessageInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMessageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessageInputSchema) ]),
}).strict();

export const UserUpdateWithoutMessageInputSchema: z.ZodType<Prisma.UserUpdateWithoutMessageInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMessageInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessageInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FileUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.FileUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => FileUpdateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => FileWhereInputSchema).optional()
}).strict();

export const FileUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.FileUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => FileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FileUpdateWithoutMessagesInputSchema),z.lazy(() => FileUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const FileUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.FileUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutFileNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.FileUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketStageCreateWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageCreateWithoutRocketInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  parts: z.lazy(() => RocketPartCreateNestedManyWithoutRocketStageInputSchema).optional()
}).strict();

export const RocketStageUncheckedCreateWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUncheckedCreateWithoutRocketInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  parts: z.lazy(() => RocketPartUncheckedCreateNestedManyWithoutRocketStageInputSchema).optional()
}).strict();

export const RocketStageCreateOrConnectWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageCreateOrConnectWithoutRocketInput> = z.object({
  where: z.lazy(() => RocketStageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema) ]),
}).strict();

export const RocketStageCreateManyRocketInputEnvelopeSchema: z.ZodType<Prisma.RocketStageCreateManyRocketInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RocketStageCreateManyRocketInputSchema),z.lazy(() => RocketStageCreateManyRocketInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutRocketInputSchema: z.ZodType<Prisma.UserCreateWithoutRocketInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Message: z.lazy(() => MessageCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRocketInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRocketInput> = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Message: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRocketInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRocketInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRocketInputSchema),z.lazy(() => UserUncheckedCreateWithoutRocketInputSchema) ]),
}).strict();

export const RocketStageUpsertWithWhereUniqueWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUpsertWithWhereUniqueWithoutRocketInput> = z.object({
  where: z.lazy(() => RocketStageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RocketStageUpdateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedUpdateWithoutRocketInputSchema) ]),
  create: z.union([ z.lazy(() => RocketStageCreateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutRocketInputSchema) ]),
}).strict();

export const RocketStageUpdateWithWhereUniqueWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUpdateWithWhereUniqueWithoutRocketInput> = z.object({
  where: z.lazy(() => RocketStageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RocketStageUpdateWithoutRocketInputSchema),z.lazy(() => RocketStageUncheckedUpdateWithoutRocketInputSchema) ]),
}).strict();

export const RocketStageUpdateManyWithWhereWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUpdateManyWithWhereWithoutRocketInput> = z.object({
  where: z.lazy(() => RocketStageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RocketStageUpdateManyMutationInputSchema),z.lazy(() => RocketStageUncheckedUpdateManyWithoutRocketInputSchema) ]),
}).strict();

export const RocketStageScalarWhereInputSchema: z.ZodType<Prisma.RocketStageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketStageScalarWhereInputSchema),z.lazy(() => RocketStageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketStageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketStageScalarWhereInputSchema),z.lazy(() => RocketStageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageIndex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rocketId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutRocketInputSchema: z.ZodType<Prisma.UserUpsertWithoutRocketInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRocketInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRocketInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRocketInputSchema),z.lazy(() => UserUncheckedCreateWithoutRocketInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRocketInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRocketInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRocketInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRocketInputSchema) ]),
}).strict();

export const UserUpdateWithoutRocketInputSchema: z.ZodType<Prisma.UserUpdateWithoutRocketInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Message: z.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRocketInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRocketInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripePriceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripeCurrentPeriodEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Message: z.lazy(() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RocketCreateWithoutStagesInputSchema: z.ZodType<Prisma.RocketCreateWithoutStagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutRocketInputSchema).optional()
}).strict();

export const RocketUncheckedCreateWithoutStagesInputSchema: z.ZodType<Prisma.RocketUncheckedCreateWithoutStagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const RocketCreateOrConnectWithoutStagesInputSchema: z.ZodType<Prisma.RocketCreateOrConnectWithoutStagesInput> = z.object({
  where: z.lazy(() => RocketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RocketCreateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedCreateWithoutStagesInputSchema) ]),
}).strict();

export const RocketPartCreateWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartCreateWithoutRocketStageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional()
}).strict();

export const RocketPartUncheckedCreateWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUncheckedCreateWithoutRocketStageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional()
}).strict();

export const RocketPartCreateOrConnectWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartCreateOrConnectWithoutRocketStageInput> = z.object({
  where: z.lazy(() => RocketPartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema) ]),
}).strict();

export const RocketPartCreateManyRocketStageInputEnvelopeSchema: z.ZodType<Prisma.RocketPartCreateManyRocketStageInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RocketPartCreateManyRocketStageInputSchema),z.lazy(() => RocketPartCreateManyRocketStageInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RocketUpsertWithoutStagesInputSchema: z.ZodType<Prisma.RocketUpsertWithoutStagesInput> = z.object({
  update: z.union([ z.lazy(() => RocketUpdateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedUpdateWithoutStagesInputSchema) ]),
  create: z.union([ z.lazy(() => RocketCreateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedCreateWithoutStagesInputSchema) ]),
  where: z.lazy(() => RocketWhereInputSchema).optional()
}).strict();

export const RocketUpdateToOneWithWhereWithoutStagesInputSchema: z.ZodType<Prisma.RocketUpdateToOneWithWhereWithoutStagesInput> = z.object({
  where: z.lazy(() => RocketWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RocketUpdateWithoutStagesInputSchema),z.lazy(() => RocketUncheckedUpdateWithoutStagesInputSchema) ]),
}).strict();

export const RocketUpdateWithoutStagesInputSchema: z.ZodType<Prisma.RocketUpdateWithoutStagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutRocketNestedInputSchema).optional()
}).strict();

export const RocketUncheckedUpdateWithoutStagesInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateWithoutStagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketPartUpsertWithWhereUniqueWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUpsertWithWhereUniqueWithoutRocketStageInput> = z.object({
  where: z.lazy(() => RocketPartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RocketPartUpdateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedUpdateWithoutRocketStageInputSchema) ]),
  create: z.union([ z.lazy(() => RocketPartCreateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedCreateWithoutRocketStageInputSchema) ]),
}).strict();

export const RocketPartUpdateWithWhereUniqueWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUpdateWithWhereUniqueWithoutRocketStageInput> = z.object({
  where: z.lazy(() => RocketPartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RocketPartUpdateWithoutRocketStageInputSchema),z.lazy(() => RocketPartUncheckedUpdateWithoutRocketStageInputSchema) ]),
}).strict();

export const RocketPartUpdateManyWithWhereWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUpdateManyWithWhereWithoutRocketStageInput> = z.object({
  where: z.lazy(() => RocketPartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RocketPartUpdateManyMutationInputSchema),z.lazy(() => RocketPartUncheckedUpdateManyWithoutRocketStageInputSchema) ]),
}).strict();

export const RocketPartScalarWhereInputSchema: z.ZodType<Prisma.RocketPartScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RocketPartScalarWhereInputSchema),z.lazy(() => RocketPartScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RocketPartScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RocketPartScalarWhereInputSchema),z.lazy(() => RocketPartScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  part_type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diameter: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  length: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scale: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_width: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  scaled_height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  targetStage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const RocketStageCreateWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageCreateWithoutPartsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  rocket: z.lazy(() => RocketCreateNestedOneWithoutStagesInputSchema).optional()
}).strict();

export const RocketStageUncheckedCreateWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageUncheckedCreateWithoutPartsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int(),
  rocketId: z.string().optional().nullable()
}).strict();

export const RocketStageCreateOrConnectWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageCreateOrConnectWithoutPartsInput> = z.object({
  where: z.lazy(() => RocketStageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RocketStageCreateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutPartsInputSchema) ]),
}).strict();

export const RocketStageUpsertWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageUpsertWithoutPartsInput> = z.object({
  update: z.union([ z.lazy(() => RocketStageUpdateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedUpdateWithoutPartsInputSchema) ]),
  create: z.union([ z.lazy(() => RocketStageCreateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedCreateWithoutPartsInputSchema) ]),
  where: z.lazy(() => RocketStageWhereInputSchema).optional()
}).strict();

export const RocketStageUpdateToOneWithWhereWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageUpdateToOneWithWhereWithoutPartsInput> = z.object({
  where: z.lazy(() => RocketStageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RocketStageUpdateWithoutPartsInputSchema),z.lazy(() => RocketStageUncheckedUpdateWithoutPartsInputSchema) ]),
}).strict();

export const RocketStageUpdateWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageUpdateWithoutPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rocket: z.lazy(() => RocketUpdateOneWithoutStagesNestedInputSchema).optional()
}).strict();

export const RocketStageUncheckedUpdateWithoutPartsInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateWithoutPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rocketId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileCreateManyUserInputSchema: z.ZodType<Prisma.FileCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  uploadStatus: z.lazy(() => UploadStatusSchema).optional(),
  url: z.string(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional()
}).strict();

export const MessageCreateManyUserInputSchema: z.ZodType<Prisma.MessageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  fileId: z.string().optional().nullable()
}).strict();

export const RocketCreateManyUserInputSchema: z.ZodType<Prisma.RocketCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional()
}).strict();

export const FileUpdateWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutFileNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutFileNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploadStatus: z.union([ z.lazy(() => UploadStatusSchema),z.lazy(() => EnumUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  File: z.lazy(() => FileUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketUpdateWithoutUserInputSchema: z.ZodType<Prisma.RocketUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.lazy(() => RocketStageUpdateManyWithoutRocketNestedInputSchema).optional()
}).strict();

export const RocketUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.lazy(() => RocketStageUncheckedUpdateManyWithoutRocketNestedInputSchema).optional()
}).strict();

export const RocketUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RocketUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activeChart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scaleSlider: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyFileInputSchema: z.ZodType<Prisma.MessageCreateManyFileInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  isUserMessage: z.boolean(),
  createdAt: z.coerce.date().optional(),
  uploadedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const MessageUpdateWithoutFileInputSchema: z.ZodType<Prisma.MessageUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutMessageNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutFileInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyWithoutFileInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutFileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserMessage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RocketStageCreateManyRocketInputSchema: z.ZodType<Prisma.RocketStageCreateManyRocketInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  stageIndex: z.number().int()
}).strict();

export const RocketStageUpdateWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUpdateWithoutRocketInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parts: z.lazy(() => RocketPartUpdateManyWithoutRocketStageNestedInputSchema).optional()
}).strict();

export const RocketStageUncheckedUpdateWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateWithoutRocketInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parts: z.lazy(() => RocketPartUncheckedUpdateManyWithoutRocketStageNestedInputSchema).optional()
}).strict();

export const RocketStageUncheckedUpdateManyWithoutRocketInputSchema: z.ZodType<Prisma.RocketStageUncheckedUpdateManyWithoutRocketInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stageIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketPartCreateManyRocketStageInputSchema: z.ZodType<Prisma.RocketPartCreateManyRocketStageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  part_type: z.string(),
  name: z.string(),
  image: z.string(),
  diameter: z.number().optional().nullable(),
  length: z.number().optional().nullable(),
  weight: z.number(),
  scale: z.number().optional(),
  width: z.number(),
  height: z.number(),
  scaled_width: z.number(),
  scaled_height: z.number(),
  targetStage: z.number().int().optional(),
  x: z.number().optional(),
  y: z.number().optional()
}).strict();

export const RocketPartUpdateWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUpdateWithoutRocketStageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketPartUncheckedUpdateWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUncheckedUpdateWithoutRocketStageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RocketPartUncheckedUpdateManyWithoutRocketStageInputSchema: z.ZodType<Prisma.RocketPartUncheckedUpdateManyWithoutRocketStageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  part_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  length: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scale: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_width: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  scaled_height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  targetStage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const FileFindFirstArgsSchema: z.ZodType<Prisma.FileFindFirstArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FileFindFirstOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FileFindManyArgsSchema: z.ZodType<Prisma.FileFindManyArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FileAggregateArgsSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FileGroupByArgsSchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithAggregationInputSchema.array(),FileOrderByWithAggregationInputSchema ]).optional(),
  by: FileScalarFieldEnumSchema.array(),
  having: FileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FileFindUniqueArgsSchema: z.ZodType<Prisma.FileFindUniqueArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FileFindUniqueOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict()

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict()

export const RocketFindFirstArgsSchema: z.ZodType<Prisma.RocketFindFirstArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereInputSchema.optional(),
  orderBy: z.union([ RocketOrderByWithRelationInputSchema.array(),RocketOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketScalarFieldEnumSchema,RocketScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RocketFindFirstOrThrowArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereInputSchema.optional(),
  orderBy: z.union([ RocketOrderByWithRelationInputSchema.array(),RocketOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketScalarFieldEnumSchema,RocketScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketFindManyArgsSchema: z.ZodType<Prisma.RocketFindManyArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereInputSchema.optional(),
  orderBy: z.union([ RocketOrderByWithRelationInputSchema.array(),RocketOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketScalarFieldEnumSchema,RocketScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketAggregateArgsSchema: z.ZodType<Prisma.RocketAggregateArgs> = z.object({
  where: RocketWhereInputSchema.optional(),
  orderBy: z.union([ RocketOrderByWithRelationInputSchema.array(),RocketOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketGroupByArgsSchema: z.ZodType<Prisma.RocketGroupByArgs> = z.object({
  where: RocketWhereInputSchema.optional(),
  orderBy: z.union([ RocketOrderByWithAggregationInputSchema.array(),RocketOrderByWithAggregationInputSchema ]).optional(),
  by: RocketScalarFieldEnumSchema.array(),
  having: RocketScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketFindUniqueArgsSchema: z.ZodType<Prisma.RocketFindUniqueArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereUniqueInputSchema,
}).strict()

export const RocketFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RocketFindUniqueOrThrowArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereUniqueInputSchema,
}).strict()

export const RocketStageFindFirstArgsSchema: z.ZodType<Prisma.RocketStageFindFirstArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereInputSchema.optional(),
  orderBy: z.union([ RocketStageOrderByWithRelationInputSchema.array(),RocketStageOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketStageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketStageScalarFieldEnumSchema,RocketStageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketStageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RocketStageFindFirstOrThrowArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereInputSchema.optional(),
  orderBy: z.union([ RocketStageOrderByWithRelationInputSchema.array(),RocketStageOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketStageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketStageScalarFieldEnumSchema,RocketStageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketStageFindManyArgsSchema: z.ZodType<Prisma.RocketStageFindManyArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereInputSchema.optional(),
  orderBy: z.union([ RocketStageOrderByWithRelationInputSchema.array(),RocketStageOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketStageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketStageScalarFieldEnumSchema,RocketStageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketStageAggregateArgsSchema: z.ZodType<Prisma.RocketStageAggregateArgs> = z.object({
  where: RocketStageWhereInputSchema.optional(),
  orderBy: z.union([ RocketStageOrderByWithRelationInputSchema.array(),RocketStageOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketStageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketStageGroupByArgsSchema: z.ZodType<Prisma.RocketStageGroupByArgs> = z.object({
  where: RocketStageWhereInputSchema.optional(),
  orderBy: z.union([ RocketStageOrderByWithAggregationInputSchema.array(),RocketStageOrderByWithAggregationInputSchema ]).optional(),
  by: RocketStageScalarFieldEnumSchema.array(),
  having: RocketStageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketStageFindUniqueArgsSchema: z.ZodType<Prisma.RocketStageFindUniqueArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereUniqueInputSchema,
}).strict()

export const RocketStageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RocketStageFindUniqueOrThrowArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereUniqueInputSchema,
}).strict()

export const RocketPartFindFirstArgsSchema: z.ZodType<Prisma.RocketPartFindFirstArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereInputSchema.optional(),
  orderBy: z.union([ RocketPartOrderByWithRelationInputSchema.array(),RocketPartOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketPartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketPartScalarFieldEnumSchema,RocketPartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketPartFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RocketPartFindFirstOrThrowArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereInputSchema.optional(),
  orderBy: z.union([ RocketPartOrderByWithRelationInputSchema.array(),RocketPartOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketPartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketPartScalarFieldEnumSchema,RocketPartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketPartFindManyArgsSchema: z.ZodType<Prisma.RocketPartFindManyArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereInputSchema.optional(),
  orderBy: z.union([ RocketPartOrderByWithRelationInputSchema.array(),RocketPartOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketPartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RocketPartScalarFieldEnumSchema,RocketPartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RocketPartAggregateArgsSchema: z.ZodType<Prisma.RocketPartAggregateArgs> = z.object({
  where: RocketPartWhereInputSchema.optional(),
  orderBy: z.union([ RocketPartOrderByWithRelationInputSchema.array(),RocketPartOrderByWithRelationInputSchema ]).optional(),
  cursor: RocketPartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketPartGroupByArgsSchema: z.ZodType<Prisma.RocketPartGroupByArgs> = z.object({
  where: RocketPartWhereInputSchema.optional(),
  orderBy: z.union([ RocketPartOrderByWithAggregationInputSchema.array(),RocketPartOrderByWithAggregationInputSchema ]).optional(),
  by: RocketPartScalarFieldEnumSchema.array(),
  having: RocketPartScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RocketPartFindUniqueArgsSchema: z.ZodType<Prisma.RocketPartFindUniqueArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereUniqueInputSchema,
}).strict()

export const RocketPartFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RocketPartFindUniqueOrThrowArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const FileCreateArgsSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
}).strict()

export const FileUpsertArgsSchema: z.ZodType<Prisma.FileUpsertArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  create: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
  update: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
}).strict()

export const FileCreateManyArgsSchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FileDeleteArgsSchema: z.ZodType<Prisma.FileDeleteArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileUpdateArgsSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileUpdateManyArgsSchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict()

export const FileDeleteManyArgsSchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({
  where: FileWhereInputSchema.optional(),
}).strict()

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict()

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict()

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict()

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict()

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict()

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict()

export const RocketCreateArgsSchema: z.ZodType<Prisma.RocketCreateArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  data: z.union([ RocketCreateInputSchema,RocketUncheckedCreateInputSchema ]).optional(),
}).strict()

export const RocketUpsertArgsSchema: z.ZodType<Prisma.RocketUpsertArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereUniqueInputSchema,
  create: z.union([ RocketCreateInputSchema,RocketUncheckedCreateInputSchema ]),
  update: z.union([ RocketUpdateInputSchema,RocketUncheckedUpdateInputSchema ]),
}).strict()

export const RocketCreateManyArgsSchema: z.ZodType<Prisma.RocketCreateManyArgs> = z.object({
  data: z.union([ RocketCreateManyInputSchema,RocketCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RocketDeleteArgsSchema: z.ZodType<Prisma.RocketDeleteArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  where: RocketWhereUniqueInputSchema,
}).strict()

export const RocketUpdateArgsSchema: z.ZodType<Prisma.RocketUpdateArgs> = z.object({
  select: RocketSelectSchema.optional(),
  include: RocketIncludeSchema.optional(),
  data: z.union([ RocketUpdateInputSchema,RocketUncheckedUpdateInputSchema ]),
  where: RocketWhereUniqueInputSchema,
}).strict()

export const RocketUpdateManyArgsSchema: z.ZodType<Prisma.RocketUpdateManyArgs> = z.object({
  data: z.union([ RocketUpdateManyMutationInputSchema,RocketUncheckedUpdateManyInputSchema ]),
  where: RocketWhereInputSchema.optional(),
}).strict()

export const RocketDeleteManyArgsSchema: z.ZodType<Prisma.RocketDeleteManyArgs> = z.object({
  where: RocketWhereInputSchema.optional(),
}).strict()

export const RocketStageCreateArgsSchema: z.ZodType<Prisma.RocketStageCreateArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  data: z.union([ RocketStageCreateInputSchema,RocketStageUncheckedCreateInputSchema ]),
}).strict()

export const RocketStageUpsertArgsSchema: z.ZodType<Prisma.RocketStageUpsertArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereUniqueInputSchema,
  create: z.union([ RocketStageCreateInputSchema,RocketStageUncheckedCreateInputSchema ]),
  update: z.union([ RocketStageUpdateInputSchema,RocketStageUncheckedUpdateInputSchema ]),
}).strict()

export const RocketStageCreateManyArgsSchema: z.ZodType<Prisma.RocketStageCreateManyArgs> = z.object({
  data: z.union([ RocketStageCreateManyInputSchema,RocketStageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RocketStageDeleteArgsSchema: z.ZodType<Prisma.RocketStageDeleteArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  where: RocketStageWhereUniqueInputSchema,
}).strict()

export const RocketStageUpdateArgsSchema: z.ZodType<Prisma.RocketStageUpdateArgs> = z.object({
  select: RocketStageSelectSchema.optional(),
  include: RocketStageIncludeSchema.optional(),
  data: z.union([ RocketStageUpdateInputSchema,RocketStageUncheckedUpdateInputSchema ]),
  where: RocketStageWhereUniqueInputSchema,
}).strict()

export const RocketStageUpdateManyArgsSchema: z.ZodType<Prisma.RocketStageUpdateManyArgs> = z.object({
  data: z.union([ RocketStageUpdateManyMutationInputSchema,RocketStageUncheckedUpdateManyInputSchema ]),
  where: RocketStageWhereInputSchema.optional(),
}).strict()

export const RocketStageDeleteManyArgsSchema: z.ZodType<Prisma.RocketStageDeleteManyArgs> = z.object({
  where: RocketStageWhereInputSchema.optional(),
}).strict()

export const RocketPartCreateArgsSchema: z.ZodType<Prisma.RocketPartCreateArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  data: z.union([ RocketPartCreateInputSchema,RocketPartUncheckedCreateInputSchema ]),
}).strict()

export const RocketPartUpsertArgsSchema: z.ZodType<Prisma.RocketPartUpsertArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereUniqueInputSchema,
  create: z.union([ RocketPartCreateInputSchema,RocketPartUncheckedCreateInputSchema ]),
  update: z.union([ RocketPartUpdateInputSchema,RocketPartUncheckedUpdateInputSchema ]),
}).strict()

export const RocketPartCreateManyArgsSchema: z.ZodType<Prisma.RocketPartCreateManyArgs> = z.object({
  data: z.union([ RocketPartCreateManyInputSchema,RocketPartCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RocketPartDeleteArgsSchema: z.ZodType<Prisma.RocketPartDeleteArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  where: RocketPartWhereUniqueInputSchema,
}).strict()

export const RocketPartUpdateArgsSchema: z.ZodType<Prisma.RocketPartUpdateArgs> = z.object({
  select: RocketPartSelectSchema.optional(),
  include: RocketPartIncludeSchema.optional(),
  data: z.union([ RocketPartUpdateInputSchema,RocketPartUncheckedUpdateInputSchema ]),
  where: RocketPartWhereUniqueInputSchema,
}).strict()

export const RocketPartUpdateManyArgsSchema: z.ZodType<Prisma.RocketPartUpdateManyArgs> = z.object({
  data: z.union([ RocketPartUpdateManyMutationInputSchema,RocketPartUncheckedUpdateManyInputSchema ]),
  where: RocketPartWhereInputSchema.optional(),
}).strict()

export const RocketPartDeleteManyArgsSchema: z.ZodType<Prisma.RocketPartDeleteManyArgs> = z.object({
  where: RocketPartWhereInputSchema.optional(),
}).strict()