var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CompanyTools = /** @class */ (function () {
    function CompanyTools() {
    }
    CompanyTools.prototype.log = function (message) {
        console.log("[LOG]: ".concat(message));
    };
    CompanyTools.prototype.sendEmail = function (to, subject) {
        console.log("Dang gui email toi ".concat(to, " voi chu de ").concat(subject));
    };
    return CompanyTools;
}());
// Khuân mẫu nv trừu tượng chung cho tất cả nhân viên trong công ty
var BaseEmployee = /** @class */ (function () {
    function BaseEmployee(name) {
        this.name = name;
        this.tools = new CompanyTools();
    }
    return BaseEmployee;
}());
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Developer.prototype.doWork = function () {
        this.tools.log("Developer ".concat(this.name, " dang viet code...."));
    };
    return Developer;
}(BaseEmployee));
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.doWork = function () {
        this.tools.log("Manager ".concat(this.name, " dang len lich hop"));
        this.tools.sendEmail("pw@cty.com", 'Hop khan');
    };
    return Manager;
}(BaseEmployee));
var man = new Manager('Tuan');
man.doWork();
var dev = new Developer('An');
dev.doWork();
