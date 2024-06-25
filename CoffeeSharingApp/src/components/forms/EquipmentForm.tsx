import { useAddEquipment } from '@/lib/react-query/queriesAndMutations';
import { EquipmentValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod';
import { toast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import FileUploader from '../shared/FileUploader';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';
import { Textarea } from '../ui/textarea';

type EquipmentFormProps = {
    equipment?: Models.Document;
}

const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
    const { mutateAsync: AddEquipment, isPending: isLoadingUpdate } = useAddEquipment();
    const { user } = useUserContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof EquipmentValidation>>(
        {
            resolver: zodResolver(EquipmentValidation),
            defaultValues: {
                type: equipment ? equipment?.type : "",
                name: equipment ? equipment?.name : "",
                file: [],
                description: equipment ? equipment?.type : ""
            },
        }
    )

    async function onSubmit(values: z.infer<typeof EquipmentValidation>) {
        const newEquipment = await AddEquipment({
            ...values,
            userId: user.id
        })

        if (!newEquipment) {
            toast({ title: 'Please try again' })
        }
        navigate('/create-post');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Equipment Type</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
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
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Logo</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={equipment?.logo} changeType={'Brand'} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Description</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button type="button" className="shad-button_dark_4">
                        <Link to={`/create-post`} >Cancel</Link>
                    </Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoadingUpdate}>
                        {isLoadingUpdate && 'Loading...'} Add Equipment
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EquipmentForm