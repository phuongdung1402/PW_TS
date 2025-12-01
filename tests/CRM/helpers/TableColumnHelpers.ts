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