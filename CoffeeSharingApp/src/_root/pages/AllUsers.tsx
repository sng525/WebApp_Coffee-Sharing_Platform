import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const AllUsers = () => {
    const { data: users, isLoading } = useGetUsers();

    return (
        <div className="user-container">
            <div className="flex flex-row gap-3 pt-5 px-5 items-center justify-center">
                <img src="../assets/icons/users.svg" alt="All users" width={45} height={45} />
                <h2 className="h2-bold text-left w-full">All Users</h2>
            </div>

            <div>
                {
                    isLoading && !users ? (
                        <Loader />
                    ) : (
                        <div>
                            <ul className="user-grid">
                                {
                                    users?.documents?.map((user: Models.Document) => (
                                        <li key={user.$id} className="user-card">
                                            <UserCard user={user} />
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

export default AllUsers