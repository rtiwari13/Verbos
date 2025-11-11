export interface Document {

    id : number ,
    name : string,
    content : string,
    created_at : Date,
    updated_at : Date,
    user_id : number,

}

export interface listDocuments {
    documents : Document[],
    selectedDocument : Document | null,
}

