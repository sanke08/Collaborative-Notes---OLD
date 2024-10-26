import { GET_FOLDERS_SUCCESS } from "../constance";


const initialState = {
    folder: null,
}


export const folderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FOLDERS_SUCCESS:
            return {
                loading: true,
                folder: action.payload,
            }
        default:
            return { ...state }
    }
}

