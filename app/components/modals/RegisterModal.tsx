'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';

    
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register',data)
        .then(() => {
            registerModal.onClose();
            toast.success('Félicitation vous êtes maintenant membre de MaResi');
        })
        .catch((error) => {
               toast.error('Une erreur est survenue');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
     
    const toogle = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen();
    }, [loginModal, registerModal])
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Bienvenue chez MaResi' subsitle='Créer un compte!' />
            <Input 
                id="email"  
                label="Email" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
            <Input 
                id="name"  
                label="Name" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
            <Input 
                id="password"  
                label="Password" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
                type="password"
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
             <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
             <div className='text-neutral-500 text-center mt-4 font-light'>
               <div className="justify-center flex flex-row items-center gap-2"> 
               <div> Vous avez déja un compte  ?</div>
               <div onClick={toogle}
               className="text-neutral-800 cursor-pointer hover:underline"> Connexion </div>
              </div>
            </div>
        </div>
    )

    return (
        <Modal  
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Inscription"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}

export default RegisterModal;