import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useGetBrands, useGetEquipments, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { Link, useNavigate } from "react-router-dom"
import RatingBar from "../shared/RatingBar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Dropdown from "../shared/Dropdown"

type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update';
}

interface BrandDocument {
    $id: string;
    name: string;
    imageUrl: string;
}

const PostForm = ({ post, action }: PostFormProps) => {
    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();

    const { mutateAsync: CreatePost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: UpdatePost, isPending: isLoadingUpdate } = useUpdatePost();
    const { data: brands } = useGetBrands();
    const { data: equipments } = useGetEquipments();

    // Select coffee brand
    const [selectedBrand, setSelectedBrand] = useState<BrandDocument>();

    const handleSelectBrand = (value: string) => {
        const selected = (brands?.documents as unknown as BrandDocument[]).find((brand) => brand.name === value);
        setSelectedBrand(selected);
    };

    // Select coffee type
    const types = ["Café", "Coffee Beans", "Instant", "Capsule Coffee", "Drip Bag"]
    const [selectedType, setSelectedType] = useState<string>();

    const handleSelectType = (value: string) => {
        const selected = types.find(type => type === value);
        setSelectedType(selected);
    };


    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            brand_id: post ? post?.brand_id : "",
            type: post ? post?.type : "",
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post?.tags.join(',') : "",
            rating: post ? post?.rating : 0,
            name: post ? post?.name : "",
            equipment: post ? post?.equipments:""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === 'Update') {
            const updatedPost = await UpdatePost( // this UpdatePost comes from react query, i.e. queryAndMutations, which comes from appwrite.
                {
                    ...values,
                    postId: post.$id,
                    imageId: post?.imageId,
                    imageUrl: post?.imageUrl,
                    brandId: selectedBrand?.$id
                }
            )

            if (!updatedPost) {
                toast({ title: 'Please try again.' })
            }

            return navigate(`/posts/${post.$id}`)   // go to the post detail to check after it's updated
        }

        const newPost = await CreatePost({
            ...values,
            userId: user.id,
            brandId: selectedBrand?.$id
        })

        if (!newPost) {
            toast({
                title: 'Please try again.'
            })
        }
        navigate('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="brand_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Coffee Brand</FormLabel>
                            <div className="flex flex-row items-center w-full">
                                <div className="py-1 rounded-sm w-full">
                                    <FormControl>
                                        <Dropdown 
                                        id={"brand"} 
                                        title={"Select a coffee brand"}
                                        data={brands?.documents} 
                                        hasImage
                                        fieldChange={field.onChange} 
                                        />
                                    </FormControl>
                                </div>
                                <div className="px-2">
                                    <Link to={"/add-brand"}>
                                        <Button type="button" className="shad-button_dark_4">
                                            <img src="../assets/icons/edit.svg" width={20} height={20} />
                                            <p>Add Brand</p>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Coffee Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleSelectType(value);
                                    }}
                                    defaultValue={field.value}>
                                    <FormControl className="bg-white">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a coffee type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-100">
                                            {types.map((type) => (
                                                <SelectItem 
                                                key={type} 
                                                value={type}>
                                                    <div className="flex flex-row items-center">
                                                        {type}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
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
                            <FormLabel className="shad-form_label">Coffee Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Brew Equipment</FormLabel>
                            <div className="flex flex-row items-center w-full">
                                <div className="py-1 rounded-sm w-full">
                                    <FormControl>
                                        <Dropdown 
                                        id={"equipment"} 
                                        title={"Select a brew equipment"}
                                        data={equipments?.documents} 
                                        hasImage
                                        fieldChange={field.onChange} 
                                        />
                                    </FormControl>
                                </div>
                                <div className="px-2">
                                    <Link to={"/add-equipment"}>
                                        <Button type="button" className="shad-button_dark_4">
                                            <img src="../assets/icons/edit.svg" width={20} height={20} />
                                            <p>Add Equipment</p>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Rating</FormLabel>
                            <FormControl>
                                <RatingBar value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
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
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl} changeType={"Post"} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Bitter, fruity, aromatic"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button type="button" className="shad-button_dark_4"><Link to={`/posts/${post?.$id}`}>Cancel
                    </Link></Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoadingCreate || isLoadingUpdate}>
                        {isLoadingCreate || isLoadingUpdate && 'Loading...'}
                        {action} Post
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm