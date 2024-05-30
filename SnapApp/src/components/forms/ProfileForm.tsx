import { useUpdateProfile } from '@/lib/react-query/queriesAndMutations';
import { ProfileValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom'
import { z } from 'zod';
import { toast } from '../ui/use-toast';

type ProfileFormProps = {
    user?: Models.Document;
}

const ProfileForm = ( {user} : ProfileFormProps) => {

    const {mutateAsync: UpdateProfile} = useUpdateProfile();

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof ProfileValidation>>(
        {
            resolver: zodResolver(ProfileValidation),
            defaultValues: {
                name: user ? user?.name : "",
                username: user ? user?.username : "",
                email: user ? user?.email : "",
                bio: user ? user?.bio : "",
                file: []
            },
        }
    )

    async function onSubmit(values: z.infer<typeof ProfileValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (user) {
            const updatedProfile = await UpdateProfile(
                {
                    ...values,
                    userId: user.id,
                    imageId: user?.imageId,
                    imageUrl: user?.imageUrl
                }
            )

            if(!updatedProfile){
                toast({title: "Please try again."})
            }

            return navigate(`/profile/${user.id}`)
        }
      }

    return (
        <Form {...form}>

        </Form>
    )
}

export default ProfileForm