import { useAddBrand } from '@/lib/react-query/queriesAndMutations';
import { BrandValidation } from '@/lib/validation';
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

type BrandFormProps = {
    brand?: Models.Document;
}

const BrandForm = ({ brand }: BrandFormProps) => {
    const { mutateAsync: AddBrand, isPending: isLoadingUpdate } = useAddBrand();
    const { user } = useUserContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof BrandValidation>>(
        {
            resolver: zodResolver(BrandValidation),
            defaultValues: {
                name: brand ? brand?.name : "",
                file: []
            },
        }
    )

    async function onSubmit(values: z.infer<typeof BrandValidation>) {
        const newBrand = await AddBrand({
            ...values,
            userId: user.id
        })

        if (!newBrand) {
            toast({ title: 'Please try again' })
        }
        navigate('/create-post');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Brand Name</FormLabel>
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
                                    mediaUrl={brand?.imageUrl} changeType={'Brand'}/>
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
                        {isLoadingUpdate && 'Loading...'} Add Brand
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default BrandForm