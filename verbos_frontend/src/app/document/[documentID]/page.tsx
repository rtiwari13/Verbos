import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card";

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
} from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ documentID: string }>;
}) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-muted/30 p-4">
      {/* First row: logo + title + menu */}
      <div className="flex w-full max-w-6xl items-center gap-4 border-b pb-2 mb-2">
        {/* doc logo */}
        <a href="/document"><File size={36} className="text-primary" /></a>
        

        {/* doc title & menubar */}
        <div className="flex flex-col w-full">
          <Input
            type="text"
            placeholder="Untitled Document"
            className="text-lg font-medium border-0 focus-visible:ring-0 p-0 mb-1"
          />

          <Menubar className="text-sm">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
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
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Insert</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Format</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Tools</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Extension</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Second row: toolbar */}
      <div className="flex w-full max-w-6xl items-center gap-3 border-b pb-2 mb-4">
        <Search className="cursor-pointer" />
        <Undo2 className="cursor-pointer" />
        <Redo2 className="cursor-pointer" />

        {/* Dropdowns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              Open <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

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
          <Bold className="cursor-pointer" />
          <Italic className="cursor-pointer" />
          <Underline className="cursor-pointer" />
          <Baseline className="cursor-pointer" />
          <Brush className="cursor-pointer" />
          <Link className="cursor-pointer" />
          <Image className="cursor-pointer" />
          <ListChecks className="cursor-pointer" />
          <List className="cursor-pointer" />
          <ListOrdered className="cursor-pointer" />
          <TextAlignStart className="cursor-pointer" />
        </div>
      </div>

      {/* Document editor */}
      <Card className="w-[816.5px] h-[1056.5px] bg-accent shadow-md p-8">
        <p className="text-muted-foreground">Start Writing...</p>
      </Card>
    </div>
  );
}
