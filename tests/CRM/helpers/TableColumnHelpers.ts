import { Locator } from "playwright";
export type ColumnInfor = {
    index : number,
    text : string
}

export type ColumnMap = Record <string,ColumnInfor>


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

export async function getCellTextSimple(cell : Locator, columnKey : string, columnCleaner?: Record<string, ColumnTextCleaner>) : Promise<string> {
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
        return values
    }