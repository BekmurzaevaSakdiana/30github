import React from "react";

interface FilterModalProps {
    handleFilterModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ handleFilterModal }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="w-full max-w-4xl mx-auto rounded-lg p-5"
        style={{
          background:
            "linear-gradient(90.12deg, #FFBEC0 0.69%, #FF96BC 81.58%)",
          position: "relative",
        }}
      >
        <button
          className="absolute top-2 right-2"
          onClick={handleFilterModal}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <form action="">
          <div className="hair">
            <p className="font-bold text-lg mt-8">Тип волос</p>
            <Checkbox label="Для всех типов" count="(count)" />
            <Checkbox label="Сухие" count="(1)" />
            <Checkbox label="Жирные" count="(2)" />
            <Checkbox label="Нормальные" count="(1)" />
          </div>

          <div className="hair">
            <p className="font-bold text-lg mt-8">Цена</p>
            <Checkbox label="1500 - 5000 тг" count="(103)" />
            <Checkbox label="Samsung" count="(141)" />
            <Checkbox label="Xiaomi" count="(79)" />
            <Checkbox label="BQ" count="(135)" />
          </div>

          <div className="hair">
            <p className="font-bold text-lg mt-8">Бренд</p>
            <Checkbox label="Apple" count="(103)" />
            <Checkbox label="Samsung" count="(141)" />
            <Checkbox label="Xiaomi" count="(79)" />
          </div>
        </form>
      </div>
    </div>
  );
};

interface CheckboxProps {
  label: string;
  count: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, count }) => (
  <div className="checkbox flex items-center gap-3 mt-3">
    <input className="px-4" type="checkbox" id={label} />
    <label htmlFor={label}>
      <p className="text-sm font-normal">
        {label} <span className="text-gray-400">{count}</span>
      </p>
    </label>
  </div>
);

export default FilterModal;
