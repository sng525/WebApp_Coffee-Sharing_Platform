import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite'
import { Loader } from 'lucide-react';
import { useState } from 'react';

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isPendingSave } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isPendingDeleteSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation(); // to stop the muse from clicking other parts

        let newLikes = [...likes]; // all the previous likes
        const hasLiked = newLikes.includes(userId);

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId); // keep all the likes besides the current like
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post?.$id || '', likesArray: newLikes })
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.$id == post?.$id)

        // Delete the save
        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        } else {
            savePost({ postId: post?.$id || '', userId })
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className='flex gap-2 mr-5'>
                <img
                    src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                    alt="like"
                    width={30}
                    height={30}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className='flex gap-2'>
                { isPendingSave || isPendingDeleteSaved ? <Loader/> : <img
                    src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="save"
                    width={30}
                    height={30}
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />}
            </div>
        </div>
    )
}

export default PostStats

