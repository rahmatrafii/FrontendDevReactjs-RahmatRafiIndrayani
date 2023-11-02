import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

const CustomFilter = ({ options, selected, setSelected }) => {
  return (
    <div className="w-max">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
        }}
      >
        <div className="relative w-max z-10">
          <Listbox.Button className="relative w-full min-w-[127px] flex justify-between items-center cursor-pointer rounded-sm bg-white py-2 px-3 text-left shadow-md sm:text-sm border">
            <span className="block truncate">{selected.name}</span>
            <img
              src="/icon/chevron-up-down.svg"
              alt="up down"
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.key}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? "bg-blue-600 text-white " : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
