# Tinder UI (React-Typescript)

- [Javascript版はこちら](https://github.com/tommytommychopper/TinderUI)

## Try the demo

![Aug-22-2021 22-36-58](https://user-images.githubusercontent.com/48965717/130395959-4ec7bb5a-1fd6-49e5-955b-577f948c5d47.gif)

### Try the demo [here!](https://tinder-ui-typescript.web.app/)

## Requirements
- スマホのブラウザ環境で動作すること ✅
- カード下の左にスキップボタン、右にいいね！ボタンを表示する ✅
- スキップボタンをタップしたときはカードが左に流れるアニメーションが実行され、次のカードが表示される ✅
- いいね！ボタンをタップしたときはカードが右に流れるアニメーションが実行され、次のカードが表示される ✅
- すべてのカードを仕分けできたら empty 画面が表示される ✅
- テストを書く ✅
- スワイプでカードを仕分けできる ✅
- カードの下部をタップすると詳細画面が表示される ✅
- API サーバーと連携する ✅

## コードを書く前の計画

### ① UI design

![Tinder-UI](https://user-images.githubusercontent.com/48965717/130436780-3561713e-20c0-49da-8162-25fcaaee1045.png)

[figma で見てみる](https://www.figma.com/file/rhA8GmUxhmfogwYx7FUggB/Tinder-UI?node-id=0%3A1)

### ② 前回作成した[Tinder-UI](https://github.com/tommytommychopper/TinderUI)からの変更点

- 前回はブランチを変えずに全ての開発を行っていたので今回は機能毎にブランチを切り`イシュードリブンな開発`で進めていく。
- React の考え方でもある`単一責任`+`Reusable`なコンポーネント作りを重視して開発を進めていく。
- テスト開発(テストを書く->テストを成功させるためのコードを書く->リファクター)を取り入れる。
  - コンポーネントが正しくブラウザー上にレンダリングされているか(`Unit Test`)。
  - ボタンを押した時にカードが正しくスワイプされているかどうか(`Integration Test`)。
- `master`ブランチにコードが push された際に[GitHub Actions](https://github.com/features/actions)を使用してテストからデプロイメントまでを自動化させる CICD の導入。ホスティングサービスには[Firebase](https://firebase.google.com/?hl=en)を採用。
- 使用言語、ライブラリーの変更。詳しくは下記 ④ に記載。

### ③ コンポーネント選定

![Tinedr-UI-Components](https://user-images.githubusercontent.com/48965717/130436850-473055a3-3624-485c-aa15-8a950e9acb31.png)

### ④ フレームワーク、使用言語、ライブラリー

- [react](https://reactjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [emotion](https://emotion.sh/docs/introduction)
- [emotion-reset](https://www.npmjs.com/package/emotion-reset)
- [react-spring](https://react-spring.io/)
- [react-use-gesture](https://use-gesture.netlify.app/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [unsplash-js](https://www.npmjs.com/package/unsplash-js)
- [react-spinners](https://www.npmjs.com/package/react-spinners)

## 難しかったこと

難しかったことは細かい点が４つほどありました。

### ① スワイプ機能をモバイルブラウザーでテストしたところうまく動作しなかった。
- 速度をつけずにゆっくりスワイプすると、少々動くがまた元の位置に戻る。
- スクリーンをプッシュしている状態＋素早くほんの少しだけスワイプするとスワイプされてしまう。

![swipe bug](https://user-images.githubusercontent.com/48965717/130398677-edd826a6-b878-4c4c-88aa-940555fcd63c.gif)

### 原因: 
ブラウザーではディフォルトでタッチアクション、つまりズームしたり、タップしたりする動作の読み取りがONとなっているため、ブラウザーの解釈で自動的に画面上を更新してしまっているため。
この場合は、横にスライドしている動作をスクロールと認識してしまっているんだと思われる。

### 解決方法: 
CSSプロパティーの`touch-action`を`none`にしてあげると、ブラウザーのタッチアクションの動作の読み取りをOFFにして、コード側にその裁量権が与えられるので、うまくいく。

### ② [react-spring](https://react-spring.io/)と[react-use-gesture](https://use-gesture.netlify.app/)がどのように組み合わさり、スワイプ機能を実現しているのか？

参考にしたコードは[react-spring](https://react-spring.io/)のドキュメントにも記載してある[こちらの例](https://codesandbox.io/embed/j0y0vpz59)です。

### 何が起こっていたのか: 

`react-spring`の[useSprings()](https://react-spring.io/hooks/use-springs)と`react-use-gesture`の[useGesture()](https://use-gesture.netlify.app/docs/hooks/)という関数たちが何をしているのかということを理解しているとスッと入ってくると思いました。


`useSprings()`は指定した数全てのオブジェクトにスプリングの機能（アニメーション）を与えます。この場合は一枚一枚のカードというオブジェクトに。
返り値は二つあり、ここでいう`props`という中身はオブジェクトArrayで一つ一つのオブジェクト内には`to()`で指定した、プロパティー(x,y,scaleなど)が`springValue`というスプリングアニメーション専用のタイプに変換され返ってきます。このプロパティーを変化させることでアニメーションを実現化せています。その値を変化させる事ができるのが二つ目の返り値である`set()`という関数になります。`react`の`useState()`みたいなものです。
```
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }))
```

`useGesture()`という関数はユーザーが画面操作時に特定の動作(ここではドラッグされた時)が行われた瞬間、瞬間に呼び出され、コールバックの引数にはその瞬間時のスピードや位置などの情報が入ったオブジェクトが入ります。

```
const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    ..省略..
　　　　　　　　　set(
      return { x, rot, scale,　..省略.. } }
    })
    ..省略..
})
```

`useDrag（）`と`useGesture()`の主な違いは`useDrag()`はドラッグ動作だけに反応するが、`useGesture()`は複数の動作を一度に組み合わせて使う事ができる。`useDrag()` + `usePinch（）`をカードコンポーネントに与えるなど。

![image](https://user-images.githubusercontent.com/48965717/130416011-264876ac-7ab9-4d4f-8569-b10a421e41ff.png)

さてもう一度何が起こっていたかという話に戻ると、
1. ユーザーがスワイプ動作をする。
2. そのスワイプ動作の瞬間の値が`useGesture()`によって取得される。
3. その値を使い、ユーザーが何をしているのか(クリックされている、左に動いているなど)という事を判断し、その状況によって`useSprings()`で作り出したプロパティーの値を`set()`で変えていくことによって動き（カードがSwipeされる)を作り出している。

### ③ `react-spring`の*`interpolate()`という関数をなぜ使用するのか？ 
*現在では`to()`が推奨されている。

[上記の例](https://codesandbox.io/embed/j0y0vpz59)から抜粋させてもらいました。
```
style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}
```
なぜこれでは動作しないのか？
```
style={{ transform: `translate3d(${x}px,${y}px,0)`　}}
```
### なぜ？: 
結論から先に言うと`interpolate()`はダイナミックなアニメーションをさせたい時に使う。

CSSアニメーションには大きく分けて二つのアニメーションが存在している。
1. Staticアニメーション
  
   `opacity`を0から1にしたり、`translateY`で100px上に動かしたりするなど、ブラウザーが全て行う単純な動作。

2. Dynamicアニメーション

    Dynamicアニメーションとは反対に複雑なアニメーションで主に`Javascript`で操作してアニメーションを行う。なのでユーザーの動作(スワイプ動作など）に合わせて複雑なアニメーションを作り出すことが可能となる。

以上の理由から、複雑なアニメーション(ダイナミックなアニメーション)を行いたい時は`interpolate()`を使う。

[複雑なアニメーションの例](https://react-spring.io/basics)

![image](https://user-images.githubusercontent.com/48965717/130428527-ba9accf9-ac63-4708-872d-4f447327b93b.png)

上記の`interpolate`の理解でいいと思うのですが、もう一歩深く調べたのでシェアします。

`interpolate`という英語の意味は `補間（ほかん)する`という意味です。

>内挿（ないそう、英: interpolation）や補間（ほかん）とは、ある既知の数値データ列を基にして、そのデータ列の各区間の範囲内を埋める数値を求めること、またはそのような関数を与えること。 またその手法を内挿法（英: interpolation method）や補間法という。

要は一般的には、あるデーターを基に不特定な部分を予測する事です。

アニメーション中での使われ方としては、ある瞬間とある瞬間の動きを定めてその間の動きは自動的に計算されるという事らしいです。
要は**滑らかにしている**という事です。例としてわかりやすいのは、CSSの`@keyframes`です。

[この記事](https://gigazine.net/news/20200121-dain-app/)では動画の補間ソフトフェアを使いフレームレートが低い動画を補間して滑らかにすることによって動画が自然になっている事がわかります。

以上のことを踏まえてからもう一度コードを見ると、理解が深まりませんか？
```
style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}
```

### ④ Github Actionsのワークフローに時間がかかっていた。

![image](https://user-images.githubusercontent.com/48965717/130406553-035f8352-ffee-4208-a059-aa82229374ac.png)

### 原因: 
dependenciesのインストールに大きな時間がかかっていた。

### 解決方法: 
`yarn --prefer-offline`を使いyarn cacheのディレクトリーにすでにダウンロードされているキャッシュをなるべく使い、もし既存のキャッシュに存在しない場合にだけサーバーからダウンロードするという形を取る事でワークフローのトータル時間が減少した。

![image](https://user-images.githubusercontent.com/48965717/130407668-3e74a9ec-137a-4c5b-8f3d-f189faf9aef5.png)


以上が私が感じた難しかったこと学んだことになります。

どこか間違っている点があればご指摘ください　🙇‍♂️
