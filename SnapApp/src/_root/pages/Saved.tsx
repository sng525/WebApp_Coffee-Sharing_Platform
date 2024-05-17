import { useGetSaves } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const Saved = () => {
  const { data: saves, isLoading: isFetchingSavedPosts } = useGetSaves();

  return (
    <div className="saved-container">
      <div className="flex flex-row gap-3 pt-5 px-5 items-center justify-center">
        <img src="../assets/icons/save.svg" alt="save" width={45} height={45} />
        <h2 className="h2-bold text-left w-full">Saved Posts</h2>
      </div>

      <div>
        {
          isFetchingSavedPosts && !saves ? (
            <Loader />
          ) : (
            <div>
              <ul className="user-grid">
                {
                  saves?.documents?.map((save: Models.Document) => (
                    <li key={save.post} className="user-card">
                      <Link to={`/posts/${save.post.$id}`}>
                        <img
                          src={save.post.imageUrl || 'assets/images/profile-default.png'}
                          alt="post image"
                        />
                      </Link>

                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  )
}

  export default Saved