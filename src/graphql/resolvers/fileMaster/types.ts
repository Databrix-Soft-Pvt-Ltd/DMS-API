export interface FileMaster {
    id: number;
    fileName: string;
    filePath: string;
    pageCount: number;
    fileSize: number;
    fileExtern: string;
    fullContent: string;
    isEncrypted: boolean;
    cloudPath: string;
    tempId: number;
    cabinetId: number;
    folderId: number;
    subFolderId: number;
    isIndexing: boolean;
    isTagging: boolean;
    isArchive: boolean;
    isMaker: boolean;
    makerBy: number;
    makerDate: string;
    isChecker: boolean;
    checkerBy: number;
    createdDate: string;
    uploadBy: number;
    uploadedDate: string;
}
