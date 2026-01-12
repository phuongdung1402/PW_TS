import { FullConfig} from 'playwright/test'

async function globalTeardown (config : FullConfig) {
    console.log(`[GLOBAL TEARDOWN] HẾT GIỜ LÀM VIỆC`);
    console.log(`[GLOBAL TEARDOWN] da tat server ${process.env.DB_CONNECTION_URL}`);

}

export default globalTeardown;

