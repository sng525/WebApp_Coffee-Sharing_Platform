import EquipmentForm from '@/components/forms/EquipmentForm'

const AddEquipment = () => {
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
            Add Brew Equipment
          </h2>
        </div>

        <EquipmentForm>

        </EquipmentForm>

      </div>
    </div>
  )
}

export default AddEquipment