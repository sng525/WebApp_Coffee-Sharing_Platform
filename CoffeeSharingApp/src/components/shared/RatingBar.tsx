type RatingBarProps = {
    value: number;
    onChange?: (rating: number) => void;
}

const RatingBar = ({value, onChange = () => {}} : RatingBarProps) => {

    return (
        <div>
            {
                [1, 2, 3, 4, 5].map((star) => (
                    <span 
                    key={star}
                    className="star"
                    style={{
                        cursor: 'pointer',
                        color: value >= star ? 'gold' : 'gray',
                        fontSize: `30px`,
                      }}
                    onClick={() => onChange(star)}>
                    {' '}★{' '}
                    </span>
                ))
            }
        </div>
    )
}

export default RatingBar