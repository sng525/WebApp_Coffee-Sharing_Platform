import PostForm from "@/components/forms/PostForm"

const CreateCoffee = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/gallery-add.svg"
            width={50}
            height={50}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Create Coffee
          </h2>
        </div>

        <PostForm action="Create">

        </PostForm>

      </div>
    </div>
  )
}

export default CreateCoffee