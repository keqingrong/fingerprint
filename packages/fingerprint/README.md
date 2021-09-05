# @keqingrong/fingerprint (WIP)

## Installation

```bash
# npm
npm install @keqingrong/fingerprint

# yarn
yarn add @keqingrong/fingerprint
```

## Usage

```ts
import { getCustomHash } from '@keqingrong/fingerprint';

getCustomHash(hash).then(() => {
  console.log(hash);
});
```

## APIs

- APIs from `@fingerprintjs/fingerprintjs`: `load()`, `hashComponents()`, etc.
- `getGpuInfo()`
- `getGpuFingerprint()`
- `getPublicIP(serviceURL)`
- `getRobustPublicIP()`
- `getIPFingerprint()`
- `getOSVersion()`
- `getOSVersionFingerprint()`
- `getCanvasHash()`
- `getCanvasStableHash()`
- `getAudioHash()`
- `getCustomHash()`
- `getHash()`
- `getHashes()`

## License

MIT © Qingrong Ke
