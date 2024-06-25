// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Video, VideoData, VideoPatch, VideoQuery } from './video.schema'

export type { Video, VideoData, VideoPatch, VideoQuery }

export interface VideoParams extends MongoDBAdapterParams<VideoQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class VideoService<ServiceParams extends Params = VideoParams> extends MongoDBService<
  Video,
  VideoData,
  VideoParams,
  VideoPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('video'))
  }
}
