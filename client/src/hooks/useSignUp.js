import { useState } from "react";
import { useAuth } from "../context/authContext";
import { message } from "antd";  // Certifique-se de importar message

const useSignUp = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError('Passwords are not the same');
        }

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:8027/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            message.error(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
}

export default useSignUp;
