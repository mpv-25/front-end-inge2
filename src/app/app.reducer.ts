import { Action } from "@ngrx/store";

//Vamos crear un modelo al estado de nuestra app

export interface appState {
    login:boolean
}

export const initialState = {
    login: false
}

export function miReducer(state: appState = initialState, action: Action): any {
    switch (action.type) {
        case 'cerrarLogin':
            return {
                ...state,
                login:false
            };
        case 'iniciarLogin':
            return {
                ...state,
                login:true
            };
        case 'estadoLogin':
            return {
                ...state
            };
        default:
            return {
                ...state,
                login:false
            };
    }
}