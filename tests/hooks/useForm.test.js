import { fireEvent, renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { useForm } from "../../src/hooks/useForm"

describe('Pruebas sobre el useForm', () => {

    const initialForm={
        name: 'Fernando',
        email:'fernando@gmail.com',
    }

    test('Debe regresar los valores por defecto', () => {
        const {result} = renderHook(()=>useForm(initialForm));
        // console.log(result.current);

        expect(result.current).toEqual({
            name: 'Fernando',
            email: 'fernando@gmail.com',
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function),
        });
    })

    test('Debe cambiar el name del formulario', () => {

        const newValue = 'Juan';

        const {result} = renderHook(()=>useForm(initialForm));

        //usar act cuando la prueba genera cambios de estado en el componente
        act(()=>{
            result.current.onInputChange({target: {name:'name', value:newValue}});
        })

        expect(result.current.name).toBe(newValue);
        
    })


    test('Debe realizar el reset del formulario', () => {

        const newValue = 'Juan';
        const {result} = renderHook(()=>useForm(initialForm));
        const {onInputChange, onResetForm} = result.current;

        act(()=>{
            onInputChange({target: {name:'name', value:newValue}});
        })

        expect(result.current.name).toBe(newValue);

        act(()=>{
            onResetForm();
        })

        expect(result.current.name).toBe('Fernando');
        
    })
})