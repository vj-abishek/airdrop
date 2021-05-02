import React from 'react';

export default function ({
 label, onChange, name, value,
}) {
    return (
      <div className="mb-3 pt-2">
        <div className="flex mb-2 text-sm text-light">{label}</div>
        <input type="text" onChange={onChange} defaultValue={value} name={name} className="px-3 py-3 bg-secondary relative rounded-lg border-0 shadow outline-none focus:outline-none focus:ring w-full" />
      </div>
    );
}
