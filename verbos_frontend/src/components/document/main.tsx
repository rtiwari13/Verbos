import {
  Table,
  TableBody,
  TableCell,
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
import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

import axios from "@/lib/axiosInstance";
import { Document } from "@/types/document";
import { useState, useEffect } from "react";


export default  function Main() {
  const [documents, setDocuments] = useState<Document[]>([]);

  async function fetchAllDocuments() {
    try {
      const response = await axios.get("/document");

      if (response?.data?.success === true) {
        const allDocuments: Document[] = response.data.Documents;
        setDocuments(allDocuments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const createNewDocument = async () => {
    try {
      const response = await axios.post("/document", {
        name: "Untitled Document",
        content: "",
      });

      if (response?.data?.success === true) {
        const newDocument: Document = response.data.document_created;
        setDocuments((prevDocs) => [...prevDocs, newDocument]);
        window.location.href = `/document/${newDocument.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <section className=" bg-secondary px-16 pb-16 pt-8  flex flex-col">
        <h1 className="text-md  mb-4">Create New Doc </h1>
        <button onClick={createNewDocument}>
          <Card className="w-34 h-40 rounded-sm hover:bg-muted hover:cursor-pointer">
            <div className="m-auto">
              <File size={48} className="text-chart-1" />
            </div>
          </Card>
        </button>
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
            {documents.map((document) => (
              <TableRow
                key={document.id}
                onClick={() => {
                  window.location.href = `/document/${document.id}`;
                }}
              >
                <TableCell className="font-medium w-[40%]">
                  {document.name}
                </TableCell>
                <TableCell className="w-[20%]">{document.user_id}</TableCell>
                <TableCell className="w-[20%]">
                  {new Date(document.updated_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right w-[20%]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        variant="outline"
                      >
                        <Ellipsis />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-25"
                    >
                      <div className="flex flex-col gap-2">
                        <Button variant="ghost">
                          <Pencil />
                          Rename
                        </Button>
                        <Button variant="ghost">
                          {" "}
                          <Trash2 /> Delete
                        </Button>
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
