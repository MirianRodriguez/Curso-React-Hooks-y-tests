import { fireEvent, render, screen } from "@testing-library/react"
import { useContext } from "react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { LoginPage } from "../../src/09-useContext/LoginPage"

describe('pruebas sobre el LoginPage', () => {

    test('Debe mostrar el componente sin el usuario', () => {
        render(
            <UserContext.Provider value={{user:null}}>
                <LoginPage/>
            </UserContext.Provider>
        )

        const pUser = screen.getByLabelText('user');
        expect(pUser.innerHTML).toBe('null');
    })

    test('Debe llamar el setUser cuando se hace click en el botón', () => {
        const mockSetUser = jest.fn();

        render(
            <UserContext.Provider value={{user:null, setUser:mockSetUser}}>
                <LoginPage/>
            </UserContext.Provider>
        )

        const btnChangeName = screen.getByRole('button');
        fireEvent.click(btnChangeName);
        expect(mockSetUser).toHaveBeenCalled();
    })
})