import { todoReducer } from "../../src/08-useReducer/todoReducer";

describe('Pruebas sobre el todoReducer', () => {

    const initialState = [{
        id: 1, 
        description: 'todo demo',
        done:false,
    }];

    test('Debe de regresar el estado inicial', () => {
        const newState = todoReducer(initialState, {});
        expect(newState).toBe(initialState);
    })

    test('Debe agregar un todo', () => {
        const action = {
            type: '[TODO] Add Todo',
            payload: { 
                id: 2,
                description: 'Todo 2',
                done: false,
            }
        }

        const newState = todoReducer(initialState, action);
        expect(newState.length).toBe(2);
        expect(newState).toContain(action.payload);
    })

    test('Debe eliminar un todo', () => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: 1,
        }

        const newState = todoReducer(initialState, action);
        expect(newState.length).toBe(0);
    })

    test('Debe realizar el cambio de un todo', () => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 1,
        }

        const newState = todoReducer(initialState, action);
        //console.log(newState[0].done);
        expect(newState[0].done).toBe(true);
    })
})