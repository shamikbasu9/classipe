// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  videoDataValidator,
  videoPatchValidator,
  videoQueryValidator,
  videoResolver,
  videoExternalResolver,
  videoDataResolver,
  videoPatchResolver,
  videoQueryResolver
} from './video.schema'

import type { Application } from '../../declarations'
import { VideoService, getOptions } from './video.class'
import { videoPath, videoMethods } from './video.shared'

export * from './video.class'
export * from './video.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const video = (app: Application) => {
  // Register our service on the Feathers application
  app.use(videoPath, new VideoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: videoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(videoPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(videoExternalResolver), schemaHooks.resolveResult(videoResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(videoQueryValidator), schemaHooks.resolveQuery(videoQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(videoDataValidator), schemaHooks.resolveData(videoDataResolver)],
      patch: [schemaHooks.validateData(videoPatchValidator), schemaHooks.resolveData(videoPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [videoPath]: VideoService
  }
}
