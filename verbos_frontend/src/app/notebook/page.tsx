import { ArrowLeft, ArrowRight, Redo2, Undo2 } from "lucide-react"

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
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button"

export default function Notebook() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-muted">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Verbos</h1>
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <ArrowRight className="w-5 h-5 cursor-pointer" />
          <Undo2 className="w-5 h-5 cursor-pointer" />
          <Redo2 className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="flex items-center gap-6">
          <div className="font-medium text-sm">Title</div>
          <div className="text-muted-foreground text-sm">Search</div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs cursor-pointer">
            P
          </div>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="border-b border-muted px-4 py-1 bg-muted/30">
        <Menubar>
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
            <MenubarTrigger>Profiles</MenubarTrigger>
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
        </Menubar>
      </div>

      {/* Notebook Body */}
      <div className="flex flex-1 bg-">
        {/* Sidebar - Notebooks */}
        <div className="w-[11%] border-r border-muted bg-muted-foreground/25 p-3">
          <h2 className="text-sm font-semibold mb-3">Notebooks</h2>
          <Button size="sm" className="w-full">
            + New Notebook
          </Button>
        </div>

        {/* Sidebar - Pages */}
        <div className="w-[12%] border-r border-muted bg-muted-foreground/50 p-3 flex flex-col">
          <h2 className="text-sm font-semibold mb-3">Pages</h2>
          <Button size="sm" className="w-full">
            + New Page
          </Button>
        </div>

        {/* Page Editor */}
        <div className="flex-1 p-6">
          <h2 className="text-lg font-medium mb-4">Untitled Page</h2>
          <div className="h-[80vh] w-full border border-dashed border-muted rounded-lg bg-background/50 p-4">
            Start writing your notes here...
          </div>
        </div>
      </div>
    </div>
  )
}




// import {  ArrowLeft, ArrowRight, Redo2, Undo2 } from "lucide-react";

// import {
//   Menubar,
//   MenubarCheckboxItem,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarRadioGroup,
//   MenubarRadioItem,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
// } from "@/components/ui/menubar"

// import { Button } from "@/components/ui/button";



// export default function Notebook() {
//   return (
//     <div className="min-h-screen">
//         <div className="flex flex-row gap-4">
//             <div className=""><h1>Verbos</h1></div>
//          <ArrowLeft />
//         <ArrowRight/>
//         <Undo2/>
//         <Redo2/>
//         <div className="">title</div>
//         <div className="">Search</div>
//         <div className="">Profile</div>
//         </div>
        

//         <div className="">
//             <Menubar>
//       <MenubarMenu>
//         <MenubarTrigger>File</MenubarTrigger>
//         <MenubarContent>
//           <MenubarItem>
//             New Tab <MenubarShortcut>⌘T</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem>
//             New Window <MenubarShortcut>⌘N</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem disabled>New Incognito Window</MenubarItem>
//           <MenubarSeparator />
//           <MenubarSub>
//             <MenubarSubTrigger>Share</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem>Email link</MenubarItem>
//               <MenubarItem>Messages</MenubarItem>
//               <MenubarItem>Notes</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//           <MenubarSeparator />
//           <MenubarItem>
//             Print... <MenubarShortcut>⌘P</MenubarShortcut>
//           </MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>Edit</MenubarTrigger>
//         <MenubarContent>
//           <MenubarItem>
//             Undo <MenubarShortcut>⌘Z</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem>
//             Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
//           </MenubarItem>
//           <MenubarSeparator />
//           <MenubarSub>
//             <MenubarSubTrigger>Find</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem>Search the web</MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>Find...</MenubarItem>
//               <MenubarItem>Find Next</MenubarItem>
//               <MenubarItem>Find Previous</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//           <MenubarSeparator />
//           <MenubarItem>Cut</MenubarItem>
//           <MenubarItem>Copy</MenubarItem>
//           <MenubarItem>Paste</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>View</MenubarTrigger>
//         <MenubarContent>
//           <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
//           <MenubarCheckboxItem checked>
//             Always Show Full URLs
//           </MenubarCheckboxItem>
//           <MenubarSeparator />
//           <MenubarItem inset>
//             Reload <MenubarShortcut>⌘R</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem disabled inset>
//             Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
//           </MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Toggle Fullscreen</MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Hide Sidebar</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>Profiles</MenubarTrigger>
//         <MenubarContent>
//           <MenubarRadioGroup value="benoit">
//             <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
//             <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
//             <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
//           </MenubarRadioGroup>
//           <MenubarSeparator />
//           <MenubarItem inset>Edit...</MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Add Profile...</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//     </Menubar>

//         </div>

       
//           <div className="  w-full min-h-[90vh] flex ">

//           {/* box-1 Notebook */}
//           <div className="  w-[16.25%] bg- border border-foreground ">
//             <h2>Notebooks</h2>
//             <Button className=" text-foreground "> + New Notebook</Button>
//           </div>

//           {/*box-2 Notebook Pages */}
//           <div className=" w-[20%] flex flex-col bg-sidebar border border-foreground"> Pages 
//             <Button className="text-foreground"> + New Page</Button>
//           </div>

//           {/* box Page Editor */}
//           <div className="w-full border border-foreground">
//             Untitled Page
//           </div>

//         </div>

//     </div>
//   )
// }