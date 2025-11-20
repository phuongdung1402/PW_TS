class CompanyTools {
    log(message : string) {
        console.log(`[LOG]: ${message}`)
    }

    sendEmail(to : string, subject: string) {
        console.log(`Dang gui email toi ${to} voi chu de ${subject}`);
    }
}

// Khuân mẫu nv trừu tượng chung cho tất cả nhân viên trong công ty
abstract class BaseEmployee {
    protected name : string
    protected readonly tools : CompanyTools;

    constructor( name : string) {
        this.name = name
        this.tools = new CompanyTools()
    }

    //phuong thuc truu tuong : bat buoc moi lop con phai dinh nghia
    abstract doWork() : void 
}

class Developer extends BaseEmployee{
    doWork(): void {
        this.tools.log(`Developer ${this.name} dang viet code....`)
    }
}

class Manager extends BaseEmployee{
    doWork(): void {
        this.tools.log(`Manager ${this.name} dang len lich hop`)
        this.tools.sendEmail(`pw@cty.com`, 'Hop khan')
    }
}

const man = new Manager('Tuan')
man.doWork()
const dev = new Developer('An')
dev.doWork()