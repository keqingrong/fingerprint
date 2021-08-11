import { useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { writeText, readText } from 'clipboard-polyfill';
import { getHashes } from '@keqingrong/fingerprint';
import './App.css';

const baseURL = `http://192.168.199.159:8000`;

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Result = Awaited<ReturnType<typeof getHashes>>;

interface ResponseData<T> {
  success: boolean;
  data: T;
}

import('eruda').then(
  ({ default: eruda }) => {
    eruda.init();
  },
  (err) => {
    console.log(`[system] load eruda failed:`, err);
  }
);

function App() {
  const [hashList, setHashList] = useState<
    Array<{ key: string; value: string | null }>
  >([]);
  const [customHash, setCustomHash] = useState('');
  const [value, setValue] = useState('');
  useEffect(() => {
    getHashes().then((res) => {
      console.log(res);
      setCustomHash(res.customHash);
      const list = Object.keys(res).map((key: string) => {
        const _key = key as keyof Result;
        return {
          key,
          value: res[_key],
        };
      });
      list.push({
        key: 'UA',
        value: navigator.userAgent,
      });
      setHashList(list);
    });
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const onWriteClick = () => {
    if (value.trim().length === 0) {
      alert('请输入推荐信息');
      return;
    }
    fetch(`${baseURL}/saveReferral`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        code: customHash,
        payload: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { success } = res as ResponseData<string>;
        if (success) {
          alert('保存成功');
        } else {
          alert('保存失败');
        }
      });
  };

  const onReadClick = () => {
    const url = new URL(`${baseURL}/getReferral`);
    url.searchParams.append('code', customHash);
    fetch(url.toString(), {
      mode: 'cors',
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { success, data } = res as ResponseData<string>;
        if (success) {
          alert(data);
        } else {
          alert(`没有读取到推荐信息`);
        }
      });
  };

  const onWriteClipboard = () => {
    if (value.trim().length === 0) {
      alert('请输入推荐信息');
      return;
    }
    writeText(value)
      .then(() => {
        alert('写入成功');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onReadClipboard = () => {
    readText()
      .then((content) => {
        alert(content);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Fingerprint</h1>
      <ul>
        {hashList.map((item) => (
          <li key={item.key}>
            <pre className="hash">
              {item.value} ({item.key})
            </pre>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={value}
          placeholder="请输入推荐信息"
          onChange={onInputChange}
        />
      </div>
      <button type="button" onClick={onWriteClick}>
        保存到服务器
      </button>
      <button type="button" onClick={onReadClick}>
        从服务器读取
      </button>
      <button type="button" onClick={onWriteClipboard}>
        写入剪切板
      </button>
      <button type="button" onClick={onReadClipboard}>
        读取剪切板
      </button>
    </div>
  );
}

export default App;
