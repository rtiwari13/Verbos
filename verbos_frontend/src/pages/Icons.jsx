import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    Bars3BottomLeftIcon,
    BoldIcon as HiBold,
    ItalicIcon as HiItalic,
    ListBulletIcon,
  } from "@heroicons/react/24/solid";
  
  export const BoldIcon = () => <HiBold className="w-5 h-5" />;
  export const ItalicIcon = () => <HiItalic className="w-5 h-5" />;
  export const UnderlineIcon = () => <span className="underline">U</span>;
  export const HeadingIcon = () => <span className="font-bold text-lg">H</span>;
  export const ListIcon = () => <ListBulletIcon className="w-5 h-5" />;
  export const UndoIcon = () => <ArrowUturnLeftIcon className="w-5 h-5" />;
  export const RedoIcon = () => <ArrowUturnRightIcon className="w-5 h-5" />;
  
  