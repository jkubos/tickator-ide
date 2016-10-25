import {ACTION} from '../const/action'

export function reduce(state, action) {
  switch (action.type) {
    case ACTION.ADD_NAMESPACE_NODE:
        state.namespaces = state.namespaces || {}
        state.namespaces[action.uuid] = {
          nodes: {
            id: action.id,
            collapsed: false,
            label: ""
          }
        }
      break;
  }

  return state;
}
