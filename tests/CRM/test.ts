
// as const ( const assertion )
// as const : sẽ khóa cứng object , ngăn chặn việc sửa đổi ngớ ngẩn 
const direction = {
    UP: 'up',
    DOWN: 'down'
} as const

const PI = 3.14;
// direction.UP = 'left'


const env = ['dev','uat','prod'] as const

// env.push('abc')
//=> Dùng cho biến ko thay đổi ( hay hằng số )

//typeof
//dùng để copy kiểu dữ liệu từ 1 đối tượng đã có sẵn
//Dùng typeof : để lấy kiểu dữ liệu

const settings = {
    theme : 'dard',
    notification : true,
    version : 1.0
}

//type
// interface Settings {
//     theme : string;
//     notifications: boolean;
//     version: number;
// }

type SettingType = typeof settings;

//keyof : lấy ra key của object
interface User{
    id:number;
    name:string;
    email:string;
}

type UserKeys = keyof User;
const idTest : UserKeys = 'id'

// tuong duong với
//type UserKeys = 'id' | 'name' | 'email'


const Colors = {
    Red: '#FF0000',
    Green: '#00FF00',
    Blue: '#0000FF'
} as const


// Có 2 cách để lấy giá trị trong 1 object
console.log(Colors.Green);
console.log(Colors['Blue']);


//viet 1 cai ham chi nhan dung ten mau co trong object
type ColorsType = typeof Colors;
type ColorsName = keyof typeof Colors

//b1 : typeof Colors => ra cai type la {Red: ''....}
//b2 : keyOf (b1) => keyof ColorType => union 'Red' | 'Green' | 'Blue'

function changeColor(color: ColorsName) {
    console.log(Colors[color]);
}
changeColor('Red')

const configDevEnv = {
    endPoint : 'https://api.com',
    timeOut: 5000,
    retries : 3,
}


const config = {
    endPoint : 'https://api.com',
    timeOut: 5000,
    retries : 3,
}  as const

// type Config = typeof config
// type ConfigKey = keyof Config
type ConfigDirect = keyof typeof config
// viết 1 hàm lấy giá trị của config

function getConfigValue(key : keyof typeof config) {
    return config[key]
}

const endPoint = getConfigValue('endPoint')
const timeout = getConfigValue('timeOut')

console.log(endPoint);
console.log(timeout);



// // Có 2 thế giới trong typescript song song vs nhau
// //1. Thế giới type (  kiểu = bản vẽ) => interface, type
// //2. là thế giới value () const , let và function
// // => THÌ THẰNG KEYOF LÀ 1 công cụ của thế giới TYPE

// //Partial
interface UserProfile{
    id: number,
    name:string,
    email:string,
    age:number
}

//Partial => 
// interface UserProfile {
//     id? : number,
//     name? : string,
//     email? : string,
//     age? : number,
// }

// interface updateId{
//     id? : number
// }

//cu phap : Partial<T>
//vi du toi muon viet 1 ham updateProfile

function updateProfile(original: UserProfile, updates: Partial<UserProfile>)  : UserProfile {
    return {
        ...original,
        ...updates,
    };
}

const userA : UserProfile = {
    id: 1,
    name: 'A',
    email:'123@gmail.com',
    age:20,
}

const userB = updateProfile(userA, {name: 'an'})
console.log(userB);

// rest params
//{...rest}

interface UserEnity{
    id:string,
    username: string,
    password: string,
    secretKey:string,
    role:string
}

const dbUser: UserEnity = {
    id: 'u1',
    username : 'admin',
    password: '123',
    secretKey: 'abc',
    role: 'admin',
}

function chuanHoaUser(user: UserEnity) {
    //su dung rest param va destructoring de tach password va secretKey ra khoi phan con lai
    const {password, secretKey,...safeUser } = user;
    return safeUser;
}
const clientData = chuanHoaUser(dbUser)
console.log(clientData);

const user = {
    username : 'Alice',
    age: 25,
}

//destructoring
const { username, age} = user;
const {username: userName} = user
console.log(userName);

const colors = ['red', 'green']
const c1 = colors[0]

const [first, second] = colors;
console.log(first);
console.log(second);


//rest params
const settings2 = {
    theme: 'dark',
    volume: 80,
    wifi : true,
    bluetooth: false,
}

const {theme, volume, ...others} = settings2;
console.log(theme);
console.log(others);

const races = ['Hai', 'Minh', 'Tung', 'Lan']
const [...otherss] = races

console.log(otherss);







// type LyNuoc = string;
// // viết 1 hàm nhận vào MENU -> trả về về 1 cái nút bấm cho menu
// function caiDatMayBanNuoc<T extends Record<string, string | (() => LyNuoc)>>(
//   menu: T
// ): (tenMon: keyof T) => LyNuoc {
//   // Nút bấm trả về
//   return (tenMon: keyof T): LyNuoc => {
//     const congThuc = menu[tenMon];
//     if (typeof congThuc === 'function') {
//       console.log(` May dang pha che mon ${String(tenMon)}`);
//       return congThuc();
//     }
//     console.log(`Lay ngay mon co san ${String(tenMon)}`);
//     return congThuc;
//   };
// }
// // () => string
// const MENU_QUAN = {
//   cocacola: 'Lon coca uop lanh',
//   sinh_to_bo: () => {
//     return 'Xay bo + sua + da -> sinh to bo';
//   },
//   cafe_sua: 'Cafe pha phin',
// } as const;
// const bamNut = caiDatMayBanNuoc(MENU_QUAN);
// /// khách hàng sử dụng
// //case 1: lấy nc ngọt
// const nc1 = bamNut('cocacola');
// //case 2: nc sinh to
// const nc2 = bamNut('sinh_to_bo');
// console.log(nc2);