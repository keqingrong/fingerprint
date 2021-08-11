import { parseUA } from '../src/ua-parser'

const iPhoneUA = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1`
const iPadDesktopUA = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15`
const iPadMobileUA = `Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1`
const iPhoneWechatUA = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN`
const iPhoneQQUA = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/18G82 QQ/8.8.11.651 V1_IPH_SQ_8.8.11_1_APP_A Pixel/828 MiniAppEnable SimpleUISwitch/1 StudyMode/0 QQTheme/2921 Core/WKWebView Device/Apple(iPhone 11) NetType/WIFI QBWebViewType/1 WKType/1`

const redmi8ChromeUA = `Mozilla/5.0 (Linux; Android 10; Redmi 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.119 Mobile Safari/537.36`
const redmi8UCUA = `Mozilla/5.0 (Linux; U; Android 10; zh-CN; Redmi 8 Build/QKQ1.191014.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 UCBrowser/13.4.8.1128 Mobile Safari/537.36`
const redmi8WechatUA = `Mozilla/5.0 (Linux; Android 10; Redmi 8 Build/QKQ1.191014.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045709 Mobile Safari/537.36 MMWEBID/4152 MicroMessenger/8.0.7.1920(0x28000753) Process/tools WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64`
const redmi8QQUA = `Mozilla/5.0 (Linux; Android 10; Redmi 8 Build/QKQ1.191014.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36 V1_AND_SQ_8.8.12_1900_YYB_D QQ/8.8.12.5675 NetType/WIFI WebP/0.4.1 Pixel/720 StatusBarHeight/56 SimpleUISwitch/0 QQTheme/1000 InMagicWin/0 StudyMode/0`
const redmi8SuningUA = `Mozilla/5.0 (Linux;SNEBUY-APP;SNEBUY-APP 427;SNCLIENT-WAP; Android 10; Redmi 8 Build/QKQ1.191014.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36`

describe('UA Parser', () => {
  it('parse OS name and version', async () => {
    expect(parseUA(iPhoneUA)).toEqual({
      platform: ['iPhone', 'CPU iPhone OS 14_7_1 like Mac OS X'],
    })
    expect(parseUA(iPadDesktopUA)).toEqual({
      platform: ['Macintosh', 'Intel Mac OS X 10_15_6'],
    })
    expect(parseUA(iPadMobileUA)).toEqual({
      platform: ['iPad', 'CPU OS 14_7_1 like Mac OS X'],
    })
    expect(parseUA(iPhoneWechatUA)).toEqual({
      platform: ['iPhone', 'CPU iPhone OS 14_7_1 like Mac OS X'],
    })
    expect(parseUA(iPhoneQQUA)).toEqual({
      platform: ['iPhone', 'CPU iPhone OS 14_7_1 like Mac OS X'],
    })
    expect(parseUA(redmi8ChromeUA)).toEqual({
      platform: ['Linux', 'Android 10', 'Redmi 8'],
    })
    expect(parseUA(redmi8UCUA)).toEqual({
      platform: [
        'Linux',
        'U',
        'Android 10',
        'zh-CN',
        'Redmi 8 Build/QKQ1.191014.001',
      ],
    })
    expect(parseUA(redmi8WechatUA)).toEqual({
      platform: ['Linux', 'Android 10', 'Redmi 8 Build/QKQ1.191014.001', 'wv'],
    })
    expect(parseUA(redmi8QQUA)).toEqual({
      platform: ['Linux', 'Android 10', 'Redmi 8 Build/QKQ1.191014.001', 'wv'],
    })
    expect(parseUA(redmi8SuningUA)).toEqual({
      platform: [
        'Linux',
        'SNEBUY-APP',
        'SNEBUY-APP 427',
        'SNCLIENT-WAP',
        'Android 10',
        'Redmi 8 Build/QKQ1.191014.001',
        'wv',
      ],
    })
  })
})
