import { render, screen } from "@testing-library/react"
import { TodoApp } from "../../src/08-useReducer/TodoApp"
import { useTodos } from "../../src/hooks/useTodos"

jest.mock('../../src/hooks/useTodos');

describe('Pruebas sobre el TodoApp', () => {
    //simulo los datos que recibe TodoApp del hook
    useTodos.mockReturnValue({
        todos: [
            {id:1, description: 'Todo 1', done: false},
            {id:2, description: 'Todo 2', done: true},
        ],
        handleNewTodo: jest.fn(),
        handleDeleteTodo: jest.fn(), 
        handleToggleTodo: jest.fn(), 
        remainingTodosCount:jest.fn(), 
        todoCount:jest.fn(),
    })

    test('Debe mostrar correctamente el componente', () => {
        render(<TodoApp/>);
        expect(screen.getByText('Todo 1')).toBeTruthy();
        expect(screen.getByText('Todo 2')).toBeTruthy();
        expect(screen.getByRole('textbox')).toBeTruthy();
    })
})