
import { EnvManager } from "../utils/EnvManager";

console.log('=====================================================');
console.log('======CÁC BIẾN MÔI TRƯỜNG===========');
console.log('=====================================================');
console.log('');


console.log('===============TỪ GITHUB VARIABLE=====================');
console.log('MY_WEBSITE: ', EnvManager.get('MY_WEBSITE', '(chưa set - chỉ có trên CI)'));
console.log('');
