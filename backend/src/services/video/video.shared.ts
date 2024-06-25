// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Video, VideoData, VideoPatch, VideoQuery, VideoService } from './video.class'

export type { Video, VideoData, VideoPatch, VideoQuery }

export type VideoClientService = Pick<VideoService<Params<VideoQuery>>, (typeof videoMethods)[number]>

export const videoPath = 'video'

export const videoMethods: Array<keyof VideoService> = ['find', 'get', 'create', 'patch', 'remove']

export const videoClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(videoPath, connection.service(videoPath), {
    methods: videoMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [videoPath]: VideoClientService
  }
}
