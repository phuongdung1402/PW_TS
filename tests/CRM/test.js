var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// as const ( const assertion )
// as const : sẽ khóa cứng object , ngăn chặn việc sửa đổi ngớ ngẩn 
var direction = {
    UP: 'up',
    DOWN: 'down'
};
var PI = 3.14;
// direction.UP = 'left'
var env = ['dev', 'stagging', 'prod'];
// env.push('abc')
//typeof
//dùng để copy kiểu dữ liệu từ 1 đối tượng đã có sẵn
var settings = {
    theme: 'dard',
    notification: true,
    version: 1.0
};
// tuong duong với
//type UserKeys = 'id' | 'name' | 'email'
var Colors = {
    Red: '#FF0000',
    Green: '#00FF00',
    Blue: '#0000FF'
};
// Có 2 cách để lấy giá trị trong 1 object
console.log(Colors.Green);
console.log(Colors['Blue']);
//b1 : typeof Colors => ra cai type la {Red: ''....}
//b2 : keyOf (b1) => keyof ColorType => union 'Red' | 'Green' | 'Blue'
function changeColor(color) {
    console.log(Colors[color]);
}
changeColor('Red');
var configDevEnv = {
    endPoint: 'https://api.com',
    timeOut: 5000,
    retries: 3,
};
var config = {
    endPoint: 'https://api.com',
    timeOut: 5000,
    retries: 3,
};
// viết 1 hàm lấy giá trị của config
function getConfigValue(key) {
    return config[key];
}
var endPoint = getConfigValue('endPoint');
var timeout = getConfigValue('timeOut');
console.log(endPoint);
console.log(timeout);
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
//cu phap Partial<T>
//vi du toi muon viet 1 ham updateProfile
function updateProfile(original, updates) {
    return __assign(__assign({}, original), updates);
}
var userA = {
    id: 1,
    name: 'a',
    email: '123@gmail.com',
    age: 20,
};
var userB = updateProfile(userA, { age: 21 });
console.log(userB);
var dbUser = {
    id: 'u1',
    username: 'admin',
    password: '123',
    secretKey: 'abc',
    role: 'admin',
};
function chuanHoaUser(user) {
    //su dung rest param va destructoring de tach password va secretKey ra khoi phan con lai
    var password = user.password, secretKey = user.secretKey, safeUser = __rest(user, ["password", "secretKey"]);
    return safeUser;
}
var clientData = chuanHoaUser(dbUser);
console.log(clientData);
var user = {
    username: 'Alice',
    age: 25,
};
//destructoring
var username = user.username, age = user.age;
var userName = user.username;
console.log(userName);
var colors = ['red', 'green'];
var c1 = colors[0];
var first = colors[0], second = colors[1];
console.log(first);
console.log(second);
//rest params
var settings2 = {
    theme: 'dark',
    volume: 80,
    wifi: true,
    bluetooth: false,
};
var theme = settings2.theme, volume = settings2.volume, others = __rest(settings2, ["theme", "volume"]);
console.log(theme);
console.log(others);
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
