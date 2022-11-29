import { render, screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { HomePage } from "../../src/09-useContext/HomePage"

describe('Prueba en el componente HomePage', () => {

    const user = {
        id:1,
        name: 'Mirian',
    }

    test('debe mostrar el componente sin el usuario', () => {
        render(
        <UserContext.Provider value={{user:null}}>
            <HomePage/>
        </UserContext.Provider>
        )
        //screen.debug();
        const pUser = screen.getByLabelText('user'); //aria-label
        expect(pUser.innerHTML).toBe('null');
    })

    test('debe mostrar el componente con el usuario', () => {
        render(
        <UserContext.Provider value={{user:user}}>
            <HomePage/>
        </UserContext.Provider>
        )
        //screen.debug();
        const pUser = screen.getByLabelText('user'); //aria-label
        expect(pUser.innerHTML).toContain(user.name);
        expect(pUser.innerHTML).toContain(user.id.toString());
    })

})