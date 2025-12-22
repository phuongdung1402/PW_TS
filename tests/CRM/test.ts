
// // 1.As const ( const assertion )
// // as const : sẽ khóa cứng object , ngăn chặn việc sửa đổi ngớ ngẩn 
// const direction = {
//     UP: 'up',
//     DOWN: 'down'
// } as const

// const PI = 3.14;
// // direction.UP = 'left'

// const env = ['dev','uat','prod'] as const
// // env.push('abc')
// //=> Dùng cho biến ko thay đổi ( hay hằng số )

// //2.Typeof
// //dùng để copy kiểu dữ liệu từ 1 đối tượng đã có sẵn
// //Dùng typeof : để lấy kiểu dữ liệu

// const settings = {
//     theme : 'dard',
//     notification : true,
//     version : 1.0
// }
// //type
// // interface Settings {
// //     theme : string;
// //     notifications: boolean;
// //     version: number;
// // }

// type SettingType = typeof settings;

// //3.Keyof : lấy ra key của object
// interface User{
//     id:number;
//     name:string;
//     email:string;
// }

// type UserKeys = keyof User;
// const idTest : UserKeys = 'id'

// // tuong duong với
// //type UserKeys = 'id' | 'name' | 'email'


// const Colors = {
//     Red: '#FF0000',
//     Green: '#00FF00',
//     Blue: '#0000FF'
// } as const


// // Có 2 cách để lấy giá trị trong 1 object
// console.log(Colors.Green);
// console.log(Colors['Blue']);


// //viet 1 cai ham chi nhan dung ten mau co trong object
// type ColorsType = typeof Colors;
// type ColorsName = keyof typeof Colors

// //b1 : typeof Colors => ra cai type la {Red: ''....}
// //b2 : keyOf (b1) => keyof ColorType => union 'Red' | 'Green' | 'Blue'

// function changeColor(color: ColorsName) {
//     console.log(Colors[color]);
// }
// changeColor('Red')

// const configDevEnv = {
//     endPoint : 'https://api.com',
//     timeOut: 5000,
//     retries : 3,
// }

// const config = {
//     endPoint : 'https://api.com',
//     timeOut: 5000,
//     retries : 3,
// }  as const

// // type Config = typeof config
// // type ConfigKey = keyof Config
// type ConfigDirect = keyof typeof config
// // viết 1 hàm lấy giá trị của config

// function getConfigValue(key : keyof typeof config) {
//     return config[key]
// }

// const endPoint = getConfigValue('endPoint')
// const timeout = getConfigValue('timeOut')

// console.log(endPoint);
// console.log(timeout);



// // // Có 2 thế giới trong typescript song song vs nhau
// // //1. Thế giới type (  kiểu = bản vẽ) => interface, type
// // //2. là thế giới value () const , let và function
// // // => THÌ THẰNG KEYOF LÀ 1 công cụ của thế giới TYPE

// // //Partial
// interface UserProfile{
//     id: number,
//     name:string,
//     email:string,
//     age:number
// }

// //Partial => 
// // interface UserProfile {
// //     id? : number,
// //     name? : string,
// //     email? : string,
// //     age? : number,
// // }

// // interface updateId{
// //     id? : number
// // }

// //cu phap : Partial<T>
// //vi du toi muon viet 1 ham updateProfile

// function updateProfile(original: UserProfile, updates: Partial<UserProfile>)  : UserProfile {
//     return {
//         ...original,
//         ...updates,
//     };
// }

// const userA : UserProfile = {
//     id: 1,
//     name: 'A',
//     email:'123@gmail.com',
//     age:20,
// }

// const userB = updateProfile(userA, {name: 'an'})
// console.log(userB);

// // rest params
// //{...rest}

// interface UserEnity{
//     id:string,
//     username: string,
//     password: string,
//     secretKey:string,
//     role:string
// }

// const dbUser: UserEnity = {
//     id: 'u1',
//     username : 'admin',
//     password: '123',
//     secretKey: 'abc',
//     role: 'admin',
// }

// function chuanHoaUser(user: UserEnity) {
//     //su dung rest param va destructoring de tach password va secretKey ra khoi phan con lai
//     const {password, secretKey,...safeUser } = user;
//     return safeUser;
// }
// const clientData = chuanHoaUser(dbUser)
// console.log(clientData);

// const user = {
//     username : 'Alice',
//     age: 25,
// }

// //destructoring
// const { username, age} = user;
// const {username: userName} = user
// console.log(userName);

// const colors = ['red', 'green']
// const c1 = colors[0]

// const [first, second] = colors;
// console.log(first);
// console.log(second);


// //rest params ( phân rã các thuộc tính của đối tượng )
// const settings2 = {
//     theme: 'dark',
//     volume: 80,
//     wifi : true,
//     bluetooth: false,
// }
// const {theme, volume, ...others} = settings2;
// console.log(theme);
// console.log(others);

// const races = ['Hai', 'Minh', 'Tung', 'Lan']
// //races[0]
// const [winner, nhi, ...other ] = races
// console.log(winner)
// console.log(other)

// //Records
// // Tư duy sử dụng record để tạo ra object giống như 1 cuốn từ điển nơi bạn chưa biết tên key cụ thể , nhưng biết kiểu dữ liệu
// type ProductPrices = Record<string, number>;
// const prices : ProductPrices = {
//     laptop : 1500,
//     mouse : 25,
// }
// //object laptop va 'laptop' la tuong duong nhau

// type OrderStatus = 'pending' | 'shipping' | 'delivered';
// const statusLables : Record<OrderStatus, string> = {
//     'delivered' : 'Giao hang thanh cong',
//     'shipping' : 'Dang giao hang',
//     'pending' : 'Dang cho xu ly'
// };


// //Closure -> hay hàm trả về 1 hàm
// function hamCha(x: number) {
//     let biencuaCha = x

//     return function hamCon(y: number) {
//         return biencuaCha + y;
//     }
// }

// //cú pháp quan trọng là phải : hứng giá trị của closure = 1 biến
// const add = hamCha(5)
// const ketQua = add(2)
// console.log(ketQua);

// //tạo ra nhà máy tạo hàm
// //tạo ra hàm nhân

// function createMultiplier(factor: number) {
//     return function (number: number) {
//         return number * factor
//     } 
// }

// //vi du toi muon tao ham nhan doi
// const double = createMultiplier(2);
// console.log(double(10))

// const tripple = createMultiplier(3);
// console.log(tripple(3))

// //TƯ DUY : TẠO RA 1 HỆ THỐNG ĐỒNG BỘ HÓA DỮ LIỆU
// //1. Mình có 1 object gốc
// //2. Dùng keyof typeof để lấy danh sách key của nó
// //3.Dùng record để bắt buộc 1 obj khác có key y hệt obj gốc

// //
// // const SOURCE = {KeyA : '..'};
// // type SOURCEKEY = keyof typeof SOURCE
// // const Target : Record<SOURCEKEY, ValueType>

// const ORDER_STATUS = {
//     CREATED : 'orderCreated',
//     PAID: 'orderPaid',
//     SHIPPED : 'orderShipped',
// } as const

// type StatusKey = keyof typeof ORDER_STATUS
// const STATUS_COLOR : Record<StatusKey, string> = {
//     CREATED : 'gray',
//     PAID : 'blue',
//     SHIPPED : 'green'
// };

// function getBadgeColor(status : StatusKey) {
//     return STATUS_COLOR[status]
// }

// //getBadgeColor('')

// const ENV_LIST = {
//     DEV: 'development',
//     STAGING : 'staging',
//     PROD : 'prod',
// } as const

// type EnvKey = keyof typeof ENV_LIST

// interface EnvConfig {
//     baseUrl : string,
//     retries : number,
//     timeOut : number,
// }

// const PLAYWRIGHT_CONFIG : Record<EnvKey, EnvConfig> = {
//     'DEV' : {
//         'baseUrl' : 'dev',
//         'retries' : 0,
//         'timeOut' : 300,
//     },
//     'PROD' : {
//         'baseUrl' : 'prod',
//         'retries' : 1,
//         'timeOut' : 400,
//     },
//     'STAGING' : {
//         'baseUrl' : 'staging',
//         'retries' : 3,
//         'timeOut' : 200
//     }
// }

// PLAYWRIGHT_CONFIG['DEV']
// PLAYWRIGHT_CONFIG.DEV

// // Kết hợp vs closure
// const MEMBERSHIP_TIERS = {
//     STD: 'standard_user',
//     GOLD : 'gold_user',
//     VIP : 'vip_user'
// } as const

// type TierKey = keyof typeof MEMBERSHIP_TIERS

// type FeeConfig = Record<TierKey, number>

// const giangSinhConfig: FeeConfig = {
//     'STD' : 0.05,
//     'GOLD' : 0.02,
//     'VIP': 0.0
// }

// const tetConfig: FeeConfig = {
//     'STD' : 0.1,
//     'GOLD' : 0.05,
//     'VIP': 0.01
// }

// //phan closure : tao nha may ham 
// function createFeeCalculator(config : FeeConfig) {
//     console.log('Khoi tao bo tinh phi voi config');

//     return (tier : TierKey, amount: number) : number => {
//         const rate = config[tier]
//         const fee = rate * amount
//         console.log(`${tier} giao dich ${amount}: Phi ${fee}`)
//         return fee;
//     }
// }

// //nha may tao ham 
// const calculateGiangSinh = createFeeCalculator(giangSinhConfig)
// const calculateTet = createFeeCalculator(tetConfig)

// calculateGiangSinh('GOLD', 100)
// calculateTet('VIP', 500)

// type LyNuoc = string;
// // viết 1 hàm nhận vào MENU -> trả về 1 cái nút bấm cho menu
// function caiDatMayBanNuoc<T extends Record<string, string | (() => LyNuoc)>>(menu: T): (tenMon: keyof T) => LyNuoc {
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

// function taoQuaBom() {
//     console.log(`BUM! BOM NO NGAY LAP TUC`);
//     return 'Xac qua bom'
// }

// console.log('Co 2 cach goi');

// //eager -> làm ngay
// //khi gán 1 function cho 1 biến : cta đang gán làm ngay cái việc trả giá trị của function

// const caiBombiLoi = taoQuaBom()
// console.log(`Gai xong bom loi, (nhung qua bom da no mat roi)`)

// //muốn lazy callback -> làm sau
// const caiBomXin = () => taoQuaBom()
// console.log(`Gai xong bom xin .Bom chua no`)
// caiBomXin()

// Trong TS: ham(function) cũng gọi là 1 kiểu dữ liệu ( giống như số hoặc chuỗi ), nên mình có thể truyền 1 hàm vào bên trong 1 hàm khác
const goiDien = () => console.log('Reng reng ! Da giat xong, moi ra lay do');
const giaoHang = () => console.log('Vu vu , dang giao hang den nha ban');

function dichVuGiatLa(quanAo: string[], hangDongSauKhiGiat: () => void) {
    console.log(`Dang giat ${quanAo.join(',')}`);
    console.log('.....Da giat xong');

    // thuc thi callback
    hangDongSauKhiGiat();
}

dichVuGiatLa(['Ao so mi', 'Quan Jean'], goiDien)
dichVuGiatLa(['Chan bong'], giaoHang)

//chuong trinh may tinh don gian : cong, tru, inKetQua
class MayTinh {
    ketQua: number;

    constructor() {
        this.ketQua = 0;
    }

    cong(so: number): this {
        this.ketQua += so;
        console.log(`Cong ${so} => Tong la: ${this.ketQua}`);
        // tra ve cai may tinh do de thuc hien dung tiep
        return this;
    }


    tru(so: number): this {
        this.ketQua -= so;
        console.log(`Tru ${so} -> Hieu la: ${this.ketQua}`);
        // tra ve cai may tinh do de thuc hien dung tiep
        return this;
    }

    inKetQua(): void {
        console.log(`------------ket qua cuoi cung la ${this.ketQua}---------------`);
    }
}

//  Su dung 
const calculator = new MayTinh()
const ketQua1 = calculator.cong(10)
const ketQua2 = calculator.cong(5)
const ketQua3 = calculator.tru(1)
calculator.inKetQua()
//method chaining
//calculator.cong(10).cong(5).tru(1).inKetQua();



// vi du : 1.ban(object) , 2.bac si
class BenhNhan {
    constructor(ten, huyetAp) {
        this.ten = ten;
        this.huyetAp = huyetAp;
    }

    diVaoKham(bacSi) {
        console.log(`${this.ten} di vao kham`);
        bacSi(this)

    }
}

const bacSiHienLanh = (nguoiBenh) => {
    console.log(`Bac si noi: Huyet ap ${nguoiBenh.huyetAp} la rat khoe`);
}

const bacSiKhoTinh = (nguoiBenh) => {
    console.log(`Bac si noi rang: Huyet ap ${nguoiBenh.huyetAp} yeu qua, uong thuoc di`);
    nguoiBenh.huyetAp += 20;
    console.log(`Huyet ap da tang len ${nguoiBenh.huyetAp}`);

}

const ongThuan = new BenhNhan('ongThuan', 90)
ongThuan.diVaoKham(bacSiHienLanh)

ongThuan.diVaoKham(bacSiKhoTinh)

// Dependency injection (DI : cây phụ thuộc )
// 1.Dependency flow



// Phan1 : Cac nguyen lieu va mon an ( dependencies ) (page)
class CaiChao {
    lamNong(): string {
        console.log('Dang bat bep lam nong chao');
        return 'Chao nong';
    }
}
class TrungRan {
    private chao: CaiChao;
    constructor(chao: CaiChao) {
        this.chao.lamNong();
    }

    ran() : string {
        console.log('Dap trung vao chao...xeo xeo.... chin!!');
        return 'Mieng trung ran vang uom';
    }
}
class BanhMiTrung {
    private trungRan : TrungRan
    constructor(trungRan: TrungRan) {
        this.trungRan = trungRan;
    }

    an() : void {
        const nhanBanh = this.trungRan.ran();
        console.log(`Kep ${nhanBanh} vao banh mi. Moi ban an`);
        
    }
}
// Phan 2 : Bo nao (DI Container)
// Che 1 con robot tu phuc vu

type FactoryFunction = (r : RobotDauBep) => any;
class RoBotDauBep {
    //map luu tru : key la ten mon, value la ham lam mon an
    private soTayCongThuc = new Map<string, FactoryFunction>();

    //hanh dong 1 : Hoc cong thuc (Register)
    hocCongThuc(tenMon: string, cachLam: FactoryFunction) : void{
        console.log(`Da hoc cach lam ${tenMon}`);
        this.soTayCongThuc.set(tenMon, cachLam);
    }


    //hanh dong 2 : Nau mon an(resolve)
    nauMon<T>(tenMon: string) : T {
        console.log(`Ban goi mon ${tenMon} . Robot dang suy nghi`);
        const hamLamMon = this.soTayCongThuc.get(tenMon)

        if(!hamLamMon) {
            throw new Error(`Mon ${tenMon} chua duoc day`)
        }

        return hamLamMon(this)
    }
}

const robot = new RoBotDauBep();

//B2 : Day robot hoc cach lam mon an
robot.hocCongThuc('CaiChao', (r)=>new CaiChao())
robot.hocCongThuc('TrungRan', (r)=>{
    const chao = r.nauMon<CaiChao>('CaiChao');
    return new TrungRan(chao)
})

robot.hocCongThuc('BanhMiTrung', (r)=> {
    const trungRan = r.nauMon<TrungRan>('TrungRan')
    return new BanhMiTrung(trungRan)
})

// B3 : Khach goi mon
const monAn = robot.nauMon<BanhMiTrung>('BanhMiTrung')
monAn.an()
