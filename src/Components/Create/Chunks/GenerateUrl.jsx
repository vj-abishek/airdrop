import React from 'react';
import Button from '../../Utils/Button';

export default function GenerateUrl({ onClicks, show }) {
  return (
    <div
      tabIndex="0"
      role="button"
      aria-pressed={show}
      onClick={onClicks}
      id="generateURlWrapper"
      className="mt-8 cursor-pointer"
    >
      <Button>Invite Friend</Button>
    </div>
  );
}
