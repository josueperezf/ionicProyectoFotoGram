export interface FileUpload {
    name: string;
    data: Data;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv:Function;
}
 
interface Data {
type: string;
data: number[];
}