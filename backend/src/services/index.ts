import { user } from './users/users'
import { video } from './video/video'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(user)
  app.configure(video)
  // All services will be registered here
}
