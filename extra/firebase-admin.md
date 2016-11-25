## firebase-adminをwebpackバンドルに含めるときの注意点

node_modeles/firebase-admin/lib/index.js の下記の行をコメントアウトしないと実行時にエラーになる。

```js
require('./database/database');
↓
// require('./database/database');
```

これによりバンドルしてもエラーにはならなくなるが、database機能は使えなくなる。
authは使えるのでdatabaseを叩く場合にはREST APIを使うことで代替可能。
