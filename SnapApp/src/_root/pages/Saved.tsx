import { useUserContext } from '@/context/AuthContext';
import { useGetSaves } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const Saved = () => {
  const { user } = useUserContext();
  const { data: saves, isLoading: isFetchingSavedPosts } = useGetSaves(user.id);
  
  return (
    <div className="saved-container">
      <div className="saves-inner_container">
          <img src="../assets/icons/save.svg" alt="save" width={40} height={40} />
          <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>
          <div className="flex-center gap3 bg-slate-300 rounded-x1 px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-dark-3">All</p>
          <img
            src="../assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
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
                    <li key={save.post} className="saves-card">
                      <Link to={`/posts/${save.post.$id}`}>
                        <img
                          src={save.post.imageUrl || 'assets/images/profile-default.png'}
                          alt="post image"
                          className="rounded-[20px]"
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