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
    
    //Để lấy được đường dẫn tuyệt đối của file : relative path  + process.cwd() (current working directory ) => absolute path 
    // Để join các đoạn path vs nhau : path.join('a','b')
    // Để trả về absolute path : path.resolve('a','b') -> /fullpath/to/a/b

    const filePath = path.isAbsolute(targetFolder) ?
    path.join(targetFolder, fileName) :
    path.resolve(process.cwd(), targetFolder, fileName);

    if(!fs.existsSync(filePath)) {
        throw new Error(`File ko tồn tại tại đường dẫn ${filePath}`);
    }

    //Lấy phần extension của file 
    const safeName = fileName.replace(/[^a-zA-z0-9._-]/g, '_');
    const ext = path.extname(fileName).toLowerCase();

    return {
        name: safeName,
        mimeType: MIME_TYPES[ext],
        buffer: fs.readFileSync(filePath),
    }


}
