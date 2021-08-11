# 多台 iOS 手机

## iPhone 6s 13.2.3 Edge

bc26d9508f230dff169e5e5b474137f7 (visitorid)
f88776d5a618a61892f58ac23d333688 (canvasHash)
e8a910f16f138d16d2d0694b5dd075ae (canvasHashStable)
e61240157b1cd54a9c197b0f2471b325 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebkit/605.1.15 (KHTML, Like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/91.0.4472.124 (UA)

## iPhone 11 14.4.2 WeChat

697562323e5ce12a925e9db51c0b506a (visitorId)
4e4e1370706d460ff6a6c8b21c3ffaae (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashStable)
70e4e7cc01b52a4f74e51b90bc66f9f2 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, Like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN (UA)

## iPhone 12 14.6 Safari

2df65c189871218de649c41a54121e48 (visitorId)
46c492a2a21406af05fed0d3fdb99026 (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashstable)
073e48ac5c39e9e5a196033edcce5796 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1 (UA)

## iPhone 11 14.7.1 WeChat

82b495068fa344e2f15aa1cd831f9fbd (visitorId)
4e4e1370706d460ff6a6c8b21c3ffaae (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashStable)
073e48ac5c39e9e5a196033edcce5796 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN (UA)

## iPhone 6s 14.7.1 Safari

ec25df477f84b476371716eb1c34fc8d (visitorId)
b77d903385c55e5bd2b54a3bb6ef0f8d (canvasHash)
00f9fdf48374aa63feb042ef1c365c7f (canvasHashStable)
40157261cd509922a485af59e745e6b8 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1 (UA)

## iPad Pro 14.7.1 WeChat

c67cd4fbeb405f5c5b29bc892e99327d (visitorId)
4e4e1370706d460ff6a6c8b21c3ffaae (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashStable)
40157261cd509922a485af59e745e6b8 (audioHash)

Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN (UA)

## iPhone X 14.6 WeChat

616a27776b3c3ecaa7a15e4360dc5f35 (visitorId)
4e4e1370706d460ff6a6c8b21c3ffaae (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashStable)
40157261cd509922a485af59e745e6b8 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, Like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN (UA)

## iPhone 12 14.6 WeChat

78f89dabd5864f6b3801b07dbf11c206 (visitorId)
46c492a2a21406af05fed0d3fdb99026 (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashStable)
073e48ac5c39e9e5a196033edcce5796 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/4G Language/zh_CN (UA)

## iPhone 12 14.7.1 WeChat

78f89dabd5864f6b3801b07dbf11c206 (visitorId)
46c492a2a21406af05fed0d3fdb99026 (canvasHash)
ab19773da00f7cfffdc4ab65516a6f26 (canvasHashstable)
073e48ac5c39e9e5a196033edcce5796 (audioHash)

Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/WIFI Language/zh_CN (UA)

## 总结

- 不同 iPhone 相同版本系统中 Safari 的 UA 相同。
- 同一台 iPhone 上不同 App 的 canvasHash/canvasHashStable/audioHash 相同。
- 不同 iPhone 不同版本系统，canvasHash/canvasHashStable/audioHash 可能相同。
- Safari 跟随 iOS 系统升级更新，类似 IE 之于 Windows。

识别 iOS 需要考虑 iOS 版本，即 `/iPhone OS \d+_\d+(_\d+)?/`。
