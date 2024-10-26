import { combineReducers, createStore } from "redux"
import { folderReducer } from "./reducers/folder.reducers"
import { fileReducer } from "./reducers/file.reducer"
import { workspaceReducer } from "./reducers/workspace.reducer"


const reducer = combineReducers({
    folders:folderReducer,
    file:fileReducer,
    workspace:workspaceReducer
})

const initialState = {}
const store = createStore(reducer, initialState)
export default store