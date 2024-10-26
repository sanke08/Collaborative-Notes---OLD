import { GET_FILE_SUCCESS, } from "../constance";


const initialState = {
    file: null,
}


export const fileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FILE_SUCCESS:
            return {
                file: action.payload,
            }
        default:
            return { ...state }
    }
}

 