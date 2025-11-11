"use client";

import { Card } from "@/components/ui/card";
import Tools from "./ToolBar";
import { useState, useEffect, useRef } from "react";
import axios from "@/lib/axiosInstance";
import { Document } from "@/types/document";
import { useAppSelector, useAppDispatch } from "@/redux/storeHooks";
import {
  fetchSelectedDocument,
  addNewDocument,
  updateDocument,
} from "@/redux/features/docs/docSlice";

export default function SingleDocPage({ documentID }: { documentID: number }) {
  const initialContent = "<p>Start typing here ... <p>";
  const editorRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const doc = useAppSelector((state) => state.docs.selectedDocument);

 async function fetchInitialData(documentId: number) {
  try {
    const response = await axios.get(`/document/${documentId}`);
    if (response?.data?.success === true && response?.data?.Document) {
      const { Document: document } = response.data;
      dispatch(fetchSelectedDocument({ document }));

      if (editorRef?.current) {
        editorRef.current.innerHTML = document.content || initialContent;
      }
    }
  } catch (error) {
    console.log(error);
  }
}



  useEffect(() => {
    if (documentID) {
      fetchInitialData(Number(documentID));
    }
  }, [documentID]);



  const handleChange = () => {
    if (doc && editorRef.current) {
      dispatch(
        updateDocument({
          document: {
            ...doc,
            content: editorRef.current.innerHTML,
          },
        })
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-muted/30 p-4">
      <Tools />
      {/* Document editor */}
      <Card className="w-[816.5px] h-[1056.5px] bg-accent shadow-md p-8">
        {/* <textarea
          placeholder="Start Writing..."
          id=""
          value={doc?.content}
          onChange={handleChange}
          className="text-muted-foreground"
        >
          {doc?.content}
        </textarea> */}

        <div
          ref={editorRef}
          contentEditable={true}
          onInput={handleChange}
          className="p-6 h-64 overflow-y-auto prose max-w-none focus:outline-none"
          // dangerouslySetInnerHTML={{ __html: content }} <- This line was removed
          suppressContentEditableWarning={true}
        />
      </Card>
    </div>
  );
}
