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
// function toCamelCase(text: string): string {
//     const words = text.toLocaleLowerCase().split(' ');

//     let result = words[0]
//     for(let i=1;i<words.length;i++) {
//         const word = words[i]
//         const chuHoa = word.charAt(0).toUpperCase() + word.slice(1)
//         result+=chuHoa
//     }
//     return result;
// }

// // const ketQua = toCamelCase('HEllo World code')
// // console.log(ketQua)
// // Có trường hợp mà Header của chúng ta có chứa dấu cách : ('      Hoc           JS     ') -> 'Hoc JS'
// function cleanHeaderText(text: string) : string {
//     const parts = text.split(' ');
//     const words = parts.filter((word)=> word !== '')
//     return words.join(' ')
// }

// // console.log(cleanHeaderText('  Hoc    JS    '))

// //hàm chính ( logic mapping )
// const tableHeaders = ['   ID  ', '  Date Created', 'customer name']

// function createColumnMap(rawHeader) {
//     const map = {};

//     for(let index = 0; index < rawHeader.length; index++) {
//         let raw = rawHeader[index]

//         const clean = cleanHeaderText(raw)
//         const info = {
//             columnIndex: index,
//             headerText : clean
//         }

//         const camelKey = toCamelCase(clean)
//         if(camelKey) map[camelKey] = info;

//         const lowerKey = clean.toLowerCase()
//         if(lowerKey) map[lowerKey] = info;
//     }

//     return map;
// }

// const columnMap = createColumnMap(tableHeaders)
//console.log(columnMap)

//muon dung kieu camel case
// console.log("1.Tìm cột 'dateCreated' dev dùng", columnMap['dateCreated'])

// console.log("2. Tìm cột 'date created' nếu như BA thích dùng", columnMap['date created'])


// const student = {
//     name : 'An',
//     age :18
// }

// console.log(student.name)
// student.age = 30
// console.log(student.age);


// let tenCot = 'Email'
// let map = {}

// map.tenCot = 'Data A';
// //map[tenCot] = 'Data A'
// //console.log(map);

// //Ket qua mong muon la {"Email": "Data"}

// type HoaDon = Record<string, number>
// const gioHang = ['Tao', 'Banh', 'Tao', 'Sua', 'Banh', 'Tao']

// function tinhTien(danhsachHang: string[]) : HoaDon{
//     const ketQua : HoaDon = {};
//     for(let i=0;i<danhsachHang.length;i++) {
//         const tenMonHang = danhsachHang[i]

//         if(ketQua[tenMonHang]){
//             ketQua[tenMonHang] = ketQua[tenMonHang] + 1;
//         } else {
//             ketQua[tenMonHang] = 1;
//         }
//     }
//     return ketQua;
// }

// const finalBill = tinhTien(gioHang)
// console.log(finalBill)


//--------------------------------------------------------------------------------------------------------------------
// let domReadCount = 0;

// async function createColumnMapSimple(headersLocator){
//     domReadCount++;
//     console.log('[DOM ] đang đọc Header để xây Map...(tốn 500ms)')

//     return {
//         Name : {index : 0},
//         age : {index : 1},
//         email : {index : 2}
//     }
// }

// async  function getColumnInfor(headers, key, cache) {
//     let map = cache;

//     if(!map) {
//         map = await createColumnMapSimple(headers);
//     }
//     console.log('Vi da co cache roi nen ko build lai nua')
//     return {infor: map[key], cololumnMap : map}
// }
// async function getCellText() {
//     return 'Data';
// }

// async function buildRowData(headers, row, keys, cache) {
//     const rowData = {}

//     let currentMap = cache;
//     for(const key of keys) {
//         const result = await getColumnInfor(headers, key, currentMap)
//         // cập nhật lại map cho vòng lặp sau
//         currentMap = result.cololumnMap 
//     }
//     return { rowData , columnMap : currentMap }
// }

// const keyToGet= ['name', 'age', 'email']

// const totoRows = 5;

// async function runScenario(name, cacheStrategy) {
//     console.log(`Chay kich ban ${name}`)
//     domReadCount = 0;

//     let globalCache = null;

//     for(let i=0;i< totoRows;i++) {
//         console.log(`Xu ly dong so ${i+1}`);
//         const inputCache = cacheStrategy ? globalCache : null;
//         const result = await buildRowData(null, null, keyToGet, inputCache);

//         if(cacheStrategy) {
//             globalCache = result.columnMap;
//         }
//     }

//     console.log(`So dong da xu ly ${totoRows}`);
//     console.log(`So lan doc lai header : ${domReadCount}`);

//     if(domReadCount > 1) {
//         console.log('Hieu nang Kem');
//     }else {
//         console.log('Hieu nang tot');
//     }
// }

// (async () => {
//     await runScenario('Khong dung cache', false)
//     await runScenario('Co dung cache', true)
// })();

//----------------------------------------------------------------------------------------------------------------------
//input : la chuoi ban
//output : chuoi sach
// cta can xu li 1 so cot dac biet , va cac cot khac xu ly binh thuong

// type DataCleaner = (rawValue: string) => string;
// type CleanerMap = Record<string, DataCleaner>;

// const dataCleaner : CleanerMap = {
//     // Luật 1 : giá tiền
//     //input "$ 1,200.50 USD" ->Output: 1200.50
//     price : (raw) => {
//         if(!raw) return '0'
//         let text = raw

//         if(text.includes('$')) {
//             text = text.replace('$', '')
//         }

//         if(text.includes('USD')) {
//             text.replace('USD', '')
//         }
//         // 1,200 => [1, 200] -> 1200
//         text = text.split(',').join('')
//         return text.trim()
//     },
//     //Luật 2: trạng thái 
//     //['ACTIVE'] -> 'Active'
//     status: (raw) => {
//         if(!raw) return ''
//         let text = raw.trim()
//         if(text.startsWith('[')) {
//             text = text.replace('[','')
//         }
//         if(text.endsWith(']')) {
//             text = text.replace(']','')
//         }
//         const firstChar = text.charAt(0).toUpperCase()
//         const rest = text.slice(1).toLowerCase()
//         return firstChar+rest;
//     }
// }

// function processRow(rowData : Record<string, string>, cleaners : CleanerMap) : Record<string,string> {
//     const cleanRow : Record<string,string> = {};
//     const keys = Object.keys(rowData)

//     for(const key of keys) {
//         const rawValue = rowData[key]
//         const cleanerFunction = cleaners[key]
//         if(cleanerFunction) {
//             console.log(`Dang sua cot ${key}`)
//             cleanRow[key] = cleanerFunction(rawValue);
//         } else {
//             // neu k co bo xu li rieng cho moi man hinh
//             cleanRow[key] = rawValue.trim()
//         }
//     }
//     return cleanRow;
// }

// const dirtyData = {
//     id: '         101       ',
//     price : '$ 1,500.00 USD',
//     status : '[in_STOCK]'
// }

// console.log('Du lieu goc', dirtyData)
// const cleanData = processRow(dirtyData, dataCleaner)
// console.log('Du lieu sach', cleanData)



// function isMatch(cellText: string, keyWord: string) : boolean {
//     return cellText.toLowerCase().includes(keyWord.toLowerCase());
// }

// const ketQua = isMatch('Apple Inc', 'apple')
// console.log(ketQua);

// type Matcher = string | ((text: string) => boolean)

// function checkCondition(cellValue: string, condition: Matcher) {
//     if (typeof condition === 'string') {
//         return cellValue.includes(condition)
//     }

//     if (typeof condition === 'function') {
//         return condition(cellValue)
//     }

//     return false
// }

// const rowText = '1500'
// //c1: dung string
// const result1 = checkCondition(rowText, '1500')
// console.log(result1);
// //c2
// const result2 = checkCondition(rowText, (text) => {
//     const number = parseInt(text);

//     return number > 1000;
// })
// console.log(result2);

const KHO_HANG = [
    { id: 1, ten: 'Samsung S24', mau: 'Den', gia: '20tr', tonKho: 10, viTri: 'Kệ A' },
    { id: 2, ten: 'Iphone 15', mau: 'Den', gia: '25tr', tonKho: 2, viTri: 'Kệ B' },
    { id: 3, ten: 'Xiaomi 12', mau: 'Hong', gia: '15tr', tonKho: 6, viTri: 'Kệ C' },
    { id: 4, ten: 'iPhone 17 promax', mau: 'Titan', gia: '20tr', tonKho: 18, viTri: 'Kệ D' },
];
const COT_MAC_DINH = ['ten', 'gia'];

//B1: Dinh vi
function robotTimHang(filter) {
    console.log(`B1: Đang đi tìm hàng khớp lệnh ${filter}`);
    for (const sanPham of KHO_HANG) {
        let khopTatCa = true;
        for (const key of Object.keys(filter)) {
            if (sanPham[key] !== filter[key]) {
                khopTatCa = false;
                break;
            }
        }
        if (khopTatCa) {
            console.log(`Tim thay tai: ${sanPham.viTri} (ID: ${sanPham.id})`);
            return sanPham;
        }
    }
    throw new Error(' Khong tim thay hang')
}

//B2. Quyết định
function roboQuyetDinhThongTin(filter, yeuCauLay, macDinh) {
    // ưu tiêu 1 : sếp chỉ định rõ ràng
    if(yeuCauLay && yeuCauLay.length > 0) {
        console.log(` Sếp bảo lấy : ${yeuCauLay}`);
        return yeuCauLay;
    }

    // ưu tiên 2:
    if(macDinh && macDinh.length > 0) {
        console.log(`E lấy theo mặc định ${macDinh}`)
        return macDinh;
    }

    //ưu tiên 3: Lấy đúng cái dùng để tìm kiếm
    console.log('Lay theo filter: ', Object.keys(filter));
    return Object.keys(filter);
}

//B3. Trich xuat
function robotDocThongTin(sanPham, danhSachCanLay) {
    console.log('Dang doc thong tin');
    const baoCao = {};

    for(const thongTin of danhSachCanLay) {
        baoCao[thongTin] = sanPham[thongTin]
    }
    return baoCao;
}

///
function roBotThucHienNhiemVu(filters, columnToget) {
    //b1
    const sanPham = robotTimHang(filters);
    //b2 
    const cacCotCanLay = roboQuyetDinhThongTin(filters, columnToget, COT_MAC_DINH);

    //b3
    const ketQua = robotDocThongTin(sanPham, cacCotCanLay);

    console.log('ket qua bao cao', ketQua);
    return ketQua;
}

roBotThucHienNhiemVu(
    {
        ten: 'Xiaomi 12',
        mau: 'Hong',
    },
    ['ten', 'gia']
);
