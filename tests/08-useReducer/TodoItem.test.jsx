import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Pruebas en TodoItem', () => {

    const todo = {
        id: 1,
        description: 'Tarea 1',
        done: false
    }

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach(()=>jest.clearAllMocks());

    test('Debe mostrar el todo pendiente', () => {
        render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock}/>);

        const liElement = screen.getByRole('listitem');
        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        expect(spanElement.className).toContain('align-self-center');
        expect(spanElement.className).not.toContain('text-decoration-line-through');
    })

    test('Debe mostrar el todo completado', () => {
        todo.done = true;
        render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock}/>);
        const spanElement = screen.getByLabelText('span');
        expect(spanElement.className).toContain('text-decoration-line-through');
    })

    test('Debe llamar al onToggleTodo', () => {
        render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock}/>);
        const spanElement = screen.getByLabelText('span');
        fireEvent.doubleClick(spanElement);
        expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
    })

    test('Debe llamar al onDeleteTodo', () => {
        render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock}/>);
        const buttonBorrar = screen.getByRole('button');
        fireEvent.click(buttonBorrar);
        expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
    })
})