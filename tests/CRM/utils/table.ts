//Coloumn map

//dữ liệu đầu vào giống như đọc từ thead
// const headers = ['ID', 'Full name', 'Email', 'Phone']

// //mục tiêu tạo ra 1 cái map ( sơ đồ )
// function createSimpleMap(headerList) {
//     const map = {}
//     for(let index = 0; index < headerList.length; index++) {
//         const tenCot = headerList[index];
//         map[tenCot] = index;
//         console.log(`Da ghi nho cot ${tenCot} nam o vi tri ${index}`)
//     }
//     return map;
// }
// const myMap = createSimpleMap(headers);
// console.log(myMap['Full name'])

//Viết 1 hàm biến 1 word thành camelCase
function toCamelCase(text: string): string {
    const words = text.toLocaleLowerCase().split(' ');

    let result = words[0]
    for(let i=1;i<words.length;i++) {
        const word = words[i]
        const chuHoa = word.charAt(0).toUpperCase() + word.slice(1)
        result+=chuHoa
    }
    return result;
}

// const ketQua = toCamelCase('HEllo World code')
// console.log(ketQua)
// Có trường hợp mà Header của chúng ta có chứa dấu cách : ('      Hoc           JS     ') -> 'Hoc JS'
function cleanHeaderText(text: string) : string {
    const parts = text.split(' ');
    const words = parts.filter((word)=> word !== '')
    return words.join(' ')
}

// console.log(cleanHeaderText('  Hoc    JS    '))

//hàm chính ( logic mapping )
const tableHeaders = ['   ID  ', '  Date Created', 'customer name']

function createColumnMap(rawHeader) {
    const map = {};

    for(let index = 0; index < rawHeader.length; index++) {
        let raw = rawHeader[index]

        const clean = cleanHeaderText(raw)
        const info = {
            columnIndex: index,
            headerText : clean
        }

        const camelKey = toCamelCase(clean)
        if(camelKey) map[camelKey] = info;

        const lowerKey = clean.toLowerCase()
        if(lowerKey) map[lowerKey] = info;
    }

    return map;
}

const columnMap = createColumnMap(tableHeaders)
//console.log(columnMap)

//muon dung kieu camel case
// console.log("1.Tìm cột 'dateCreated' dev dùng", columnMap['dateCreated'])

// console.log("2. Tìm cột 'date created' nếu như BA thích dùng", columnMap['date created'])


const student = {
    name : 'An',
    age :18
}

console.log(student.name)
student.age = 30
console.log(student.age);


let tenCot = 'Email'
let map = {}

//map.tenCot = 'Data A';
map[tenCot] = 'Data A'
console.log(map);

//Ket qua mong muon la {"Email": "Data"}
type HoaDon = Record<string, number>
const gioHang = ['Tao', 'Banh', 'Tao', 'Sua', 'Banh', 'Tao']

function tinhTien(danhsachHang: string[]) : HoaDon{
    const ketQua : HoaDon = {};
    for(let i=0;i<danhsachHang.length;i++) {
        const tenMonHang = danhsachHang[i]

        if(ketQua[tenMonHang]){
            ketQua[tenMonHang] = ketQua[tenMonHang] + 1;
        } else {
            ketQua[tenMonHang] = 1;
        }
    }

}