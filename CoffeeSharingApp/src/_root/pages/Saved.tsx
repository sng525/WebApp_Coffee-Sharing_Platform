import { useUserContext } from '@/context/AuthContext';
import { getSavesByUserId } from '@/lib/appwrite/api';
import { useGetCurrentUser, useGetSaves } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

const Saved = () => {
  const { user } = useUserContext();
  //const { data: save } = useGetSaves(user.id);

  //console.log(save);

  const savePosts = user?.save?.map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: user.imageUrl,
      },
    }))
    .reverse();

  if (savePosts?.length === 0) {
      return <p>Not available</p>;
  }

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

      <ul className="user-grid">
            {savePosts?.map((savePost: Models.Document) => (
                <li key={savePost.$id} className="saves-card">
                    <Link to={`/posts/${savePost.$id}`}>
                        <img
                            src={savePost.imageUrl || 'assets/images/profile-default.png'}
                            alt="post image"
                            className="rounded-[20px]"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Saved