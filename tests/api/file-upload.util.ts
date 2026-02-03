import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_FOLDER = process.env.UPLOAD_FOLDER || 'files'

const MIME_TYPES: Record<string, string> = {
    //ảnh (.jpg )
    '.jpg' : 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',

    //file

    '.txt': 'text/plain',
    '.json': 'application/json'
}

export interface MultipartFile {
    name: string;
    mimeType: string;
    buffer: Buffer;
}

export function loadFromFolder(fileName: string, folder?:string) : MultipartFile {
    const targetFolder = folder || DEFAULT_FOLDER;


    //path.isAbsolute() => kiểm tra xem path có phải là absolute hay ko ( đường dẫn của file tính từ ổ đĩa windows : C:\ , D:\)
    //relative path : đường dẫn tương đối , từ thư mục hiện tại
    

}
