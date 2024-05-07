import { NavLink } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HiEye, HiEyeOff  } from "react-icons/hi";

const formFields = {
    email: '',
    password: '',
}

export const LoginPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const {
        email,
        password,
        onInputChange,
        onInputBlur,
        onResetForm,
        updateInput,
        isValidEmail,
    } = useForm(formFields);

    useEffect(() => {
        const rememberedEmail = Cookies.get('rememberedEmail');
        if (rememberedEmail) {
            updateInput('email', rememberedEmail);
            setIsChecked(true);
        }
    }, []);

    const loginSubmit = async (event) => {
        event.preventDefault();

        if(isValidEmail){
            console.log('Email valido');
        }
        else{
            console.log('Email invalido');
        }
        
        if (isChecked) {
            Cookies.set('rememberedEmail', email, { expires: 14 });
        } else {
            Cookies.remove('rememberedEmail');
        }
        // startLogin({ email: loginEmail, password: loginPassword });
        //onResetForm();
    }
    return (
        <div className="container-page">
            <div className="background-secondary rounded-lg border my-40  mx-auto p-8 max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-center">Iniciar sesión</h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
                    <div className="rounded-md shadow-sm space-y-1">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="primary-input w-full"
                                placeholder="Email"
                                value={email}
                                onChange={onInputChange}
                                onBlur={onInputBlur}
                                required
                            />
                            {!isValidEmail && (
                                <p className="text-red-500 text-sm mt-1">Por favor, ingrese un correo electrónico válido.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <div className='relative flex items-center'>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder="Contraseña"
                                    autoComplete="false"
                                    className="primary-input w-full"
                                    value={password}
                                    onChange={onInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute text-xl right-2"
                                    disabled={!password}
                                >
                                    {showPassword 
                                    ? <HiEye className='text-gray-500 dark:text-gray-300 hover:text-gray-500/80 dark:hover:text-gray-300/80' />
                                    : <HiEyeOff className='text-gray-500 dark:text-gray-300 hover:text-gray-500/80 dark:hover:text-gray-300/80' />}
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    aria-describedby="remember"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#174CAA] dark:ring-offset-gray-800"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                    Recuérdarme
                                </label>
                            </div>
                        </div>
                        <div>
                            <NavLink to="/recuperacion">
                                <h5 className='hover:text-gray-500'>¿Olvidó su contraseña?</h5>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <NavLink to="/registrarse">
                                <h4 className="hover:text-gray-500">¿No tienes una cuenta? Regístrate</h4>
                            </NavLink>
                        </div>

                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn-primary w-full"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
