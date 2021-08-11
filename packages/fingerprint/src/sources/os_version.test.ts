import { parseOSVersion } from './os_version'

describe('OS version', () => {
  it('parseOSVersion', () => {
    expect(
      parseOSVersion(
        `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1`
      )
    ).toEqual({
      iPhone: true,
      iPhoneVersion: '14.7.1',
      Android: false,
      AndroidVersion: '',
      AndroidModel: '',
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/4G Language/zh_CN`
      )
    ).toEqual({
      iPhone: true,
      iPhoneVersion: '14.6',
      Android: false,
      AndroidVersion: '',
      AndroidModel: '',
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 4.4.4; SAMSUNG-SM-N900A Build/tt) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '4.4.4',
      AndroidModel: 'SAMSUNG-SM-N900A',
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '8.0',
      AndroidModel: 'Pixel 2',
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '8.0.0',
      AndroidModel: 'Pixel 2 XL',
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '5.0',
      AndroidModel: 'SM-G900P', // Galaxy S5
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '6.0.1',
      AndroidModel: 'Moto G (4)', // Moto G4
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 Mobile Safari/537.36 T7/11.20 SP-engine/2.16.0 baiduboxapp/11.20.2.3 (Baidu; P1 9)`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '9',
      AndroidModel: 'MI 6', // Mi 6
    })

    expect(
      parseOSVersion(
        `Mozilla/5.0 (Linux; U; Android 10; zh-cn; Redmi 8 Build/QKQ1.191014.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/11.8 Mobile Safari/537.36 COVC/045718`
      )
    ).toEqual({
      iPhone: false,
      iPhoneVersion: '',
      Android: true,
      AndroidVersion: '10',
      AndroidModel: 'Redmi 8',
    })

    // TODO: 鸿蒙
    // expect(
    //   parseOSVersion(
    //     `Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.0.0.306) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.2.301 Mobile Safari/537.36`
    //   )
    // ).toEqual({
    //   iPhone: false,
    //   iPhoneVersion: '',
    //   Android: true,
    //   AndroidVersion: '10',
    //   AndroidModel: 'WLZ-AN00', // Huawei Nova 6 5G
    // })
  })
})
