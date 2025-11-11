import React from "react";
import { Input } from "@/components/ui/input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import {
  Italic,
  Search,
  File,
  ListChecks,
  Redo2,
  Undo2,
  ChevronDown,
  Bold,
  Underline,
  Baseline,
  Brush,
  Link,
  Image,
  List,
  ListOrdered,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
} from "lucide-react";

import { useAppSelector } from "@/redux/storeHooks";
import ToolbarButton from "./ToolButton";

export default function Tools() {
  const doc = useAppSelector((state) => state.docs.selectedDocument);
  const [position, setPosition] = React.useState("bottom");

  // async function onSave = ( ) => {

  // }

  const handleOnchange = () => {};
  return (
    <div className="">
      {/* First row: logo + title + menu */}
      <div className="flex w-full max-w-6xl items-center gap-4 border-b pb-2 mb-2">
        {/* doc logo */}
        <a href="/document">
          <File size={36} className="text-primary" />
        </a>

        {/* doc title & menubar */}
        <div className="flex flex-col w-full">
          <Input
            onChange={handleOnchange}
            value={doc?.name}
            type="text"
            placeholder="Untitled Document"
            className="text-lg font-medium border-0 focus-visible:ring-0 p-0 mb-1"
          />

          <Menubar className="text-sm">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Document</MenubarItem>

                <MenubarItem>Open a File</MenubarItem>

                <MenubarSeparator />

                <MenubarItem>Make a copy </MenubarItem>
                <MenubarItem>Download </MenubarItem>
                <MenubarItem>Rename </MenubarItem>

                <MenubarSeparator />
                <MenubarItem>Share </MenubarItem>
                <MenubarItem>Email </MenubarItem>

                <MenubarSeparator />
                <MenubarItem>Page setup </MenubarItem>
                <MenubarItem>Page color </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
                <MenubarItem>Select all </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Full Screen</MenubarItem>
                <MenubarItem>Read only</MenubarItem>
                <MenubarItem>Editing</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Insert</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Image</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Upload from computer</MenubarItem>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarItem>By URL</MenubarItem>
                  </MenubarSubContent>
                  <MenubarSeparator />

                  <MenubarItem> Horizontal line </MenubarItem>
                </MenubarSub>

                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Extension</MenubarTrigger>
              <MenubarTrigger>Tools</MenubarTrigger>
            </MenubarMenu>
            <Button
              size="sm"
              variant="default"
              className="gap-1 ml-auto text-accent-foreground"
            >
              Save
            </Button>
          </Menubar>
        </div>
      </div>

      {/* Second row: toolbar */}
      <div className="flex w-full max-w-6xl items-center gap-3 border-b pb-2 mb-4">
        <Search className="cursor-pointer" />
        <ToolbarButton
          command="undo"
          title=""
          icon={<Undo2 className="cursor-pointer" />}
        />
        <ToolbarButton
          command="redo"
          title=""
          icon={<Redo2 className="cursor-pointer" />}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              Normal Text <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem>Heading 1</DropdownMenuItem>
            <DropdownMenuItem>Heading 2</DropdownMenuItem>
            <DropdownMenuItem>Heading 3</DropdownMenuItem>
            <DropdownMenuItem>Paragraph</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              Arial <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem>Arial</DropdownMenuItem>
            <DropdownMenuItem>Times New Roman</DropdownMenuItem>
            <DropdownMenuItem>Roboto</DropdownMenuItem>
            <DropdownMenuItem>Georgia</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Font size control */}
        <div className="flex items-center gap-2 border rounded-md px-2 py-1 text-sm">
          <button className="hover:text-primary">−</button>
          <span>12</span>
          <button className="hover:text-primary">+</button>
        </div>

        {/* Text styling icons */}
        <div className="flex items-center gap-2 border-l pl-3">
          <ToolbarButton
            command="bold"
            title="Bold"
            icon={<Bold className="cursor-pointer" />}
          />

          <ToolbarButton
            command="italic"
            title="Italic"
            icon={<Italic className="cursor-pointer" />}
          />
          <ToolbarButton
            command="underline"
            title="Underline"
            icon={<Underline className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<Baseline className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<Brush className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<Link className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<Image className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<ListChecks className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<List className="cursor-pointer" />}
          />
          <ToolbarButton
            command=""
            title=""
            icon={<ListOrdered className="cursor-pointer" />}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <TextAlignStart className="cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="start">
                  <ToolbarButton
                    command="justifyLeft"
                    title=""
                    icon={<TextAlignStart className="cursor-pointer" />}
                  />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="center">
                  <ToolbarButton
                    command="justifyCenter"
                    title=""
                    icon={<TextAlignCenter className="cursor-pointer" />}
                  />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="justify">
                  <ToolbarButton
                    command=""
                    title=""
                    icon={<TextAlignJustify className="cursor-pointer" />}
                  />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="end">
                  <ToolbarButton
                    command="justifyRight"
                    title=""
                    icon={<TextAlignEnd className="cursor-pointer" />}
                  />
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
