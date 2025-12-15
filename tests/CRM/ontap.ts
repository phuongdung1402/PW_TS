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

interface User {
    id: number,
    username: string,
    email: string
}

interface Product {
    sku:string,
    price:number,
    inStock:boolean
}

// ( API Response )
interface ApiResponse<T> {
    statusCode: number,
    message:string,
    data: T
}

function unwrapResponse<T> (response : ApiResponse<T>) : T {
    if(response.statusCode !== 200) {
        throw new Error(`API Error: ${response.message}`)
    }

    return response.data
}

const userResponse: ApiResponse<User> = {
    statusCode: 200,
    message:'Login success',
    data : {
        id: 1,
        username:'admin',
        email:'admin@example.com'
    },
}

const userData = unwrapResponse(userResponse)
console.log(userData);

const productResponse : ApiResponse<Product> = {
    statusCode: 200,
    message:'Login success',
    data: {
        sku: 'IPHONE 15',
        price: 20000,
        inStock: true
    }
}

const productData = unwrapResponse(productResponse)
if(productData.inStock) {
    console.log(`Gia la ${productData.price}`);
    
}