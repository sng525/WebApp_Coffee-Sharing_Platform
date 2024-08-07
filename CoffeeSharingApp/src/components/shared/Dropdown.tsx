import { useState } from 'react';

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  hasImage?: boolean;
  fieldChange: (value: string) => void;
}

const Dropdown = ({id, title = 'Select', data, hasImage, fieldChange}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>();

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    fieldChange(item.name);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        id={id}
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={'flex items-center w-full py-2 px-4 bg-white text-black'}>
        {selectedItem && <img src={selectedItem?.imageUrl} alt={selectedItem?.name} className="w-10 h-10 rounded mr-4"/>}
        <span>{selectedItem?.name || title}</span>
      </button>

      {isOpen && (
        <div aria-label='Dropdown menu' className={'absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10'}>
          <ul aria-labelledby={id} className='leading-10'>
            {data.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={`flex items-center py-2 cursor-pointer hover:bg-gray-200 px-3 ${selectedItem?.id === item.id ? 'bg-gray-300' : ''}`}>
                {hasImage && (
                  <img
                    src={item.imageUrl}
                    alt='image'
                    loading='lazy'
                    className='w-10 h-10 rounded-full bg-gray-200 object-cover me-2'
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;