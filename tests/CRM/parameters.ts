function makeCake(
    flavor: 'chocolate' | 'vanilla',
    layers : number,
    isVegan : boolean
) {
    console.log(`Making a ${layers} layers - ${flavor} cake. Vegan: ${isVegan} `);
}


type MakeCakeType = typeof makeCake;

type CakeInputs = Parameters<MakeCakeType>

type flavor = CakeInputs[0]

type layers = CakeInputs[1]

type vegan = CakeInputs[2]


type PageName = 'Home' | 'Login' | 'Dashboard';

// Muon tao ra 1 object co key la page name va value 1 string
//Trong object do co bnh gia tri ko can biet, chi can biet toi co key la pageName, va value la string
//Record

const appPages : Record<PageName, string> = {
    Home : '/home',
    Login : '/login',
    Dashboard : 'dashboard'
}

interface Customer {
    username: string,
    password: string,
    plan: 'free' | 'vip',
    isActive: boolean
}

function createStore<T extends Record<string, Customer>>(fixture: T) {
    return (key: keyof T) => {
        return fixture[key]
    }
}


const getTestUser = createStore({
    standardUser : {
        username: 'user_123',
        password: '123',
        plan: 'free',
        isActive: true
    },

    vipUser: {
        username : 'user_123',
        password : '123',
        plan: 'vip',
        isActive: true
    }
})

const data = getTestUser('vipUser')


interface CoTheCanCuoc {
    id : string;
}

function checkIn<T extends CoTheCanCuoc>(khachHang : T) {
    console.log(`Khach Hang co id ${khachHang.id} duoc phep vao`);
    return khachHang;
}


const nguoiA = {id:'123'};
checkIn(nguoiA)

const richKid = {
    id: '9999',
    name: 'Batman',
    money: 100000,
};
checkIn(richKid)


const nguoiQuenVi = {
    name : 'Joker'
}
checkIn(nguoiQuenVi)



function createLogger<T extends Record<string,string>>(evenMap: T) {
    return (eventName : keyof T) => {
        const code = evenMap[eventName]
        console.log(`Gui su kien ${String(eventName)} - ma: ${code}`);   
    }
}

const eventMap = {
    BTN_CLICK_SIGNUP : 'EVT_01',
    BTN_VIEW_HOMW : 'EVT_02',
};

const logEvent = createLogger(eventMap)

logEvent('BTN_CLICK_SIGNUP')

// Kế thừa - kết hợp/thành phần (inheritance, composition)

//Kế thừa : la moi quan he la mot
// con meo la 1 dong vat , giam doc la 1 con nguoi

//Ket hop : xe hoi co 1 cai dong co ( chu ko phai xe hoi la dong co)


class SmartDevice {
    connectWifi() {
        console.log('connect wifi')
    }
}

class SmartLight extends SmartDevice{
    turnOn() {
        console.log('Light on')
    }
}

class SmartSpeaker extends SmartDevice{
    playMusic() {
        console.log('Music on');
    }
}

class WifiModule {
    connect() {
        console.log('wifi da connect');
    }
}

class LightModule{
    on() {
        console.log('bat');
    }

    off() {
        console.log('tat');
    }
}

class SpeakerModule{
    play(song : string) {
        console.log(`dang hat ${song}`);
    }
}

class SigingLight{
    private wifi = new WifiModule()
    private light = new LightModule()
    private speaker = new SpeakerModule()


    partyTime() {
        this.wifi.connect()
        this.light.on()
        this.speaker.play('OLALA')
    }
}

