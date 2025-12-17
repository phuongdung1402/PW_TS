// <T>

// function getRandomItem<T>(item : T[]) {
//     const randomIndex = Math.floor(Math.random() * item.length)
//     return item[randomIndex];
// }

// const names = ['Tuan', 'Phuong', 'Dung']
// const luckyPerson = getRandomItem(names)
// console.log(luckyPerson.toUpperCase())

// const numbers = [10,25,68,99]
// const luckyNumber = getRandomItem(numbers)
// console.log(luckyNumber * 2);

//vi du: viet 1 ham nhan vao 1 goi hang (API Response), kiem tra goi hang co loi ko
//neu ko loi : tra ve cai data dung voi kieu T
//neu co loi : nem ra error

//gia su co 2 loai du lieu chinh : User va Product

// interface User {
//     id: number,
//     username: string,
//     email: string
// }

// interface Product {
//     sku:string,
//     price:number,
//     inStock:boolean
// }

// // ( API Response )
// interface ApiResponse<T> {
//     statusCode: number,
//     message:string,
//     data: T
// }

// function unwrapResponse<T> (response : ApiResponse<T>) : T {
//     if(response.statusCode !== 200) {
//         throw new Error(`API Error: ${response.message}`)
//     }

//     return response.data
// }

// const userResponse: ApiResponse<User> = {
//     statusCode: 200,
//     message:'Login success',
//     data : {
//         id: 1,
//         username:'admin',
//         email:'admin@example.com'
//     },
// }

// const userData = unwrapResponse(userResponse)
// console.log(userData);

// const productResponse : ApiResponse<Product> = {
//     statusCode: 200,
//     message:'Login success',
//     data: {
//         sku: 'IPHONE 15',
//         price: 20000,
//         inStock: true
//     }
// }

// const productData = unwrapResponse(productResponse)
// if(productData.inStock) {
//     console.log(`Gia la ${productData.price}`);
// }


//Tham chieu trong js 
// const dataGoc = {
//     user: 'Admin',
//     money: 1000
// }

// const dataCuaHoang = dataGoc;
// dataCuaHoang.money = 0;

// console.log(dataGoc); // money = 0;
// trong js : object dong vai tro giong nhu tham chieu

//Method : Structure clone : la 1 method thuoc ve nodeJS va browser

function cloneData<T>(data: T): T {
    //c1 : structured clone ( cong nghe moi, copy sieu nhanh)
    if (typeof structuredClone !== 'undefined') {
        return structuredClone(data);
    }

    //c2 : JSON (Cong nghe cu, biến thành chữ , rồi lại biến thành hình)
    return JSON.parse(JSON.stringify(data))
}

// const dataCuaHoangMoi = cloneData(dataGoc)
// dataCuaHoangMoi.money = 2000

// console.log(dataGoc.money);

// const teamGoc = ['Tuan', 'Hoang', 'Minh']
// const teamCongTac = cloneData(teamGoc)
// teamCongTac.pop()
// teamCongTac.push('Dung')

// console.log(teamGoc);
// console.log(teamCongTac);


//merge -> hop nhat 2 object
//Dung khi muon merge object ( thay doi data của obj - tuy thuoc vao muc dich su dung cua data test)
// const NhanVien = {
//     name: 'Tung',
//     role: 'staff',
//     salary: 1000,
// }

// const suaDoi = {
//     salary: 2000,
//     role: 'manager'
// }


// Object.assign(NhanVien, suaDoi)
// console.log(NhanVien);
// // Ko su dung merge dc vơi Array
// // vi du vs array

// const gioHang = ['Tao', 'Cam', 'Nho']
// const muonSuaThanh = ['Dua hau']

// Object.assign(gioHang, muonSuaThanh)
// console.log(gioHang);



// 1 kho xe mau (catalog chi tiet )

const CAR_CATALOG = {
    sedans: {
        camry_standard : {
            description: 'Camry phien ban tieu chuan',
            data: {
                //1
                model : 'Camry 2.0G',
                color: 'Black',
                isSold: false,
                engige: {
                    type: '2.0L Pertrol',
                    power: '200HP',
                    fuel: 'Gas',
                },

                interior : {
                    seats: 'Leather',
                    color:'Black',
                },

                accessories: ['Tham san', 'Phim cach nhiet']
            }
        }
    }
}

//namespace: Khu vực

function produceCar(namespace, key, options?) {
    console.log(`Lệnh sẩn xuất : ${namespace} -> ${key}`);

    //1. lay khung xe tu kho

    // khi muon truy xuat den thuoc tính của object (thuoc tinh do la tham so của hàm )-> thì dùng dấu []
    const template = CAR_CATALOG[namespace][key];
    if(!template) throw new Error('Khong tim thay mau xe');

    //2.Clone (tao xe mơi)
    let myCar = cloneData(template.data)

    if(options && options.overrides) {
        Object.assign(myCar, options.overrides)
    }

    if(options && options.transform) {
        myCar = options.transform(myCar);
        console.log(`Transfrom đã độ xe`);
    }

    return myCar;
}

const case1 = produceCar('sedans', 'camry_standard')
//console.log(case1);

// muốn đổi màu sơn và đánh dấu xe đã bán
const case2 = produceCar('sedans', 'camry_standard', {
    overrides: {
        color: 'Pink',
        isSold: true,
    }
})

//console.log(case2);

// Khach hang muon do xe thanh 500 ma luc
const case3 = produceCar('sedans', 'camry_standard', {
    transform: (car) => {
        car.engige.power = '500HP'
        return car;
    },
});

console.log(case3);

