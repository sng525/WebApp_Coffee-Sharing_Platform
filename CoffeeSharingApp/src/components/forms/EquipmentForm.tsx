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
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

type EquipmentFormProps = {
    equipment?: Models.Document;
}

interface EquipmentType {
    name: string;
    iconUrl: string;
}

const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
    const { mutateAsync: AddEquipment, isPending: isLoadingUpdate } = useAddEquipment();
    const { user } = useUserContext();
    const navigate = useNavigate();

    const equipments: EquipmentType[] = [
        { name: 'Drip Coffee Maker', iconUrl: 'assets/equipment_icons/drip-coffee-maker.png' },
        { name: 'Pour-Over Coffee Maker', iconUrl: 'assets/equipment_icons/pour-over-coffee-maker.png' },
        { name: 'Capsule Machine', iconUrl: 'assets/equipment_icons/capsule-machine.png' },
        { name: 'French Press', iconUrl: 'assets/equipment_icons/french-press.png' },
        { name: 'AeroPress', iconUrl: 'assets/equipment_icons/aeropress.png' },
        { name: 'Cold Brew', iconUrl: 'assets/equipment_icons/cold-brew.png' },
        { name: 'Espresso', iconUrl: 'assets/equipment_icons/espresso.png' },
        { name: 'Capsule Espresso', iconUrl: 'assets/equipment_icons/capsule-espresso.png' },
        { name: 'Moka pot', iconUrl: 'assets/equipment_icons/moka-pot.png' },
        { name: 'Grind and Brew Coffee Maker', iconUrl: 'assets/equipment_icons/grind-and-brew-coffee-maker.png' },
        { name: 'Ibrik', iconUrl: 'assets/equipment_icons/ibrik.png' },
        { name: 'Steeped Coffee', iconUrl: 'assets/equipment_icons/coffee-drip.png' },
        { name: 'Phin Filter', iconUrl: 'assets/equipment_icons/phin.png' },
    ];

    // Select coffee type
    const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);

    const handleSelectType = (value: string) => {
        const selected = equipments.find(equipment => equipment.name === value) || null;
        setSelectedType(selected);
    };


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
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handleSelectType(value);
                                        }}
                                        defaultValue={field.value}>
                                        <FormControl className="bg-white w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a brew equipment" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-slate-100 w-full">
                                            {equipments.map((equipment) => (
                                                <SelectItem key={equipment.name} value={equipment.name}>
                                                    <div className="flex flex-row items-center py-2">
                                                        <img
                                                            src={equipment.iconUrl}
                                                            alt={`${equipment} icon`}
                                                            className="w-10 h-10 mr-2"
                                                        />
                                                        {equipment.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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