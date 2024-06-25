// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { VideoService } from './video.class'

// Main data model schema
export const videoSchema = {
  $id: 'Video',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name', 'added_at', 'link'],
  properties: {
    _id: ObjectIdSchema(),
    name: {type: 'string'},
    added_at: {type: 'number'},
    link: {type: 'string'}
  }
} as const
export type Video = FromSchema<typeof videoSchema>
export const videoValidator = getValidator(videoSchema, dataValidator)
export const videoResolver = resolve<Video, HookContext<VideoService>>({})

export const videoExternalResolver = resolve<Video, HookContext<VideoService>>({})

// Schema for creating new data
export const videoDataSchema = {
  $id: 'VideoData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'added_at', 'link'],
  properties: {
    ...videoSchema.properties
  }
} as const
export type VideoData = FromSchema<typeof videoDataSchema>
export const videoDataValidator = getValidator(videoDataSchema, dataValidator)
export const videoDataResolver = resolve<VideoData, HookContext<VideoService>>({})

// Schema for updating existing data
export const videoPatchSchema = {
  $id: 'VideoPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...videoSchema.properties
  }
} as const
export type VideoPatch = FromSchema<typeof videoPatchSchema>
export const videoPatchValidator = getValidator(videoPatchSchema, dataValidator)
export const videoPatchResolver = resolve<VideoPatch, HookContext<VideoService>>({})

// Schema for allowed query properties
export const videoQuerySchema = {
  $id: 'VideoQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(videoSchema.properties)
  }
} as const
export type VideoQuery = FromSchema<typeof videoQuerySchema>
export const videoQueryValidator = getValidator(videoQuerySchema, queryValidator)
export const videoQueryResolver = resolve<VideoQuery, HookContext<VideoService>>({})
