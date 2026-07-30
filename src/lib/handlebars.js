import { format } from 'timeago.js'

const helpers = {
  timeago: (timestamp) => {
    return format(timestamp)
  },
}

export default helpers
