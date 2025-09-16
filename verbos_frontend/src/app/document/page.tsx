import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const documentNames = [
  {
    documentName: "doc002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
];

import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import DocNavbar from "./nav";
import { Ellipsis } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function DocumentHome() {
  return (
    <div className="">
      <DocNavbar />

      <section className=" bg-secondary px-16 pb-16 pt-8  flex flex-col">
        <h1 className="text-md  mb-4">Create New Doc </h1>
        <Card className="w-34 h-40 rounded-sm hover:bg-muted hover:cursor-pointer">
          <div className="m-auto">
            <File size={48} className="text-chart-1" />
          </div>
        </Card>
      </section>

      <section className="px-20">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Earlier</TableHead>
              <TableHead className="w-[20%]">Owned by</TableHead>
              <TableHead className=" w-[20%]">Last opened by me</TableHead>
              <TableHead className="text-right w-[20%]">More actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {documentNames.map((documentName) => (
              <TableRow key={documentName.documentName}>
                <TableCell className="font-medium w-[40%]">
                  {documentName.documentName}
                </TableCell>
                <TableCell className="w-[20%]">
                  {documentName.paymentStatus}
                </TableCell>
                <TableCell className="w-[20%]">
                  {documentName.paymentMethod}
                </TableCell>
                <TableCell className="text-right w-[20%]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline"><Ellipsis /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-25">
                      <div className="flex flex-col gap-2">
                        
                      <Button variant="ghost"><Pencil />Rename</Button>
                      <Button variant="ghost">  <Trash2 /> Delete</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
