import {  GET_WORKSPACE_SUCCESS } from "../constance";


const initialState = {
    workspace: null,
}


export const workspaceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_WORKSPACE_SUCCESS:
            return {
                workspace: action.payload,
            }
        default:
            return { ...state }
    }
}

