import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','tutorialStatus','tutorialStep']);

export const RocketScalarFieldEnumSchema = z.enum(['id','createdAt','name','activeStage','activeChart','scaleSlider','userId']);

export const RocketStageScalarFieldEnumSchema = z.enum(['id','createdAt','stageIndex','rocketId']);

export const RocketPartScalarFieldEnumSchema = z.enum(['id','createdAt','stageId','part_type','name','image','diameter','length','weight','scale','width','height','targetStage','x','y']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TutorialStatusSchema = z.enum(['NOTSTARTED','STARTED','COMPLETED']);

export type TutorialStatusType = `${z.infer<typeof TutorialStatusSchema>}`

export const TutorialStepSchema = z.enum(['FIRSTROCKET','FIRSTPART','STAGES','PERFORMANCE']);

export type TutorialStepType = `${z.infer<typeof TutorialStepSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  tutorialStatus: TutorialStatusSchema,
  tutorialStep: TutorialStepSchema,
  id: z.string(),
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>

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
  Rocket: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  tutorialStatus: z.boolean().optional(),
  tutorialStep: z.boolean().optional(),
  Rocket: z.union([z.boolean(),z.lazy(() => RocketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
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
  tutorialStatus: z.union([ z.lazy(() => EnumTutorialStatusFilterSchema),z.lazy(() => TutorialStatusSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => EnumTutorialStepFilterSchema),z.lazy(() => TutorialStepSchema) ]).optional(),
  Rocket: z.lazy(() => RocketListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tutorialStatus: z.lazy(() => SortOrderSchema).optional(),
  tutorialStep: z.lazy(() => SortOrderSchema).optional(),
  Rocket: z.lazy(() => RocketOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => EnumTutorialStatusFilterSchema),z.lazy(() => TutorialStatusSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => EnumTutorialStepFilterSchema),z.lazy(() => TutorialStepSchema) ]).optional(),
  Rocket: z.lazy(() => RocketListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tutorialStatus: z.lazy(() => SortOrderSchema).optional(),
  tutorialStep: z.lazy(() => SortOrderSchema).optional(),
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
  tutorialStatus: z.union([ z.lazy(() => EnumTutorialStatusWithAggregatesFilterSchema),z.lazy(() => TutorialStatusSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => EnumTutorialStepWithAggregatesFilterSchema),z.lazy(() => TutorialStepSchema) ]).optional(),
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
  targetStage: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  tutorialStatus: z.lazy(() => TutorialStatusSchema).optional(),
  tutorialStep: z.lazy(() => TutorialStepSchema).optional(),
  Rocket: z.lazy(() => RocketCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  tutorialStatus: z.lazy(() => TutorialStatusSchema).optional(),
  tutorialStep: z.lazy(() => TutorialStepSchema).optional(),
  Rocket: z.lazy(() => RocketUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
  Rocket: z.lazy(() => RocketUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
  Rocket: z.lazy(() => RocketUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  tutorialStatus: z.lazy(() => TutorialStatusSchema).optional(),
  tutorialStep: z.lazy(() => TutorialStepSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumTutorialStatusFilterSchema: z.ZodType<Prisma.EnumTutorialStatusFilter> = z.object({
  equals: z.lazy(() => TutorialStatusSchema).optional(),
  in: z.lazy(() => TutorialStatusSchema).array().optional(),
  notIn: z.lazy(() => TutorialStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => NestedEnumTutorialStatusFilterSchema) ]).optional(),
}).strict();

export const EnumTutorialStepFilterSchema: z.ZodType<Prisma.EnumTutorialStepFilter> = z.object({
  equals: z.lazy(() => TutorialStepSchema).optional(),
  in: z.lazy(() => TutorialStepSchema).array().optional(),
  notIn: z.lazy(() => TutorialStepSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => NestedEnumTutorialStepFilterSchema) ]).optional(),
}).strict();

export const RocketListRelationFilterSchema: z.ZodType<Prisma.RocketListRelationFilter> = z.object({
  every: z.lazy(() => RocketWhereInputSchema).optional(),
  some: z.lazy(() => RocketWhereInputSchema).optional(),
  none: z.lazy(() => RocketWhereInputSchema).optional()
}).strict();

export const RocketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RocketOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tutorialStatus: z.lazy(() => SortOrderSchema).optional(),
  tutorialStep: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tutorialStatus: z.lazy(() => SortOrderSchema).optional(),
  tutorialStep: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tutorialStatus: z.lazy(() => SortOrderSchema).optional(),
  tutorialStep: z.lazy(() => SortOrderSchema).optional()
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

export const EnumTutorialStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTutorialStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TutorialStatusSchema).optional(),
  in: z.lazy(() => TutorialStatusSchema).array().optional(),
  notIn: z.lazy(() => TutorialStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => NestedEnumTutorialStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTutorialStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTutorialStatusFilterSchema).optional()
}).strict();

export const EnumTutorialStepWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTutorialStepWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TutorialStepSchema).optional(),
  in: z.lazy(() => TutorialStepSchema).array().optional(),
  notIn: z.lazy(() => TutorialStepSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => NestedEnumTutorialStepWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTutorialStepFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTutorialStepFilterSchema).optional()
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

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
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

export const RocketCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RocketCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RocketCreateWithoutUserInputSchema),z.lazy(() => RocketCreateWithoutUserInputSchema).array(),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema),z.lazy(() => RocketUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema),z.lazy(() => RocketCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RocketCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RocketWhereUniqueInputSchema),z.lazy(() => RocketWhereUniqueInputSchema).array() ]).optional(),
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

export const EnumTutorialStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTutorialStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TutorialStatusSchema).optional()
}).strict();

export const EnumTutorialStepFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTutorialStepFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TutorialStepSchema).optional()
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

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
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

export const NestedEnumTutorialStatusFilterSchema: z.ZodType<Prisma.NestedEnumTutorialStatusFilter> = z.object({
  equals: z.lazy(() => TutorialStatusSchema).optional(),
  in: z.lazy(() => TutorialStatusSchema).array().optional(),
  notIn: z.lazy(() => TutorialStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => NestedEnumTutorialStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTutorialStepFilterSchema: z.ZodType<Prisma.NestedEnumTutorialStepFilter> = z.object({
  equals: z.lazy(() => TutorialStepSchema).optional(),
  in: z.lazy(() => TutorialStepSchema).array().optional(),
  notIn: z.lazy(() => TutorialStepSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => NestedEnumTutorialStepFilterSchema) ]).optional(),
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

export const NestedEnumTutorialStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTutorialStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TutorialStatusSchema).optional(),
  in: z.lazy(() => TutorialStatusSchema).array().optional(),
  notIn: z.lazy(() => TutorialStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => NestedEnumTutorialStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTutorialStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTutorialStatusFilterSchema).optional()
}).strict();

export const NestedEnumTutorialStepWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTutorialStepWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TutorialStepSchema).optional(),
  in: z.lazy(() => TutorialStepSchema).array().optional(),
  notIn: z.lazy(() => TutorialStepSchema).array().optional(),
  not: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => NestedEnumTutorialStepWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTutorialStepFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTutorialStepFilterSchema).optional()
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
  tutorialStatus: z.lazy(() => TutorialStatusSchema).optional(),
  tutorialStep: z.lazy(() => TutorialStepSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRocketInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRocketInput> = z.object({
  id: z.string(),
  email: z.string(),
  tutorialStatus: z.lazy(() => TutorialStatusSchema).optional(),
  tutorialStep: z.lazy(() => TutorialStepSchema).optional()
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
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutRocketInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRocketInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStatus: z.union([ z.lazy(() => TutorialStatusSchema),z.lazy(() => EnumTutorialStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tutorialStep: z.union([ z.lazy(() => TutorialStepSchema),z.lazy(() => EnumTutorialStepFieldUpdateOperationsInputSchema) ]).optional(),
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

export const RocketCreateManyUserInputSchema: z.ZodType<Prisma.RocketCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  activeStage: z.number().int().optional(),
  activeChart: z.string().optional().nullable(),
  scaleSlider: z.number().optional()
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