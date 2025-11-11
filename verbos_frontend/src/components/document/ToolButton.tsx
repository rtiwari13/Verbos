import React, {  FC, MouseEvent } from 'react';

interface ToolbarButtonProps {
  command: string;
  title: string;
  icon: React.ReactElement;
}



const  ToolbarButton: FC<ToolbarButtonProps> = ({ command, title, icon }) => {
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
   
    document.execCommand(command, false , undefined);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      title={title}
      className=""
    >
      {icon}
    </button>
  );
}

export default ToolbarButton;