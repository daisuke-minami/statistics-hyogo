## Nuxtプロジェクトの作成

[公式ドキュメント](https://nuxtjs.org/ja/docs/get-started/installation/)に従ってNuxt.jsをインストールしていく。

### create-nuxt-app
プロジェクト名は仮に「**nuxt-resas**」とする。

```terminal
$ npx create-nuxt-app nuxt-resas
```

インストール時の設定は次のとおり。
ここではVuetifyをインストールしている。

```terminal
create-nuxt-app v3.7.1
✨  Generating Nuxt.js project in nuxt-resas
? **Project name:** nuxt-resas
? **Programming language:** TypeScript
? **Package manager:** Yarn
? **UI framework:** Vuetify.js
? **Nuxt.js modules:** (Press **<space>** to select, **<a>** to toggle all, **<i>** to invert selection)
? **Linting tools:** (Press **<space>** to select, **<a>** to toggle all, **<i>** to invert selection)
? **Testing framework:** None
? **Rendering mode:** Universal (SSR / SSG)
? **Deployment target:** Static (Static/Jamstackhosting)
? **Development tools:** (Press **<space>** to select, **<a>** to toggle all, **<i>** to invertselection)
? **What is your GitHub username?** [ここにGitHubアカウント]
? **Version control system:** Git
```


インストールが完了すると、ローカルにプロジェクト名のディレクトリが作成される。

### build
プロジェクトのディレクトリに移動し、ビルドする。

```bash
$ cd nuxt-resas
$ yarn dev
```
ビルドが成功したらlocalhost:3000にアクセスする。
初回起動では下記画面が表示される。

## GitHubリポジトリと連携

### リモートリポジトリ作成
[GitHub](https://github.co.jp/)ホーム画面の`Repositories`> `New`から新規リポジトリを作成する。
**Repository name** と **Description**を記入したら他の選択はせずに、**Create Repository**を押して完了する。
**Repository name** は任意だが、個人的にはいつもローカルのディレクトリ（ここでは**nuxt-resas**）に合わせている。

リポジトリの作成に成功したら、画面にリモートURLが発行される。  
- リモートURL：https://github.com/******/nuxt-resas.git

### ローカルリポジトリと連携
再びターミナルでローカルプロジェクトを開き、下記を実行。

```terminal
$ git init
$ git add . 
$ git commit -m "first commit" 
$ git remote add origin https://github.com/******/nuxt-resas.git 
$ git push -u origin master
```
これで、ローカルリポジトリとリモートリポジトリが連携できた。

## GitHub ActionsでビルドしてNetlifyでデプロイする

Netlifyの無料プランではビルド時間が月300分までに限定されているため、比較的規模の大きいプロジェクトでは足りない可能性がある。
そこで、GitHub ActionsでビルドしてNetlifyにデプロイする方法を採用する。
Github Actions ではパブリックリポジトリは完全無料。プライベートリポジトリでも 2000 分/月までビルド時間を使うことが許されている。

### NetlifyでアクセストークンとサイトIDを発行
#### アクセストークンの発行
[Netlify](https://app.netlify.com/)のアカウントページを開き、`Personal access tokens`内の`New access token`へ移動する。
任意のトークン名を入力する。例えば**GitHub Actions**として`Generate token`をクリックするとアクセストークンが表示・発行されるのでメモしておく。

#### サイトの作成
[Netlify](https://app.netlify.com/)トップページに戻り、`Sites`へ移動する。
ページ下部に`Drag and drop your site output folder  here`の欄が表示されているので、ここにNuxtプロジェクトのdistディレクトリをドラッグ＆ドロップする。

### サイトIDの発行
作成したサイトの`Site settings`内の`Site details`に**APP ID**が発行されているのでメモしておく。

### GitHub Seacret にアクセストークンとサイトIDを設定
GitHubのリポジトリを開き、`Settings`＞`Seacrets`から`New repository secret`をクリックする。
NameとValueの組み合わせで値を設定できる。仮に次のように設定する。
- **NETLIFY_AUTH_TOKEN**：アクセストークン
- **NETLIFY_SITE_ID**：サイトID

### GitHub Actions にworkflowを設定
最後に、GitHub Actionsのワークフローを設定する。
リポジトリ内の.github/workflowsディレクトリ にnetlify.ymlを作成する。GitHub Actionsから作成することもできる。
ワークフローについての詳細は[公式ドキュメント](https://docs.github.com/ja/actions)参照。

#### workflow

```yml
name: Netlify

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-18.04
    env:
      RESAS_API_KEY:  ${{ secrets.RESAS_API_KEY }}


    steps:
      - uses: actions/checkout@v2

      # 「./dist」にビルド結果が生成する
      - uses: actions/setup-node@v1
        with:
          node-version: 14.x
      - run: npm ci
      - run: npm run build
      - run: npm run generate

      # Netlifyにデプロイする
      - run: npx netlify-cli deploy --dir=dist  --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```


ビルドするブランチを変更したい場合、on pushの部分を変更すれば良い。

```yml
on:
  push:
    branches:
      - develop
```

#### GitHub Actionsでエラーがでた場合

GitHub Actionsで下記エラーが発生する場合がある

```terminal
Run npm ci
npm ERR! cipm can only install packages with an existing package-lock.json or npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or later to generate it, then try again.
```
pakege.lock.jsonがないということなので、プロジェクトのディレクトリでnpm installするとpackege.lock.jsonが生成される

```terminal
npm install
```



## RESAS-APIを利用する準備

### RESAS-APIの利用者登録とAPIキーの発行
[公式サイト](https://opendata.resas-portal.go.jp/)から利用者登録を完了する。

ログインして[マイページ](https://opendata.resas-portal.go.jp/mypage.html)にアクセスすると、一番下に**APIキー**が表示されているのでメモ。

### APIキーを環境変数として利用

プロジェクト直下に.envファイルを作成して、取得したAPIキーを**RESAS_API_KEY**として記載しておく。

```terminal
RESAS_API_KEY = '○○○○○○○○○○○○○○○○○'
```

Nuxtv2.13以降なら[dotenv](https://www.npmjs.com/package/dotenv)を利用しなくても、Nuxtの標準機能で環境変数を利用できる。

[公式サイト](https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config/)にあるとおり、[nuxt.config.js](https://github.com/daisuke-minami/nuxt-resas/blob/master/nuxt.config.js)に**publicRuntimeConfig**を定義する。

```js
publicRuntimeConfig: {
   RESAS_API_KEY: process.env.RESAS_API_KEY,
},
```

環境変数は$configのグローバルに定義されるので、どこからでも呼び出し可能。

### GitHub Actionsで環境変数を利用
GitHub Actionsでビルドする場合、プロジェクト内で設定した.envは反映されないので、別途設定する必要がある。

#### GitHubのリポジトリにseacretを設定する
[公式ドキュメント](https://docs.github.com/ja/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)を参考に、SECRET 情報を登録する。
1.  リポジトリのメインページから`Settings`項目を選択し、設定ページに飛ぶ。
2.  左のサイドバーから`Secrets`を押下する。
3.  `New repository secret`ボタンを押下する。
4.  `Name`に SECRET 情報の名前**RESAS_API_KEY**を、`Value`に SECRET 情報を入力する。
5.  `Add secret`ボタンを押下し、SECRET 情報を登録する。

#### workflowでseacretを読み込む
[ワークフロー](https://github.com/daisuke-minami/nuxt-resas/blob/master/.github/workflows/netlify.yml)のbuildセクションで、登録したSECRET 情報を呼び出す。
※詳しくは[公式ドキュメント](https://docs.github.com/ja/actions/reference/environment-variables)参照

```bash
jobs:
  build:
    runs-on: ubuntu-18.04
    env:
      RESAS_API_KEY:  ${{ secrets.RESAS_API_KEY }}
```


## nuxtjs/axiosのインストールと設定

APIを利用する場合、Promise ベースの HTTP クライアントである「axios」を利用することが多い。

ここでは、nuxt.js用のブラグイン「[nuxt/axios](https://axios.nuxtjs.org/)」をインストールする。
### インストール

```bash
yarn add @nuxtjs/axios
```

`nuxt.config.js`で@nuxtjs/axiosを有効化する。

```js
modules: [
  "@nuxtjs/axios",
],
```


### RESAS-APIを利用するときの共通処理

[公式ドキュメント](https://axios.nuxtjs.org/extend)に従って、baseURLとheader（API-KEY）を共通処理化する。

#### プラグインの作成

Nuxtプロジェクト内に`plugins/resas.js`を作成。プラグインの詳細は[公式ドキュメント](https://nuxtjs.org/docs/directory-structure/plugins/)参照。

```js
export default function ({ $axios, $config }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'X-API-KEY': $config.RESAS_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {},
  })

  api.setBaseURL('https://opendata.resas-portal.go.jp')

  inject('resas', api)
}
```


RESAS-APIの[API概要](https://opendata.resas-portal.go.jp/docs/api/v1/index.html)にあるとおり、APIのエンドポイントは`https://opendata.resas-portal.go.jp/`となるので、これをBaseUrlに設定している。

```js
api.setBaseURL('https://opendata.resas-portal.go.jp')
```

また、headersの'X-API-KEY'に**RESAS-API-KEY**を設定する。（環境変数から取得する）

```js
headers: {
  common: {
    Accept: 'application/json',
  },
  'X-API-KEY': $config.RESAS_API_KEY,
  'Content-Type': 'application/json',
},
```

最後に、injectで関数を共通処理化している。これで別のコンポーネントからthis.$resasで呼び出すことができる。

```js
inject('resas', api)
```


#### プラグインの有効化

`nuxt.config.js`でプラグインを有効化。

```js
plugins: [
  { src: '@/plugins/resas', ssr: true, },
],
```

## RESAS-APIのデータを取得

### axiosの基本的な使い方（GET）
[公式ドキュメント](https://github.com/axios/axios#example)にあるとおり、クエリパラメータを指定する方法が2種類ある。

#### axios.getに指定するURLに直接記述する方法

```js
axios.get('/user?ID=12345')
```

#### axios.getの第2引数に、オプション指定する方法
```js
axios.get('/user', {
  params: {
    ID: 12345
  }
})
```

ここでは、②の方法を利用する。

### 都道府県一覧の取得
[都道府県一覧](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html)をAPIから取得する。

共通化した this.$resasのgetメソッドを利用する。
APIのURLは`api/v1/prefectures`、パラメータはなし。

```js
const url = 'api/v1/prefectures'
const { data } = await this.$resas.get(url)
```

### 市区町村一覧の取得
[市区町村一覧](https://opendata.resas-portal.go.jp/docs/api/v1/cities.html)をAPIから取得する。

APIのURLは`api/v1/cities`
パラメータを指定しない場合、全都道府県の市区町村一覧を取得する。

```js
const url = 'api/v1/cities'
const { data } = await this.$resas.get(url)
```

特定の都道府県を指定したい場合は、パラメータにprefCodeをセットする。

```js
const url = 'api/v1/cities'
const params = { prefCode: 28 }
const { data } = await this.$resas.get(url, { params })
```
