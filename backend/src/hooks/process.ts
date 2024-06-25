// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'
import moment from 'moment-timezone'

export const process = async (context: HookContext) => {
  context.data = {
    ...context.data,
  }
}
