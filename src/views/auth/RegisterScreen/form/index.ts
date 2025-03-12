import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/core/providers/auth';

export const useRegisterForm = () => {
    const { register } = useAuth();
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        const { email, password, name } = data;
        register(email, password, name);
    });

    return { form, submitForm: onSubmit };
};
