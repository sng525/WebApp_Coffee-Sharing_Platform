import { useUserContext } from "@/context/AuthContext"
import { formatTimeAgo } from "@/lib/utils"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import RatingBar from "./RatingBar"
import { useGetBrandById } from "@/lib/react-query/queriesAndMutations"

type PostCardProps = {
    post: Models.Document
}


const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();
    const brandId = post.brand_id?.$id;
    const { data: brand } = useGetBrandById(brandId);

    if (!post.creator) return;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post?.creator?.imageUrl || '/assets/images/coffee-icon.svg'}
                            alt="creator"
                            className="rounded-full w-12 lg:h-12"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-dark-1"> {post.creator.name} </p>

                        <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
                            <p> {formatTimeAgo(post.$createdAt)}</p>
                            <p> -- </p>
                            <p> {post.location} </p>
                        </div>
                    </div>
                </div>

                <Link to={`update-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden"}`}>
                    <img
                        src="assets/icons/edit.svg"
                        alt="edit"
                        width={25}
                        height={25}
                    />
                </Link>
            </div>

            <Link to={`/posts/${post.$id}`}>
                <div className="small-medium lg:base-medium py-3">
                    <div className="flex flex-row justify-start items-center py-3">
                        <img src={brand?.imageUrl} alt={`${brand?.name} logo`} className="w-12 h-12 rounded-full mr-2" />
                        <h3 className="text-lg font-semibold text-amber-800"> {brand?.name}</h3>
                        <p className="italic text-base px-5"> {post.type}</p>
                    </div>
                    {post?.rating ? (<div className="py-5"><RatingBar value={post?.rating} /></div>) : null}
                    <p className="py-5"> {post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string) => (
                            <li key={tag} className="italic text-light-3">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={post.imageUrl || 'assets/images/profile-default.png'}
                    alt="post image"
                    className="post-card_img"
                />
            </Link>

            <PostStats post={post} userId={user.id} />

        </div>
    )
}

export default PostCard