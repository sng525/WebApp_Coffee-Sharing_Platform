import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Models } from 'appwrite'

type UserCardProps = {
    user: Models.Document
}


const UserCard = ({user} : UserCardProps) => {
    return (
        <div>
            <Link to={`/profile/${user.$id}`}>
                <img src={user.imageUrl || 'assets/images/default-profile.svg'}
                    alt="avatar"
                    className="rounded-full w-20 h-20"
                />
            </Link>

            <div className="flex flex-col items-center py-2">
                <p className="base-medium lg:body-bold text-dark-31"> {user.name} </p>
                <p className="base-small text-light-3"> @{user.username} </p>
            </div>

            <Button className="shad-button_follow py-5 px-5" >
                Follow
            </Button>
        </div>


    )
}

export default UserCard