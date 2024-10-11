import React, { useState } from 'react';

interface Props<T extends Record<string, any>> {
  onChange?: (value: string) => void;
  value?: string;
  list: T[];
  errorMessage?: string;
}

const Select = <T extends Record<string, any>>({
  onChange,
  value,
  list,
  errorMessage,
}: Props<T>) => {
  const [data, setData] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect } = event.target;
    setData(valueFromSelect);
    onChange && onChange(valueFromSelect);
  };

  return (
    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
        Danh mục sản phẩm
      </div>
      <div className="sm:w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select
            onChange={handleChange}
            name="category"
            className="h-10 w-full cursor-pointer rounded-none border border-b-black/10 px-3 outline-none"
            value={value ? value : data}
          >
            <option disabled>Chọn danh mục</option>

            {list &&
              list.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default Select;
