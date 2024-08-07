import PostStats from '@/components/shared/PostStats';
import RatingBar from '@/components/shared/RatingBar';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useGetBrandById, useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { formatTimeAgo } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostDetails = () => {

  const { id } = useParams();

  // Fetch the post details
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext();
  const { mutateAsync: DeletePost } = useDeletePost();
  const brandId = post?.brand_id?.$id;
  const { data: brand } = useGetBrandById(brandId);

  const navigate = useNavigate();

  const handleDeletePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!post) return;

    try {
      await DeletePost({ postId: id, imageId: post?.imageId });
      navigate('/');
    } catch (error) {
      console.log(error);
    }

  };

  return (
    // Fix the UI

    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img
                  src={post?.creator?.imageUrl || '/assets/images/coffee-icon.svg'}
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-dark-1"> {post?.creator.name} </p>

                  <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
                    <p> {formatTimeAgo(post?.$createdAt)}</p>
                    <p> -- </p>
                    <p> {post?.location} </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link to={`/update-post/${post?.$id}`} className={
                  `${user.id !== post?.creator.$id && 'hidden'}`
                }>
                  <img src={"../assets/icons/edit.svg"} alt="edit" width={25} height={25} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`
                  }>
                  <img src="/assets/icons/delete.svg" alt="Delete" width={25} height={25} />
                </Button>

              </div>
            </div>

            <hr className="border w-full border-dark-4/35" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <div className="flex flex-row justify-start items-center py-3">
                <img src={brand?.imageUrl} alt={`${brand?.name} logo`} className="w-12 h-12 rounded-full mr-2" />
                <h3 className="text-lg font-semibold text-amber-800"> {brand?.name}</h3>
                <p className="italic text-base px-5"> {post?.type}</p>
              </div>
              {post?.rating ? (<div className="py-5"><RatingBar value={post?.rating} /></div>) : null}
              <p className="py-3"> {post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )
      }

    </div >
  )
}

export default PostDetails