import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../../src/09-useContext/Main';

describe('Pruebas en <Main />', () => {
    
    test('debe de mostrar el HomePage', () => {
        
        render( 
            //MemoryRouter sirve para simular el browserRouter
            <MemoryRouter>
                <Main /> 
            </MemoryRouter>
        );

        expect( screen.getByText('HomePage') ).toBeTruthy();
        // screen.debug()

    });

    test('debe de mostrar el LoginPage', () => {
        
        render( 
            <MemoryRouter initialEntries={['/login']}>
                <Main /> 
            </MemoryRouter>
        );

        expect( screen.getByText('LoginPage') ).toBeTruthy();
        // screen.debug()

    });

});