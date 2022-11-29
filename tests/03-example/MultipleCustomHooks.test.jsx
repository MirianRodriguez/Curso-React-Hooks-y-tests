import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-example/MultipleCustomHooks"
import { useCounter } from "../../src/hooks/useCounter";
import { useFetch } from "../../src/hooks/useFetch"

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas sobre MultipleCustomHooks', () => {

    const mockIncrement = jest.fn()

    useCounter.mockReturnValue({
        counter:1,
        increment: mockIncrement,
    });
    
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('Debe mostrar el componente por defecto ', () => {

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null,
        })

        render(<MultipleCustomHooks/>);
        //screen.debug();

        expect(screen.getByText('Cargando'));

        expect(screen.getByText('BreakingBad Quotes'));

        const nextButton = screen.getByRole('button', {name: 'Siguiente cita'});

        expect(nextButton.disabled).toBeTruthy();
    })

    test('Debe mostrar un quote', () => {

        useFetch.mockReturnValue({
            data: [{author: 'Fernando', quote: 'Hola mundo'}],
            isLoading: false,
            hasError: null,
        })

        render(<MultipleCustomHooks/>);

        expect(screen.getByText('Hola mundo')).toBeTruthy();
        expect(screen.getByText('Fernando')).toBeTruthy();

        const nextButton = screen.getByRole('button');

        expect(nextButton.disabled).toBeFalsy();
    })

    test('Debe llamar a la función incrementar', () => {

        useFetch.mockReturnValue({
            data: [{author: 'Fernando', quote: 'Hola mundo'}],
            isLoading: false,
            hasError: null,
        });

        render(<MultipleCustomHooks/>);
        const nextButton = screen.getByRole('button');
        fireEvent.click(nextButton);
        expect(mockIncrement).toHaveBeenCalled();
    })
})