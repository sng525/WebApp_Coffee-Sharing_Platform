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
import Dropdown from '../shared/Dropdown';

type EquipmentFormProps = {
    equipment?: Models.Document;
}

const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
    const { mutateAsync: AddEquipment, isPending: isLoadingUpdate } = useAddEquipment();
    const { user } = useUserContext();
    const navigate = useNavigate();

    const equipments = [
        { "id": "1", "name": 'Drip Coffee Maker', "imageUrl": 'assets/equipment_icons/drip-coffee-maker.png' },
        { "id": "2", "name": 'Pour-Over Coffee Maker', "imageUrl": 'assets/equipment_icons/pour-over-coffee-maker.png' },
        { "id": "3", "name": 'Capsule Machine', "imageUrl": 'assets/equipment_icons/capsule-machine.png' },
        { "id": "4", "name": 'French Press', "imageUrl": 'assets/equipment_icons/french-press.png' },
        { "id": "5", "name": 'AeroPress', "imageUrl": 'assets/equipment_icons/aeropress.png' },
        { "id": "6", "name": 'Cold Brew', "imageUrl": 'assets/equipment_icons/cold-brew.png' },
        { "id": "7", "name": 'Espresso', "imageUrl": 'assets/equipment_icons/espresso.png' },
        { "id": "8", "name": 'Capsule Espresso', "imageUrl": 'assets/equipment_icons/capsule-espresso.png' },
        { "id": "9", "name": 'Moka pot', "imageUrl": 'assets/equipment_icons/moka-pot.png' },
        { "id": "10", "name": 'Grind and Brew Coffee Maker', "imageUrl": 'assets/equipment_icons/grind-and-brew-coffee-maker.png' },
        { "id": "11", "name": 'Ibrik', "imageUrl": 'assets/equipment_icons/ibrik.png' },
        { "id": "12", "name": 'Steeped Coffee', "imageUrl": 'assets/equipment_icons/coffee-drip.png' },
        { "id": "13", "name": 'Phin Filter', "imageUrl": 'assets/equipment_icons/phin.png' },
    ];


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
                            <FormLabel className="shad-form_label">Brew Equipment</FormLabel>
                            <FormControl>
                                <div className="h-full w-full">
                                    <Dropdown 
                                    id="equipment" 
                                    title="Select Equipment Type" 
                                    data={equipments} 
                                    hasImage 
                                    fieldChange={field.onChange} 
                                />
                                </div>

                            </FormControl>
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