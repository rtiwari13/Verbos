import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, listDocuments } from "@/types/document";

const initialState: listDocuments = {
  documents: [],
  selectedDocument: null,
};


const documentSlice = createSlice({
  name: " document",
  initialState,
  reducers: {
    fetchAllDoc: (
      state,
      action: PayloadAction<{ allDocuments: Document[] }>
    ) => {
      state.documents = action.payload.allDocuments;
    },

    fetchSelectedDocument : (
      state,action : PayloadAction  <{ document: Document }>
    ) => {
      state.selectedDocument = action.payload.document;
    },

    addNewDocument: (
      state,action : PayloadAction  <{ document: Document }>
    ) => {
      if (document ) {
       state.documents = [...state?.documents, action.payload.document]
      }
     
    },

    updateDocument: (
      state,action : PayloadAction <{document: Document}>
    ) => {
      state.selectedDocument = action.payload.document;
    },

    // deleteDocument: (state,action : PayloadAction <{documentId: number}>) => {
    //   state.selectedDocument = action.payload.documentId;
    // },

  },
});
 
export const {fetchAllDoc , fetchSelectedDocument , addNewDocument , updateDocument} = documentSlice.actions;
export default documentSlice.reducer