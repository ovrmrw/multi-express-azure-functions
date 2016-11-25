## firebase-adminをwebpackバンドルに含めるときの注意点

`node_modeles/firebase-admin/lib/index.js` の下記の行をコメントアウトしないと実行時にエラーになる。

```js
require('./database/database');
↓
// require('./database/database');
```

これによりバンドルしてもエラーにはならなくなるが、database機能は使えなくなる。
authは使えるのでdatabaseを叩く場合にはREST APIを使うことで代替可能。

---

あるいは下記のように `webpack.config.js` のexternalsを書くことでバンドルに含めないという選択肢もある。
ただしこの場合は関連モジュールを動的に多数読み込むことになるため初期ロードが遅くなる。

```js
externals: [
  {
    './database/database': 'firebase-admin/lib/database/database',
  }
],
```
