import { useUpdateProfile } from '@/lib/react-query/queriesAndMutations';
import { ProfileValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { z } from 'zod';
import { toast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useUserContext } from '@/context/AuthContext';
import FileUploader from '../shared/FileUploader';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const ProfileForm = () => {

    const { mutateAsync: UpdateProfile, isPending: isLoadingUpdate } = useUpdateProfile();
    const { user } = useUserContext();
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
        if (user) {
            const updatedProfile = await UpdateProfile(
                {
                    ...values,
                    userId: user.id,
                    imageId: user?.imageId,
                    imageUrl: user?.imageUrl
                }
            )

            if (!updatedProfile) {
                toast({ title: "Please try again." })
            }

            return navigate(`/profile/${user.id}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <div className="flex flex-row items-center gap-5">
                    <img
                        src={user.imageUrl || "../assets/images/profile-default.png"}
                        alt="profile"
                        width={150}
                        height={150}
                        className="aspect-square rounded-full"
                    />
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FileUploader fieldChange={field.onChange} mediaUrl={user.imageUrl} changeType={'Profile'} />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}

                    />
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Username</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Email</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Bio</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                
                <div className="flex gap-4 items-center justify-end">
                    <Button type="button" className="shad-button_dark_4">Cancel</Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoadingUpdate}>
                        {isLoadingUpdate && 'Loading...'} Update Profile
                        </Button>
                </div>
            </form>
        </Form>
    )
}

export default ProfileForm