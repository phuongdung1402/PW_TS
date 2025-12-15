// {
//   id: { columnIndex: 0, headerText: 'ID' },
//   dateCreated: { columnIndex: 1, headerText: 'Date Created' },
//   'date created': { columnIndex: 1, headerText: 'Date Created' },
//   customerName: { columnIndex: 2, headerText: 'customer name' },
//   'customer name': { columnIndex: 2, headerText: 'customer name' }


import { Locator } from "playwright";
//type or interface đều được
export type ColumnInfor = {
    index : number,
    text : string
}

export type ColumnMap = Record <string,ColumnInfor>
export type TextMatcher = string | ((text: string)=> boolean)

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

function cleanHeaderText(text: string) : string {
    const parts = text.split(' ');
    const words = parts.filter((word)=> word !== '')
    return words.join(' ')
}


export async function createColumnMap(headers : Locator) : Promise<ColumnMap> {
    const count = await headers.count();
    const map : ColumnMap = {}

    for(let index = 0; index < count ; index++) {
        const headerLocator = await headers.nth(index);
        const rawText = await headerLocator.innerText()

        const clean = cleanHeaderText(rawText);

        const infor : ColumnInfor = {
            index,
            text : clean,
        };

        const camelKey = toCamelCase(clean)
        if(camelKey) {
            map[camelKey] = infor;
        }

        const lowerKey = clean.toLowerCase()
        if(lowerKey) {
            map[lowerKey] = infor;
        }
    }
    return map;
}
export async function getColumnInforSimple(
    headersLocator: Locator,
    columnKey: string,
    columnMapCache? : ColumnMap | null) : Promise<{info: ColumnInfor; columnMap: ColumnMap}> {
        // B1 : Thu dung cache neu co
        let map: ColumnMap | null = columnMapCache || null
        if(!map) {
            map = await createColumnMap(headersLocator)
        }
        // B2 : Tim column trong map
        let info = map[columnKey]

        // B3 : Neu ko tim thay, tao lai map tu DOM
        if(!info) {
            map= await createColumnMap(headersLocator)
            info = map[columnKey]
        }
        if(!info) {
            throw new Error(`Column ${columnKey} khong tim thay`)
        }
        return {info, columnMap: map}
}

export type ColumnTextCleaner = (cell : Locator) => Promise<string>

export async function getCellTextSimple(
    cell : Locator, 
    columnKey : string, 
    columnCleaner?: Record<string, ColumnTextCleaner>) : Promise<string> {
    // B1 : Kiem tra xem custom cleaner cho column key co hay ko
    const cleaner = columnCleaner?.[columnKey]

    if(cleaner){
        return cleaner(cell);
    }
    const text = await cell.textContent();
    return (text||'').trim()
}

export async function getColumnValuesSimple(
    headersLocator: Locator,
    rowsLocator: Locator, 
    columnKey: string,
    columnCleaner?: Record<string, ColumnTextCleaner>,
    columnMapCache? : ColumnMap | null ) : Promise<string[]> {

        const result = await getColumnInforSimple(headersLocator, columnKey, columnMapCache)
        const count = await rowsLocator.count();

        const values : string[] = [];
        for(let i=0;i<count;i++) {
            const cell = rowsLocator.nth(i).locator(`td:nth-child(${result.info.index + 1})`);
            values.push(await getCellTextSimple(cell, columnKey, columnCleaner))
        }
        return values;
    }


// Hàm xây dựng object chứa dữ liệu của 1 row
// Mục đích : lấy text từ nhiều cells trong 1 row -> trả về object với key = colummnKey , value = text từ cell
// Logic : 
// 1.loop qua từng columnKey ( từng cột)
// 2. tìm vị trí cột (index) từ column map
// 3. Lấy cell ở vị trí đó trong row
// 4. Lấy text từ cell
// 5. Lưu vào rowData object

export async function buildRowDataSimple(
    headerLocator: Locator,
    rowsLocator: Locator,
    colummnKeys: string[],
    columnCleaner?: Record<string, ColumnTextCleaner>,
    columnMapCache?: ColumnMap | null
) : Promise<{ rowData: Record<string, string>; columnMap: ColumnMap}> {
    // khoi tao object rong de luu du lieu cua row
    const rowData : Record<string, string> = {}
    let currentColumnMap = columnMapCache;
    for(const key of colummnKeys) {
        //b1. lay thong tin cot index
        const result = await getColumnInforSimple(headerLocator, key, columnMapCache)
        currentColumnMap = result.columnMap
        //b2.tao locator cho cell
        const cell = rowsLocator.locator(`td:nth-child(${result.info.index + 1})`);

        //b3.luu vao rowData va column map moi nhat
        rowData[key] = await getCellTextSimple(cell,key,columnCleaner)
    }

    return {rowData, columnMap: currentColumnMap!}
}

// Lay du lieu toan bo table
// Logic :
//1. Dem so luong row
//2. Loop qua tung row
//3. Voi 1 row : lay du lieu tu cac cot chi dinh
//4.push vao mang ket qua

export async function getTableDataSimple(
    headerLocator: Locator,
    rowsLocator: Locator,
    colummnKeys: string[],
    columnCleaner?: Record<string, ColumnTextCleaner>,
    columnMapCache?: ColumnMap | null
) : Promise<Array<Record<string,string>>> {
    const rowCount = await rowsLocator.count()
    const data: Array<Record<string,string>> =[]

    let currentColumnMap = columnMapCache

    for(let rowIndex=0; rowIndex < rowCount; rowIndex++){
        const row = rowsLocator.nth(rowIndex)

        const result = await buildRowDataSimple(headerLocator, row, colummnKeys, columnCleaner, currentColumnMap) 

        currentColumnMap = result.columnMap
        data.push(result.rowData)
    }

    return data
}


const textMatches = (cellValue: string, condition: TextMatcher): boolean => {
    // neu truyen vao 1 chuoi
    if(typeof condition === 'string'){
        return cellValue.includes(condition);
    }

    if(typeof condition === 'function') {
        return condition(cellValue)
    }

    return false;
};


//Logic : Lay vi tri cot
//Dem so luong row
//loop qua tung rows
//lay text o cell o cot do
//kiem tra text co khop vs matcher ko
//neu khop tra ve row - neu ko khop throw error
export async function findRowByColumnValueSimple(
    headersLocator: Locator,
    rowsLocator: Locator,
    columnKeys: string,
    matcher: TextMatcher,
    columnCleaner?: Record<string, ColumnTextCleaner>,
    columnMapCache?: ColumnMap | null
): Promise<Locator> {

    const result = await getColumnInforSimple(headersLocator, columnKeys, columnMapCache);
    const count = await rowsLocator.count();

    for(let i=0; i < count; i++) {
        const row = rowsLocator.nth(i);
        const cell = row.locator(`td:nth-child(${result.info.index + 1})`);
        const text = await getCellTextSimple(cell, columnKeys, columnCleaner);
        if(textMatches(text, matcher)) {
            return row
        }
    }

    throw new Error(`Unable to find a row where ${columnKeys} matches provided matcher`);
};


//B1 
export async function findRowByFilterSimple(
    headersLocator: Locator,
    rowsLocator: Locator,
    filters: Record<string, TextMatcher>,
    columnCleaner?: Record<string, ColumnTextCleaner>,
    columnMapCache?: ColumnMap | null
): Promise<Locator> {
    const keys = Object.keys(filter);
    const count = await rowsLocator.count()

    let currentColumnMap = columnMapCache;

    // tối ưu là lấy index trc , tránh phải tìm lại nhiều lần
    const columnInfos : ColumnInfor[] = []

    for(const key of keys) {
        const result = await getColumnInforSimple(headersLocator, key, currentColumnMap)
        currentColumnMap = result.columnMap;

        columnInfos.push(result.info)
    }

    //loop qua tung row de tim row khop voi tat ca filter
    for(let i=0; i< count; i++) {
        const row = rowsLocator.nth(i);

        let matchedAll = true;
        for(let j=0;j<keys.length;j++) {
            //lấy key và column infor tương ứng
            const key = keys[j];
            const info = columnInfos[j];

            const cell = row.locator(`td:nth-child(${info.index + 1})`)
            const text = await getCellTextSimple(cell, key, columnCleaner);

            if( !textMatches(text, filters[key])) {
                matchedAll = false;
                break;
            }

            // neu khop thi kiem tra filter tiep theo
        }
        if(matchedAll) {
            return row;
        }
    }
    throw new Error('Unable to find row matching filter')
}