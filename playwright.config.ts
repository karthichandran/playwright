import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 120000,    
    use: {
        headless: false,
        channel:'chrome',
        screenshot:'only-on-failure'
        //browserName: 'chromium'       
    }
   //,retries:2
   ,workers:2
};
export default config;