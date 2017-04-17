
// Polyfill for Object.assign
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

/*
 * Components
 */
var Application = React.createClass({
  propTypes: {
    location: React.PropTypes.string.isRequired
  },
  transitionProps: function(title){
    return {onClick: function(){
      history.pushState(null,null,title);
      $('html,body').animate({scrollTop: document.getElementById("post").getBoundingClientRect().height-35},500,"easeOutExpo");
      navigated();
    }}
  },
  render: function(){
    page = window.location.pathname.split('/').pop().split('#').shift()
    switch(page) {
    case '':
    case 'index.html':
      //section = React.createElement('section', {id:"one", className:"wrapper special"},
      section = React.createElement('section', {},
        React.createElement(BlogView,
          Object.assign({}, this.props, {blog:this.props.blogs[0]})
        ),
        React.createElement(BlogView,
          Object.assign({}, this.props, {blog:this.props.blogs[1]})
        )
      );
      break;
    default:
      section = React.createElement(BlogView,
        Object.assign({}, this.props,
          {blog:this.props.blogs.filter(function(blog){ return blog.slug==page?blog:null})[0]}
        )
      )
    }
    return React.createElement('container', {},
      React.createElement('header', { id:"header", className:"alt"},
        React.createElement('h3', {},
          React.createElement('a', {href:'/'}, 'NIJIBOX Engineer Blog')
        )
      ),
      React.createElement('section', {id:"banner"},
        React.createElement('i', {className:"icon"}),
        React.createElement('h2', {}, "俺が魂を込めれば")
      ),
      section,
      React.createElement('section', {id:"post", className:"wrapper style3 special"},
        React.createElement('div', {className:"inner"},
          React.createElement('header', {className:"major narrow"},
            React.createElement('h2', {}, "We Are Hiring! 積極採用中"),
            React.createElement('p', {}, "NIJIBOXの組織文化や働きやすい制度、技術的な背景など表から裏まで紙面の許す限り更に詳しく紹介します"
            )
          ),
          React.createElement('ul', {className:"actions"},
            React.createElement('li', {}, 
              React.createElement('a', {href:"http://nijibox-recruit.jp/engineer", className: "button big alt"}, "詳しくはこちら"
              )
            )
          )
        )
      ),
      React.createElement('footer', { id:"footer"},
        React.createElement('div', {className:"inner"},
          React.createElement('article', {className:"feature left"},
            React.createElement('div', {className:"content"},
              React.createElement('h2', {}, "About Us"),
              React.createElement('span', {dangerouslySetInnerHTML:{__html:marked("リクルートグループの新規事業開発を担当するMedia Technology Lab.や自社顧客からの受託開発、およびNijibox自社のサービス開発・マーケティングソリューション導入を行っています。技術情報は[Qiita](https://qiita.com/organizations/nijibox)で。不定期に[築地ッカソン](https://www.facebook.com/tsukijickathon/)というハッカソンイベントもやってます！")}, style:{textAlign:"left"}}
              )
            ),
            React.createElement('span', {className:"image"},
              React.createElement('img', {src:"images/company.png"}))
          ),
          React.createElement('article', {},
            React.createElement(BlogListView,
              Object.assign({}, this.props,
                {transitionProps:this.transitionProps}
              )
            )
          )
        ),
        React.createElement('div', {className:"inner"},
          React.createElement('ul', {className:"copyright", dangerouslySetInnerHTML:{__html:"<li>&copy; NIJIBOX Co.,Ltd. </li><li>Design: <a href='http://templated.co'>TEMPLATED</a>, Photo: <a href='https://www.flickr.com/photos/itseacrane/6701113981/in/photolist-bd9XHX-6Kusan-6KyB7E-6KyB9W-6KyBcC-6KutKn-6KyzTq-6KyBtm-6Kuu8K-81PPWe-djvrbZ-bd9khz-6yw28t-5FRJyv-6KyBss-6KyBb1-6EZMHA-9CBrdG-6Kus6z-6KyzNY-6yw2ez-6yw23R-6yw472-9ByM9q-6dTPzh-6dTPks-6dPEnV-6dTPWS-6dTP4y-4vR9YB-nmg6SE-8hnoDm-9Bvp2Z-nmg6uf-8hj9c2-nokSqA-8zxwdh-478ePV-8H4wzM-h8q2QP-8zumJn-ufWBZP-4ygzww-noixsv-aeT8AM-4ch3Ye-4ygzxu-4yckPk-47cj4h-f6cKaN'>Sea Crane</a>.</li>"}}
          )
        )
      )
    )
  }
})

var BlogItem = React.createClass({
    propTypes: {
      date: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    },
    render: function(){
      return (
        React.createElement('div', {className:"inner"},
          React.createElement('a', {href:"/"+this.props.slug},
            React.createElement('h2', {}, 
              this.props.title
            )
          ),
          React.createElement('p', {}, this.props.date),
          React.createElement('span', {dangerouslySetInnerHTML:{__html:marked(this.props.text)}, style:{textAlign:"left"}}
          )
        )
      )
    }
  })

var BlogListView = React.createClass({
  propTypes: {
    blogs: React.PropTypes.array.isRequired,
    transitionProps: React.PropTypes.func.isRequired
  },
  render: function(){
    var self = this;
    var blogItemElements = this.props.blogs
      .map(function(blog) {
        return React.createElement('div', blog,
          React.createElement('h3', {}, 
            React.createElement('a', self.props.transitionProps(blog.slug), blog.date + ': ' + blog.title)
          )
        )
      })
    return React.createElement('section', {id:"one", className:"wrapper special"},
      React.createElement('h2', {style:{marginBottom:"40px"}}, "ブログ記事 アーカイブ"),
      blogItemElements)
  }
})

var BlogView = React.createClass({
  propTypes: {
    blog: React.PropTypes.object.isRequired,
  },
  render: function(){
    var blogItemElements = this.props.blogs
      .map(function(blog) { return React.createElement( BlogItem, blog) })
    return React.createElement('section', {id:"one", className:"wrapper special"},
      React.createElement(BlogItem, this.props.blog)
    )
  }
})


/*
 * Actions
 */
function navigated(){
  setState({location:window.location.hash})
}

/*
 * Model
 */
var state = {
  blogs: [
{"key":15,"date":"2017.03.31","slug":"techperk","title":"エンジニア向けの福利厚生の取り組みを開始しました && 開発室室長交替のお知らせ","text":"\n![sawada2fujiwara](blogs/20170331-techperk/sawada2fujiwara.jpg)\n\n開発室室長の@remoreです。NIJIBOX開発室では、エンジニアの自発的な成長支援を目的とした3つの新しい取り組み（TechPerk）を2017年4月より開始しましたのでお知らせします。\n\n- 能力向上支援\n- カンファレンス登壇支援\n- 組織リファクタリング合宿\n\n取り組みの概要は以下の通りです。※2017年4月時点の情報です\n\n- 能力向上支援\n  * NIJIBOX開発室のエンジニアは半期で1万円を上限として、書籍、ASP、外部カンファレンスへの参加チケット（交通宿泊費込み）のいずれかが自由に購入可能となります。また、関連するブログを執筆することで、1万円を超えて3万円まで補助を申請することが可能です。\n- カンファレンス登壇支援\n  * NIJIBOX開発室のエンジニアが提出した国内外のカンファレンスへのSpeaker発表申請(CFP)が通過した場合、内容に応じて組織が参加チケット費用および交通宿泊費を負担して業務として出張に行けます。\n- 組織リファクタリング合宿\n  * NIJIBOX開発室のエンジニアは組織リファクタリング（開発ツールやシステムの導入による、全社的な業務効率の改善や組織課題の解消）のための開発合宿を申請・開催可能です。\n\nCyberAgentさんやGMOペパボ株式会社さんの取組事例を参考にさせていただきながら上記取組の概要を検討しました。これらの取組自体は業界の中では目新しいものではないと思いますし、明文化していなくても実際に実施している企業も多いと思いますが、改めて明文化して取組として組織公認の活動として進めていくことで、技術者を支援する文化を促進していければと考えています。\n\nまた、2017年4月1日から開発室室長が@remoreから藤原に変更となりますので、こちらも併せてお知らせさせてください（@remoreはリクルートホールディングスの本社業務に集中することとなりました）。僕が在籍したのは、2011年3月にリクルートホールディングスに入社して出向辞令が出てから丸6年と1ヶ月の期間となります。在籍中に関わって頂いた社内外関係各所の皆様、在籍中は大変お世話になりました。\n\n今後NIJIBOXとしては新開発室室長の下でまた新しい活動や取組が今後スタートしていく模様ですので、引き続きご贔屓にしていただければ幸いです。僕個人としても今後の更なる組織の成長を外から楽しみに見守っていければと思います。\n"},{"key":14,"date":"2017.03.15","slug":"jawsugdays","title":"JAWS DAYS 2017 に参加しました","text":"\n皆さんこんにちは\n@niisan-tokyo です。\n\n3/11 に東京であった、日本AWSユーザーグループ ( JAWS-UG ) のイベントに参加してきました。\n参加人数は1600人を超え、PHPカンファレンス級の大盛況となっていました。\n\nご存知かとは思いますが、AWSとはAmazonが提供するクラウドサービスで、\n気軽にサーバを調達したり、ファイルを保存したり、メールを飛ばしたりと言った、たくさんのサービスを提供しています。\n当然弊社でも利用しているのですが、今回、よりAWSをうまく活用できるようになりたいと思い、イベントに参加しました。\n\n# 会場\n\n会場は五反田のTOC GOTANDA です。\n\n![会場](blogs/20170315-jawsugdays/1.jpg)\n\nJR五反田駅から徒歩で10分くらいのところにあります。\n建物も小洒落た感じで良かったです。\n\n![ネームカード](blogs/20170315-jawsugdays/2.jpg)\n\nPHP カンファレンス関西でもあった、自分の属性をはっつけるネームカードですね。\nこういうの、とてもいいものだと思うので、もっと流行って欲しいですね。\n\n![スクリーン](blogs/20170315-jawsugdays/4.jpg)\n\n会場は5つのトラックと3つのワークスペースに分かれていました。\nJAWS-UGのマスコットのサメさんですが、なかなかかっこいいと思います。\nJAWSというネーミングセンスとか、私にも欲しいです。\n\n![AWSへの情熱](blogs/20170315-jawsugdays/5.jpg)\n\n当然AWSのブースもあったわけですが、付箋にAWSへの思いの丈を書いて貼っつけるなんていう企画をやっていましたので、\n私も一筆書いてみました。\n私が書いたのはどこにあるのでしょうかね。\n終盤にはこれと同じようなパネルが5枚くらい出来上がってました。\n\n# 内容\n\nとまあ、会場の話ばかりしていても仕方ないので、私の参加した各セッションの内容について軽く紹介しましょう。\n\n## AWSでアプリ開発するなら 知っておくべこと\n\nhttp://jawsdays2017.jaws-ug.jp/session/1789/\n\nはじめに聞いたセッションは赤ドクロさんの発表ですが、初っ端から内容が濃いです。\n私のメモ帳に170行くらい書き殴られているので、全部書ききるのは難しいため、\nとりあえず一言で言うと、クラウドに適したアプリを作ろうってことでした。\nスライドが公開されているようですので、是非ともご一読ください。\n\n## AWS SECURITY DEATH \\m/ ～セキュ鮫様からのお告げ～ by Security-JAWS\n\nhttp://jawsdays2017.jaws-ug.jp/session/1512/\n\nJAWS-UGはテーマに応じて細かく支部が別れているようで、今回はその中のSecurity支部の方々の発表です。\n\n私は常々、DDoS攻撃の恐怖に怯えていまして、こんなん食らった日には、とんでもない転送量分が課金されるんじゃないか、と思っていました。\n本セッションにて、AWSではこのような事態に対応すべく、DDoSシールドという保護対策が用意されているということを、初めて知りました。\nなんと、請求を保護する機能までついているので、DDoS受けても少し安心ですね。\nあとは、AWS Configの話も出てきて、やはりこれも初めて知りました。\n\n私も普段からAWSは利用していますが、やはり担当領域が違うためか、知らない機能って驚くほどあります。\nそういった機能を発掘できるという意味でも、今回のイベントは非常に有益でした。\n\n## ランチセッション\n\nご飯を食べながら人の講演を聴くというのは、なんとも贅沢な楽しみだと思います。\nでも、どうせ大したお弁当でないんでしょ？って思ってたら。。。\n\n![ランチ](blogs/20170315-jawsugdays/3.jpg)\n\n意外と豪勢です。\n味も文句なしでしたし、お茶も用意されていました。\n\n## コミュニティで拓く、パラレルキャリアへの道\n\nhttp://jawsdays2017.jaws-ug.jp/session/1522/\n\nコミュニティマーケティングを軸にしてパラレルキャリアを実現した方の体験談を公演していただきました。\nコミュニティマーケティングという言葉自体、初めて知ったのですが、\nこれいいですね。\nサービスを普及させるための手段として、今後欠かせないものになるでしょう。\n\nまた、パラレルキャリアで困ったことで面白かったのは、名刺入れがどうしてもいいものが見つからないということと、\n社会保険制度がこのような働き方に対応できていないというところでした。\n\n## コンテナに挫折したあなたへ by JAWS-UGコンテナ支部\n\nhttp://jawsdays2017.jaws-ug.jp/session/1659/\n\n当初はもう少しぶっ飛んだタイトルだったのですが、このタイトルに落ち着いたようです。\n\n私もここ1年ほどコンテナを使った開発を続けてきましたが、\n今やコンテナを使わないで開発したりデプロイするというのは考えられないようになりました。\nあまりにコンテナ開発に馴染みすぎたせいで、[こんな記事を書いたりもしています](http://qiita.com/niisan-tokyo/items/88a53a1b4aa7ad60723e)。\n\nダイレクトマーケティングはここまでにして、コンテナ運用をするときに、\nクラスターという概念があるのですが、これに関して今までよく理解できていませんでした。\nしかし、この発表にてようやく理解することができました。\n\n# まとめ\n\nこんな感じでJAWS-UG DAYS楽しんできました。\n参加料として1000円かかるのですが、元が取れすぎて困る！レベルの内容で、非常に満足しています。\nコミュニティの存在の大切さを実感できるイベントでした。\n\nまた、これも定型句のようなものなので、述べておこうと思いますが、\n弊社ではエンジニアを積極的に採用しております。\nコンテナでの運用も試験的にですが始めていますので、興味を持たれた方がいましたら、\n弊社にコンタクトを取っていただけるとありがたいです。\n\n今回はこんなところです。\n"},{"key":13,"date":"2017.03.03","slug":"hajimenoippo","title":"[はじめのいっぽ] 合宿に行ってきました++","text":"\n\n初めまして、開発室の@ifhungです。\n\n## はじめに\n\n[前回](/onyadomegumi)に引き続き開発合宿を行いました。\n\n前回残った課題をとりあえず**作りきる**を目標として設定しています。\nメンバーは[前回](/onyadomegumi)の５人＋新参の私です。\n2月頭のあるいい天気の日に[はじめのいっぽ](http://ippo.jp/)さんにお邪魔させていただきました。\n\n\n> ## そもそも、なんのために合宿したの？\n> **「経営企画室が日々抱えてる問題をエンジニア観点で解決する！」**\n> 日々支えていただいている部署へご奉仕です。\n> 事前に問題をヒアリングしておいて、やる内容を定めておきます。\n> ゴール設定大事です。\n\nというわけで、\n\n## 目標成果物\n1. ICカードリーダーによる出席確認\n2. 備品申請フォーム周りの整備\n3. 労働時間集計モニタリングを自動化\n4. ミッション運用のWEB化 (NEW!)\n\n## タイムスケジュール\n\n### 1日目\n- 12:00-13:00 東武日光駅現地集合、昼食、移動\n- 13:00-13:30 はじめのいっぽcheck-in\n- 13:30-19:00 作業\n- 19:00-20:00 夕飯\n- 20:00-24:00 作業\n\n### 2日目\n- 8:30-9:00 朝食\n- 9:00-12:00 作業\n- 12:00-13:00 昼食\n- 13:00-14:15 作業\n- 14:15-15:00 成果発表\n- 15:00- 撤収\n\nつまりご飯以外ずっとガリガリしている感じです。充実充実〜\n\n\n## 詳細\n\n2月の頭とある開発日和の朝、少し眠気が残っていた目をこすりながら、日光行きの電車に乗り込んだ。\n電車を降りたら、肌を突き刺すような寒い風が眠気を吹き飛ばし、一瞬視界もクリアになった。\n山が見える。普段の隅田川ではなく、山だ。本当に合宿に来たなぁと実感した。\n「よし、今日も一日がんばるぞい！」\nとは言わなかったが、そんな感じの意気込みだった。でもやっぱり寒い、早くあったかい所に行きたい。\n\n私の日本語力が尽きましたのでここからは写真コメントで説明させていただきます。\n\n\n![東武日光駅](blogs/20170303-hajimenoippo/3Image.jpg) \n東武日光駅。いい開発日和。全ての始まりはここからです。\nお昼は、我らが室長@remoreのチョイスで適当に入った洋食屋。美味しかったです。\n\n\n![はじめのいっぽ](blogs/20170303-hajimenoippo/IMG_9084.JPG)\n今回の宿兼合宿会場のはじめのいっぽさん。合宿の初めの一歩です。\n\n## さーてコード書くか！\n![合宿中1](blogs/20170303-hajimenoippo/IMG_9058.JPG)\n\n![合宿中2](blogs/20170303-hajimenoippo/IMG_9059.JPG)\n\n割とみんなもくもくとやってました。同じチームは近くに座っててコミュニケーションも取りやすく、\n下準備と事前設計のおかげて着実に成果物が捗ってます。予想外のトラブルとうまくいかないところもありましたが。\n\n![ワンちゃん](blogs/20170303-hajimenoippo/25Image.jpg)\n入浴シーンも撮りたいですが犯罪になるのでここはお風呂の前のワンちゃんで我慢してください。\n入浴中もずっと技術談議してるところからエンジニア魂を感じます。(盗聴じゃありません、聞こえちゃうんです。)\n\n## 夕飯\n![肉](blogs/20170303-hajimenoippo/IMG_9073.JPG)\n\nこれぞ本格的な炭火焼料理！\n食材のうまさをそのまま感じられます。\nもぐもぐしながらオヤジギャグで盛り上がったり盛り上がらなかったりしてました。ソフトウェア開発を焼肉で例えると「DB」は何？みたいな話で、本当に何を話してたんだか…。\n\n### 厳選：\n- エビでA-Bテスト\n- ソースをソース(ソースコード)にかける\n- 鳥を取りに行く\n- おいしいたけ(個人的にお気に入り)\n\n## 食べたからコード書くか！\n![夜](blogs/20170303-hajimenoippo/IMG_9077.JPG)\n夜が更けるまで開発を続けてました。\n\n![おにぎり](blogs/20170303-hajimenoippo/IMG_9076.JPG)\n差し入れのおにぎり。あたたかくて嬉しいです。\n\n## 二日目\n![翌日朝](blogs/20170303-hajimenoippo/IMG_9082.JPG)\n翌日朝、今日も絶好の開発日和です。\n\n![さっしー](blogs/20170303-hajimenoippo/IMG_9096.JPG)\nエネルギーがないと働けない。この顔を見れば美味しさがわかるでしょう。\n\n## 成果発表\n![成果物発表](blogs/20170303-hajimenoippo/IMG_9100.JPG)\n\n成果物発表タイム。互いの成果物をレビューしつつ反省と改善点も洗い出してました。\n\n### 成果物まとめ\n1. ICカードリーダーによる出席確認  \n → バッチリ。  \n2. 備品申請フォーム周りの整備  \n → バッチリ。Backlogとの連携、動作確認もできました。  \n3. 労働時間集計モニタリングを自動化  \n → 前回よりさらにパワーアップ。  \n4. ミッション運用のWEB化  \n → 使い勝手まだ悪いが、Excelでの運用と同等くらいのものができました。  \n\n## 感想\n\n日々業務に追われてなかなかこうやってがっつり集中して何かを作ることはできないので\n合宿のおかげて専念できてよかったなぁと思いました。ちなみにおいしものを食べながら技術トークするのは最高でした。\n\n今回は、開発できる時間がちょっと短く、成果も出さないといけなかったため、ある程度規模のある、普段使えていない技術やツールを冒険して取り入れるということを一部避けましたが、もうちょっと色々新しい技術にTRYしたかったですね。\n\nこういう形で合宿をやって何かを形にするのはすごい達成感と充実感があります。 普段とまた違う環境と形での開発は楽しいし、少人数だからすぐ他の人からフィードバックもらえて、何か新しい考えを生み出せされるのは合宿の良さ。今回だけ、エンジニアだけじゃなくて、こういった形の合宿を広めていけたらいいなぁと思いました。\n\n## おまけ\n\n![おまけ](blogs/20170303-hajimenoippo/IMG_9103.JPG)\nさすがに二日がっつり開発に集中して疲れたようで電車で爆睡した@harukao氏と@tack.sato氏。\n\n\n\nおしまい\n"},{"key":12,"date":"2017.02.20","slug":"devsumi","title":"デブサミ2017に行ってきました","text":"\nこんにちはみなさん\nこちらではお久しぶりの@niisan-tokyoです。\nタイトル通りですが、デブサミ2017に行ってきましたので、こちらで報告しようと思います。\n\n# Developers Sumit 2017\n\n毎年行われているデブサミに、今回初参加してきました。\n目黒の雅叙園というところで開催しているのですが、会場からしてなかなかすごいところでした。\n\n![深い谷](blogs/20170220-devsumi/IMG_0510.jpg)\n目黒駅からこの深い谷を通って雅叙園へと行きます。\n写真だとわかりにくいですが、わりと急な坂で、しかもそこそこに長いです。\n\n![雅叙園](blogs/20170220-devsumi/IMG_0511.jpg)\n谷を降りきるとすぐそこに雅叙園があります。\n外見からしてかなりの高級感を醸しているため、緊張してきます。\n\n![雅叙園の中](blogs/20170220-devsumi/IMG_0512.jpg)\n本当にここでやっているのかと言いたくなるような内装です。\nワシただのプログラマのおっさんなんだが。。。\n\n![会場発見](blogs/20170220-devsumi/IMG_0513.jpg)\n受付を発見しました。\nようやくカンファレンスという感じがしてきました。\n\n![中はこんな感じ](blogs/20170220-devsumi/IMG_0514.jpg)\n中の様子はこんな感じですね。\n\n![水飲み場](blogs/20170220-devsumi/IMG_0515.jpg)\n会場は沢山の人がいて、熱気にあふれていましたが、そんな熱気に負けないためか、水飲み場も用意されていました。私も2杯位いただいています。\n\n# ピックアップ\n私が聞いた中で、印象に残った発表をピックアップしてみます。\n\n## グーグル流のDevOps\nhttp://event.shoeisha.jp/devsumi/20170216/session/1255/\n\n@enakai00さんの発表で、SlideShareにも公開されています。\n\nhttps://www.slideshare.net/enakai/googledevops\n\n端的に言ってしまうと、仕事の割り振りとして、アプリケーション制作部隊と基盤制作部隊と運用部隊が別れているけれど、知識としてはどの部隊も差がないようにしているというものでした。\n実際にアプリケーション部隊がどのように運用を考えているか、基盤のことを理解している上で実装しているかを実例を添えて紹介されていました。\n\nGoogleらしい合理的な考え方でしたが、本来はそうあるべきなんだろうと思いました。\n運用考えないで実装するとか、インフラの状況よくわからないのに実装しているとか、よくよく考えるととても不思議なことがこの業界で横行しているので、逆に新鮮に感じる考え方でした。\n\nちなみに、私が最近Dockerに傾倒している理由には、「インフラの状況がよくわからない、何が入っているのか知らない」という事態が嫌なので、何がどうやって動いているのか確定できるコンテナ上でアプリケーションを運用したいから、だったりします。\n\n## 機械学習を「民主化」する\nhttp://event.shoeisha.jp/devsumi/20170216/session/1286/\n\nこれもGoogleからの講演ですね。\n講演前の説明資料ではTensorFlowの説明となっていたのですが、実際の講演では、TensorFlowを使わずとも汎用的な機械学習機や学習済みモデルを利用するサービスが有ることも説明していました。\n\nTensorFlowを使ってきゅうりの仕分け器を作った農家の話が紹介されていましたが、コレのすごいところは、食品系の大企業が長年かけて作るような工場での不良品選別機のようなものを一般の農家で実装してしまったところです。\n\n機械学習が持つ大きな可能性を実感できる例だと思います。\n\n# 感想\n他にもコンテナの運用の話やデータ分析の話などを聞いてきましたが、企業ごとにアプリケーションの構築や運用へのアプローチの仕方が違うんだなぁと実感しました。\n\n弊社は業態の変化に伴い実装・運用のやり方が大きく変わっているため、確定的な手法はまだありませんが、逆に様々な試行錯誤が繰り返されています。\n私も現在はコンテナを利用した運用の自動化を模索しておりますが、今回のデブサミでより明確な指針を得られたように感じております。\n\nなお、定型句のようなものなので、とりあえず述べておきますが、弊社ではエンジニアを募集しております。\n良い開発手法や運用方法を持っているけど、現在の環境では適用できなかったり行かせないという方がいらっしゃれば、弊社に応募するのも一興かと思います。\n\n今回はこんなところです\n\n# おまけ\nまあ、当然ですが、帰り道もこの坂登るんですよね\n![帰りもある](blogs/20170220-devsumi/IMG_0516.jpg)\n"},{"key":11,"date":"2016.12.17","slug":"onyadomegumi","title":"[おんやど恵] 合宿に行ってきました","text":"\nどうも、開発室、未来のCTO、@tack.saitoです。\n\n我らが開発室の室長 @remoreが「そうだ、合宿に行こう」ばりの思いつきで合宿へ行くことになりました。\n\n\n\n(本当は思いつきでなく、もっと考えてたと思いますよっ)\n\n\nいざ、合宿！！\n\n\n## そもそも、なんのために合宿したの？\n\n**「経営企画室が日々抱えてる問題をエンジニア観点で解決する！」**\n\n日々支えていただいている部署へご奉仕です。\n\n事前に問題をヒアリングしておいて、やる内容を定めておきます。\n\nゴール設定大事です。\n\n## 目標成果物\n1. 社員証(ICカード)をかざすと、番号を読み取って、出席を取れるよーな何か\n2. 備品申請フォーム周りの整備\n3. 労働時間集計モニタリングを自動化\n\n\n## 誰が行ったの？\n\nエンジニア5人で行きました。\n\n室長から新卒エンジニアまで、それぞれ視点が違う感じの5人。~~(よく分からない組み合わせ)~~\n\n\n## どこへ行ったの？\n\n[おんやど恵](http://www.onyadomegumi.co.jp/) さんにお邪魔させていただきました。\n\n\n## 詳細\n\n12月の初旬。 11時に湯河原現地集合。  \n\n集合時間から宿まで時間があるので、まずは湯河原を軽く探索。  \n\n### 源泉？\n\n![源泉？](blogs/20161217-onyadomegumi/02.jpg)  \nあったかい。\n\n### 五所神社\n\n![五所神社](blogs/20161217-onyadomegumi/03.jpg)\n\n手水舎の龍が~~ハイテク...~~水を出してくれるので、ちょっと感動します。  \n大木があったりして、圧倒されます。\n\n### かぼちゃ美術館\n\n![かぼちゃ美術館](blogs/20161217-onyadomegumi/04.jpg)\n\n草間彌生さんの作品がたくさん飾ってありました。  \nインパクトすごい。\n\n\n### 昼ごはん\n\nふらっと入った店でしたが、お魚美味しい。\n\n湯河原いいとこ。\n\n### いざ、合宿\n\n![おんやど恵](blogs/20161217-onyadomegumi/05-1.jpg)\n\n![おんやど恵](blogs/20161217-onyadomegumi/05-2.jpg)\n\nテンション上がってきます。  \n僕がまだポーズとってるのに、室長はもう入ろうとしてますからね。  \nテンションの高さが違います。   \n\n\n会議室に通していただき、いざ開発です。\n\nお茶(無料)もお菓子(有料)も置いてます。\n\n![お茶](blogs/20161217-onyadomegumi/07.jpg)\n\n![お菓子](blogs/20161217-onyadomegumi/08.jpg)\n\n\nこれはありがたい。\n\n**あったかいお茶ほど開発に合うものはありません。**\n\n\nふらっと休憩がてらホテル内を散策すると、そこには**足湯**。\n\n![足湯](blogs/20161217-onyadomegumi/10.jpg)\n\n何これ素敵すぎ。\n\nタオルがすぐそこに用意してある心遣いもありがたいですね。\n\n足湯の先には池があり、鯉っぽい魚が泳いでました。\n\n![足湯](blogs/20161217-onyadomegumi/12.jpg)\n\n優雅ですな〜。\n\n戻ると、すでにくつろいでいる室長。\n\n![みかん](blogs/20161217-onyadomegumi/09.jpg)\n\nいつの間にみかん買ったんだ...!!\n\nそんな感じで開発も捗り、お部屋へ。\n\n\n![部屋](blogs/20161217-onyadomegumi/21.jpg)\n\n急に旅行っぽくなり、はしゃいじゃいます。\n\n**そして...**\n\n### 温泉\n\n５人で入って状況を共有して、開発の方針を確認しました。\n\n**「nodeでやるよか、Athena使えばいいんじゃね？」**\n\n**「jsはかけなくても、SQLならみんな書けるし、誰でも(?)作業できるじゃん」**\n\nと、僕が半日かけて書いたjsのコードは捨て去り、\n\nAWSの新サービスであるAthenaを使う方針へ。(**温泉の中**)\n\nいやー、温泉はいいですね。\n\nクリエイティブな発想が出てきます。\n\n**そして念願の...!!**\n\n![部屋](blogs/20161217-onyadomegumi/22.jpg)\n\n### 温泉 からの 夕食\n# 最高です。\n\n\n(このあと五月雨でご飯が来たので、写真がなくて申し訳ない...)\n\nただ、めっちゃ美味しかったです！！\n\n夜に向けて、やる気を充電しました。\n\n夜も~~ちょこっと~~ ガッツリ開発しましたよ。\n\n1日目、終了。\n\n(成果物、出せるかなー...)\n\n## 2日目\n\n8:30 健康的な時間 朝ご飯\n\n![朝ご飯](blogs/20161217-onyadomegumi/23.jpg)\n\n素敵すぎて、涙が出る...\n\n朝食後は、ちょっと自由時間。\n\n温泉に入る人もいれば、会議室でコード書く人も。\n\n10時にチェックアウトします。\n\nただ、会議室を19時まで予約したとのことで、**まだまだ開発します**。\n\n進捗の共有を行い、僕やばいです。助けてください。\n\nって方針へ。\n\n手が空いてる人を総動員して、手伝ってもらいます。\n\n僕SQL書くよ！\n\n僕はLambda部分！\n\n僕はQickSight部分調べるよ！\n\n僕はQickSightとAthena連携部分調べる！\n\n**( ；∀；)**\n\n** 合宿サイコーだー **\n\n## お昼休憩時\n\n![県境](blogs/20161217-onyadomegumi/17.jpg)\n\n![県境2](blogs/20161217-onyadomegumi/19.jpg)\n\nちょうど神奈川と静岡の県境の橋を見つけました。\n\n紅葉も綺麗で和みます。\n\n.....。\n\n\nてな具合で、18時ぐらいまでガリガリ開発しました。\n\n\n## 合宿終了...\n\n![ふりかえり](blogs/20161217-onyadomegumi/24.jpg)\n\n合宿の結果をそれぞれ成果発表します。\n\n## 成果\n1. 社員証(ICカード)をかざすと、番号を読み取って、出席を取れるよーな何か\n\n  **-> できた！**\n\n2. 備品申請フォーム周りの整備\n\n  **-> できた！**\n\n3. 労働時間集計モニタリングを自動化\n\n  -> ~~だいたい~~ できた。\n\n3については、残った作業はあるものの、ある程度は形になりました。\n\n## KPT的な感想\n\n* SQLガリガリはつらかった\n* Try: NativeScriptやりたかった\n* Problem: 準備に時間かけるべきだった\n* 普段使えない技術使えた、たのしかった\n* Javaさわるとは思わなかった\n* ゴール設定が不明瞭だったので、もう少し設定しておけばよかった\n\n\n## まとめ\n\n今回は下準備を結構したつもりでしたが、\n\nもっとしておいてもよかったなーと思いました。\n\n~~(せっかく温泉きたんですから、もっと楽しみたい！)~~\n\n合宿っていうと、普段使わない技術にチャレンジしやすい環境だったり\n\n「何か形のある成果物を...!!」というプレッシャーがあり\n\nいい体験ができたなーと思いました。\n\nこういったエンジニアに向けて、環境面で手厚くサポートしてくださる\n\n## [おんやど恵](http://www.onyadomegumi.co.jp/) さんは最高ですっ！！\n\n是非また来たい。\n\n![まとめ](blogs/20161217-onyadomegumi/25.jpg)\n\n\n### おしまい。\n\n"},{"key":10,"date":"2016.12.08","slug":"rubyconf-recommended-talks","title":"RubyConfとRubyConf Taiwanに参加してきました","text":"\nこのブログは[NIJIBOX Advent Calendar 2016](http://qiita.com/advent-calendar/2016/nijibox)の8日目の投稿です。\n\n![A sight at CVG](blogs/20161208-rubyconf-recommended-talks/airport.jpg)\n\n開発室室長の@remoreです。11月10日〜12日の3日間でオハイオ州シンシナティで開催されていたRubyConf 2016と、12月2日〜3日の2日間で台湾で開催されたRubyConf Taiwan 2016に、主にSpeakerとして参加してきました。どちらのカンファレンスも会社の業務として出張で行ってきたものです。このブログでは2つのカンファレンスの中で最も興味を引いたTalkをいくつか紹介したいと思います。\n\nなお、生活の記録的な内容は個人のブログの方で紹介していますので、興味のある方がいればこちらもどうぞ。\n\n- [RubyConf 2016に参加しています | 48JIGEN *Reloaded](http://rimuru.lunanet.gr.jp/notes/post/rubyconf-2016-day-0/)\n- [RubyConf 2016に参加しました | 48JIGEN *Reloaded](http://rimuru.lunanet.gr.jp/notes/post/attended-rubyconf-2016/)\n- [RubyConf Taiwanが良い感じだった | 48JIGEN *Reloaded](http://rimuru.lunanet.gr.jp/notes/post/rubyconf-taiwan-2016/)\n\n## Methods of Memory Management in MRI\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/r0UjXixkBV8?list=PLE7tQUdRKcyaMUYwB6tTX5p2Z6fOCdGRE\" frameborder=\"0\" allowfullscreen></iframe>\n\n日本のKaigiでもおなじみのAaron Patterson(@tendorlove)のTalk。CRubyでのメモリ確保やGCの動作について初心者にも分かりやすく、面白く深く紹介してくれます。内容も当然オススメですが、動画序盤10分くらいで展開されるIcebreakingでの@tenderlove節が最高過ぎて至福でした。内容も解説が丁寧で勉強になるのですが、個人的には特にTagged Pointerの考え方が勉強になりました。[Fixnumのobject_idが常に奇数であり演算可能ですぐにそれと分かる](http://www.sarahmei.com/blog/2009/04/21/object-ids-and-fixnums/)などは聞いたことがあったのですが、RVALUEが40bytesであることの意味についても知りHeap領域への理解が少し深まりました。\n\nSpeaker Deckでの資料は[こちら](https://speakerdeck.com/tenderlove/methods-of-memory-management-in-mri)\n\n## From no OSS experience to the core team in 15 minutes a day\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6jUe-9Y__KM?list=PLE7tQUdRKcyaMUYwB6tTX5p2Z6fOCdGRE\" frameborder=\"0\" allowfullscreen></iframe>\n\nBundlerのリードデベロッパーのAndré Arko(@indirect)のTalk。OSS関係の活動を始めるにあたって、その前に整理しておいた方が良いゴール設定についての考え方から、実際にプロジェクトに参加してまずやるべきことや続けるべきこと、参加度を深めて効果的に貢献していくために気をつけるべきポイントなどについて、初心者がよく陥りがちなケースにも触れながら紹介していました。Talkの中で@indirect自身が強調していたのが（大事なことなので2回言うって言ってた）、\"Only work for free if you can and if you want to\"という部分で、この言葉が最も印象に残っています。GitHubはレジュメではないとか、OSSやる以外にも時間の使い方を考えた方がよいことだってあるとか、OSSの活動と人生における時間の使い方についても具体的かつ平易にアドバイスがあるなど、参考になるポイントが多いTalkでしたので、ぜひこれも紹介しておきたいと思います。\n\nちなみに、オススメされていたOSS活動への参加の仕方をかいつまむと、以下のような流れで参加していくとよいとのことでした。これらのような内容が気になる人にはTalkの視聴をオススメします。\n\n- 1日15分と決めて活動する\n- 時間の枠内で、プロジェクトの全部のドキュメンテーションを読む\n- 読み終わったら、Issueとかで上がってる質問のうち答えられる部分について答えていく\n- そうしてるうちにドキュメンテーションを改良したら良いとことかエラーメッセージを改良したら良いところが見つかっていくので、それらを提案していく\n- そのうちバグの再現もできるようになってくるので、再現してあげて再現手段を明確にしてあげたり、結果が違わないことを確認していくと、テストコードの改良にも寄与していくことになる\n- このあたりでpatchを書けるようになっているはず\n\n本Talkに関する本人のBlog記事は[こちら](http://andre.arko.net/2016/11/12/how-to-contribute-to-open-source/)\n\n## Am I Senior Yet\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/jcTmoOHhG9A?list=PLE7tQUdRKcyaMUYwB6tTX5p2Z6fOCdGRE\" frameborder=\"0\" allowfullscreen></iframe>\n\nその他にも良かったTalkがたくさんあったのですが、最後にシニアエンジニアになるとはどういうことかについて語っている\"Am I Senior Yet\"というTalkを紹介して本稿を終えたいと思います。内容としては、シニアエンジニアになるといった場合に技術的に優れたエンジニアになるという側面はよく紹介されるが、それはシニアエンジニアに求められることの一つの側面でしかなく、他の部分 - チームをリードする場合に必要となる、チームのパフォーマンスを最大化するためのTeachingという側面についても取り上げたいといった内容です。\n\n内容としては、SpeakerであるKatlynがこの5年間の業務経験を通して学んだ、シニアエンジニアとして振る舞う際に気をつけるべき8つのlessonsについて紹介しています。目次と意訳を下記に記載します。特に\"2. Learn to tailor your reponse to your audience\"で紹介されていた[この図](https://speakerdeck.com/katlyn333/am-i-senior-yet-grow-your-career-by-teaching-your-peers?slide=26)の整理が自分の経験的にも腹落ちしましたし、良い整理がされていると感じました。\n\n1. A question is an opportunity for growth(メンバーから質問が来た時に何を答えるべきか)\n2. Learn to tailor your reponse to your audience(相手を意識した応答のコツ)\n3. Resist the urge to teach by doing(背中を見せるスタイルだけだと伝わらないことがある)\n4. Keep an eye out for mimicry(コピペコード(偶発的プログラミング)の発生に目を光らせる)\n5. Teaching is about communicating effectively(コミュニケーションスキルを常に磨き続ける)\n6. Have realistic expectations(Teachingは時間のかかる作業であり、現実主義で考える)\n7. Teaching also benefits the teacher(教えることは学ぶこと)\n8. Talk to your manager about how you can learn more effectively(自分がより学び成長するためにできることを上司と話す)\n\nSpeaker Deckでの資料は[こちら](https://speakerdeck.com/katlyn333/am-i-senior-yet-grow-your-career-by-teaching-your-peers)\n\n## まとめ\n\nRubyConfは日本のKaigiとは違い、技術的なTalk以外にもバリエーションに富んだTalkが聞けるConferenceで、このようにキャリア開発に関するTalkも聞けたのは面白かったです。実際に現場で開発業務を担当した場合に取り組むべき課題が技術的な問題だけではないことも多々あるかと思うので、こういったTalkも聞けるというのはRubyConfに行ってみてわかった海外のConferenceならではの良さだなと感じました。\n\nNIJIBOXでは今年4月以降PHP Conference関西やRubyConf, RubyConf Taiwanなど、Speakerとして登壇する場合に業務（出張）扱いで行くことを推進・推奨しています。来年も様々なConferenceでの報告が本ブログに投稿されることだろうと思いますので、私も一読者として配信を楽しみにしています。\n\n"},{"key":9,"date":"2016.11.11","slug":"bearsunday","title":"BEAR.Sundayの講演会が行われました","text":"\n#導入\n2016年10月17日にPHPフレームワークBEAR.Sunday開発者である郡山昭仁さんにお越しいただき、講演をしていただきました。\n開催場所が少し離れていたもののネットワーク越しでも聞きたい！と多くのメンバーが参加しました。\n\n![lecture](blogs/20161111-bearsunday/lecture.jpg)\n\n#BEAR.Sundayについて\nBEAR.Sundayは以下の３つのオブジェクトフレームワークで構築されています。  \n（各オブジェクトフレームワークの説明は[BEAR.Sunday](http://bearsunday.github.io/manuals/1.0/ja/index.html)公式より引用）\n\n- Ray.Di\n>依存関係逆転の原則に基づいてオブジェクトを結びます。インターフェイスに対するプログラミングは、コンテキストによる振る舞いや将来の変更に柔軟です。\n- Ray.Aop\n>アスペクト指向プログラミングで本質的関心と横断的関心を結びます。アノテーションでログや認証を指定することができます。\n- BEAR.Resource\n>情報をリソースにして、ハイパーメディア制約で結びます。アプリケーション内部の情報もWebの世界と同じように統一されたURIとメソッドで扱うことができます。\n\nDIは様々なところで実装しているのを見かけますが、AOPの実装をしている例は少ない印象があります。  \nしかしながらもAOPの有用性に着目し、組み込むことにより柔軟な実装が行えるように設計されています。\n\n実装の詳細については弊社の指山くんがQiitaにまとめてくれているので以下リンクからどうぞ！  \n[依存性の注入とアスクペクト指向とRESTfulなWebアプリ開発のすゝめ - Qiita](http://qiita.com/sashiyama/items/50c9239f83ad56cdf56f)\n\n#講演後、質疑応答など\n一通りの講演を終えた後、BEAR.Sundayについてや郡山さんの考え方などの質疑応答があり、  \n大変興味深いお話をしていただけました。\n\n![after](blogs/20161111-bearsunday/after.jpg)\n\n###もっとエンジニアはこうして行くべきではないか\nフレームワークを作成しようというシンプルな動機から完成までたどり着くのは難しいものであるにも関わらず、  \n完成させ評価まで受けるものを作り上げた功績は大変素晴らしいものであり、自分もそのようなエンジニアになれるよう頑張ろうという気持ちになれました。  \n誰かの作ったもので何かをやるのではなく自分が新しいものを作っていくことを意識していければ、今より広い世界が見えてきそうですね。\n\n\n#最後に\n社内で業務に従事しているだけではなかなかお話する機会のないフレームワーク開発者の方の講演を聞き、  \n普段気付けない発見や考え方に触れることができた講演会でした。  \n郡山さんのように外に向かって発信できるエンジニアを目指し、日々研鑽を重ねていきたいところです。"},{"key":8,"date":"2016.08.20","slug":"tsukijickathon-vol-4","title":"築地ッカソン vol.4 を開催しました","text":"\n2016年8月20日(土)に自社開催のハッカソンイベント「築地ッカソン Vol.4」を開催しました。\n\n今回の築地ッカソンのテーマは、前回に引き続き「VR」。  \n当日は豪雨だったにもかかわらず、10名以上の参加者が集まりました。\n\n#開発開始\n\n10:00頃に主催者から簡単な説明があったあと、  \n各自自由に開発していただく形式ではじまりました。\n\nお昼頃には天候も回復。途中参加の方もちらほらと来られ、  \nアイデア交換や技術の共有などが活発にされ大変賑やかな様子でした。\n\n#成果発表\n\n17:00頃に開発終了し成果発表会へ。お酒を飲んだりお食事をつまみながら  \n談笑しつつ、気分がのってきたあたりでゆる～い感じの発表が行われました。\n\n![バーチャル恋愛](blogs/20160820-tsukijickathon-vol-4/presentation.jpg)\n\n#今回できあがったアプリ達\n\n* ○○を探せ\n* バーチャル迷路\n* FPS\n* 恋愛シミュレーション\n* アニメキャラをVRで紹介\n* レシポVR\n\n今回の得票部門は前回にひきつづき「いいね」に加えて  \n「バーチャルだね」「リアルだね」と3部門。\n\n![バーチャル恋愛](blogs/20160820-tsukijickathon-vol-4/game.jpg)\n\n得票数がもっとも高かった３名の方に賞品が贈られました。\n\n![バーチャル恋愛](blogs/20160820-tsukijickathon-vol-4/winning.jpg)\n\n#懇親会の様子\n\n普段のお仕事のあるある話や技術トークで盛り上がる面々。\n\n![画面に夢中](blogs/20160820-tsukijickathon-vol-4/smile.jpg)\n\n#振る舞われた豪華なディナーたち\n\n築地ならでは、産地直送のご馳走です\n\n![ピザとお寿司](blogs/20160820-tsukijickathon-vol-4/dinner.jpg)\n\nハッカソン恒例のピザも用意されております。\n\n#総括\n\n今回はハッカソンはじめてといった方や普段とは異なるジャンルで仕事をしている方が  \nＶＲに挑戦したいといって来られた方が多いようでした。\n\n築地ッカソンはみんなでわいわいガヤガヤ、プログラミングを楽しむイベントですので  \n初めての方も是非お気軽にご参加いただけると大変うれしいです。\n\n次回の築地ッカソンもお楽しみに！\n"},{"key":7,"date":"2016.07.18","slug":"phpconwest","title":"PHP Conference 関西 2016 に参加してきました","text":"\nこんにちは皆さん\nいつもはQiita で変な記事を書きなぐっている @niisan-tokyo です。\n\n先日の2016/7/16 に**PHP Conference 関西**にスピーカーとして参加してきました。\nそもそも遠方のカンファレンス参加も初めてであれば、スピーカーとしてカンファレンスで登壇するのも初めて、と個人的にインパクトの強いイベントとなりました。\n\n「おうちに帰ってブログを書くまでがカンファレンス」という実行委員長のありがたいお言葉もいただきましたので、*ヒュイーっと*レポートを上げていこうと思います。\n\n# 前夜祭\n\nスピーカーとして参加するので、スピーカーおよびスタッフとの顔合わせの意味でカンファレンスの前日に大阪で宴会を開いていただきました。\nなので、我々も前日に大阪入りしたのですが。。。\n\n## 大阪駅で迷う\n\n大阪駅周辺は迷いやすいという伝説は冗談ではなかった！\nというわけで、到着早々迷ったりしていました。\n\n![入れないと有名なヨドバシ梅田](blogs/20160718-phpconwest/yodobashi_umeda.jpg)\n\nもはや入るだけでも困難であると有名なヨドバシ梅田の入り口。。。\n迷ったせいで、前夜祭に遅刻するなどトホホな大阪入りでした。\n\n## 前夜祭\n\n前夜祭はカンファレンス会場の大阪駅を挟んで反対側にあるお店で行われました。\n\n![中崎きりがね食堂](blogs/20160718-phpconwest/kirigane.jpg)\n\n熱いプロゲーマー論が盛り上がったりしてました。\n\n# 当日\n\n当日は10:30から開始だったので、10:00ちょい過ぎに入場。\n\n![カンファレンス会場](blogs/20160718-phpconwest/kijou.jpg)\n\n自分の発表は最後のセッションなので、それまでに見たものについてはいかのとおりです。\n\n- Composerを速くするために必要だったもの\n- 全てを結ぶ力\n- PHPで学ぶコンピュータアーキテクチャ\n- ビューのソースコードコンフリクトから解放される、PHPerのための次世代Webアプリケーション開発への道。\n- PHPで稼ぐには。　伝説といわれた給与を獲得した実際の資料も解説\n\n## 発表した\n\nで、いよいよ私の発表だったのですが、結構人が入ってきてめっちゃ緊張しました。\n\n![発表の様子](blogs/20160718-phpconwest/presen.jpg)\n\n暗くてわかりにくいですが、私の発表開始時の光景を同行した @remore に撮ってもらいました。\n\n内容はPHPで非同期処理をどうやってかけばいいのかを薄く浅く説明するというものです。\n正直自画自賛できる内容ではなかったので、心臓バックバクでしたが、なんとか無事終えることができました。\n\n詳細には、こちらにあげていますので、よろしければどうぞ\nhttps://speakerdeck.com/niisantokyo/phpdezuo-rufei-tong-qi-chu-li\n\n## その他\n\n![PHP技術者認定試験の吉政さん](blogs/20160718-phpconwest/yoshimasa_san.jpg)\n\nこちら、PHP技術者認定試験の代表理事さんで、今回のスピーカーのひとり、吉政　忠志さんです。\n彼の講演は、エンジニアとしてキャリアを続けていくための指針になるようなことが多く、大変参考になりました。\n\n\n記念写真撮らせてください！って言ったら、快く撮らせてくれました。\nペチゾーのスタンプ貰うの忘れてた。。。\n\n![自分の属性](blogs/20160718-phpconwest/habatsu.jpg)\n\n自分はこんな属性持ってます！みたいなものを示すシール。\n\nなにげにphalconもあるし、闇とかレガシーとかの怪しげなものが。。。\n\nDockerもあったので、当然貼り付けましたよ！\n\n![懇親会でLT](blogs/20160718-phpconwest/konshin_lt.jpg)\n\n何故か懇親会で始まった、LT。\n知らんかったけど、そういうものなのね。\n\n会場で行われていたLTよりも遥かにカオスな内容で、楽しかったです。\n飛び入りとか延長戦とか。。。\n\n## チラシ\n\n帰りの電車に乗る間際に、入場時に渡された手提げ袋に弊社の求人チラシが入っていることを教えてもらった件。\n\n<img src=\"blogs/20160718-phpconwest/chirashi.jpg\" alt=\"チラシ\" width=\"50%\" title=\"チラシ\">\n\nめっさ緊張しててそれどころではなかったのです。。。\n\n# おわりに\n\nいや〜、カンファレンス、楽しいですね！\nみなさんも、次の蒲田でのPHP Conference、是非とも参加しましょう！\n"},{"key":6,"date":"2016.07.04","slug":"tsukijickathon-vol-3","title":"築地ッカソン vol.3 を開催しました","text":"\n6/25に、弊社にて第3回となるハッカソンイベント、[築地ッカソン vol.3](tsukiji03.peatix.com)が開催されました。\n\n今までは「『築地』をテーマにバカアプリ」「『さくら』をテーマにバカアプリ」と言うようにテーマ縛りでしたが、今回は**VR**という技術をテーマにする築地ッカソンとなりました。\n\n# 概要\n\n「VRをテーマに何かしらのアプリを作る」以外のルールが一切ないハッカソンです。\n\n\n## ざっくりスケジュールなど\n\n* 11:00 開場。来た人から開発開始\n* 18:00 成果発表、投票タイム\n\n# 成果発表\n\n築地ッカソンは開発使える時間が時間がそこまで長くないこともあり、「未完成ですが」という前置きがつく成果発表が多かったようでした。\nそれでも、一人一人のアイデアは多種多様で、\n\n* ホラーゲーム\n* 回避ゲー\n* デート体験\n* ハイジのブランコ\n* VRで道案内\n* 遠隔手術シミュレータ\n* 歌舞伎の気振り\n\nなど、遊び系だけではなく実用系なものが発表されていました。\n\n## 発表の様子など(その1)\n\n![歌舞伎の”けぶり”を目指したもの](blogs/20160704-tsukijickathon-vol-3/demo_keburi.jpg)\n\n歌舞伎の”けぶり”を目指したもの\n\n![全方位からくるオブジェクトを回避しするゲーム](blogs/20160704-tsukijickathon-vol-3/demo_dodge.jpg)\n\n全方位からくるオブジェクトを回避しするゲーム\n\n## 発表の様子など(その2)\n\nまた、今回はテーマがVRというのもあり、前での成果発表の他に、みんなで体験しながらの投票タイムが設けられました。\n\n![体験中の様子、その1](blogs/20160704-tsukijickathon-vol-3/exp_hacosco.jpg)\n\n成果をハコスコの段ボールVRで実際に体験している様子\n\n![体験中の様子、その2](blogs/20160704-tsukijickathon-vol-3/exp_oculus_dk2.jpg)\n\n中には、Oculusを持ち込んで製作していた人もいたり\n\n## 後日Twitterにて発表していた方も\n\n<blockquote class=\"twitter-tweet\" ><p lang=\"ja\" dir=\"ltr\">ここであたしの築地ッカソンの成果である遠隔手術で針と糸が持てないVRの動画を見てみましょう <a href=\"https://t.co/xgoDwriQYX\">pic.twitter.com/xgoDwriQYX</a></p>&mdash; サメジ部長@コミケ日-西c50a (@samezi) <a href=\"https://twitter.com/samezi/status/747811136444071937\">2016年6月28日</a></blockquote> \n\n<blockquote class=\"twitter-tweet\" data-lang=\"ja\"><p lang=\"ja\" dir=\"ltr\">築地ッカソンで作ったくだらないやつ。SUSHI+Visualizer=SUSHIalizer(甘エビ) <a href=\"https://t.co/NwgvhIe2po\">pic.twitter.com/NwgvhIe2po</a></p>&mdash; かみなが れお(Goン) (@334gonn) <a href=\"https://twitter.com/334gonn/status/746676905881964544\">2016年6月25日</a></blockquote>\n\n\n# 主催者側としての振り返り\n\n進行が難しく、ワイワイガヤガヤというよりもモクモクになった今回の築地ッカソンですが、やはり「チームを組んでやってみたい」などの要望もいただきました。\nアンケートとしていただいたご意見はきちんとフィードバックしていき、次回の築地ッカソンがより良くなるように努めていきたいと思います。\n\n\n# Facebookページできました\n\n今回の築地ッカソン開催と合わせて、[Facebookページ](https://www.facebook.com/tsukijickathon/)が開設されました。\n築地ッカソンの情報などは、そちらでも周知されていくので、是非フォローをお願いします。\n"},{"key":5,"date":"2016.06.27","slug":"yochiyochi-nb-2","title":"よちよち.nb 2016/06/27 レポート","text":"\nどうも開発室所属の[@mk2](https://github.com/mk2)です。\n\n6月27日開催分のよちよち.nbレポートです。\n\n![photo](blogs/20160627-yochiyochi-nb/photo.png)\n\n# やったこと\n\n- paizaの[恋するハッカソン　〜君色に染まるアイドル〜](https://paiza.jp/poh/hatsukoi)\n\nプログラミングクイズを解いて自分好みのアイドルを作っていくゲームです。プログラミングクイズを解くたびに新しい衣装をもらえるので、自分好みのルックスのアイドルを自由自在に作ることが出来ます。\n\n例えばそう、下のような！！\n\n![paiza](blogs/20160627-yochiyochi-nb/paiza.png)\n\n諸々の事情によりモザイクをかけておりますが、\n\n- 恋するハッカソンはHTMLで作られている\n\n上記１点からお察しください。\n\nというわけで、よちよち.nbは今回も平常運転でした！\n"},{"key":4,"date":"2016.06.23","slug":"did-an-offsite-hackathon","title":"開発合宿に行ってきました（2016年3月度）","text":"\n![odawara](blogs/20160623-did-an-offsite-hackathon/top.jpg)\n\n開発室室長の澤田です。少し前のことになりますが、3月下旬にNIJIBOX開発室の一部メンバーで開発合宿＠小田原に行ってきました。NIJIBOXの開発合宿はこれまで伊東の山喜旅館を利用することが多かったのですが、今回は育児の都合で日帰りするメンバーがおり、都内からアクセスが良いことを優先的に検討した結果小田原での開催となりました。\n\n小田原で開発合宿というと、簡単にググって調べてみるとどうも「おんやど恵」さんで開催されてる団体が多いようで（例えば[ノハナさんの開発品質向上合宿の例](http://alpha.mixi.co.jp/entry/2016/03/29/195513)）、我々も利用してみたかったのですが、予約のスケジュールが埋まってしまっており断念。そこで今回はヒルトン小田原リゾートさんにお世話になりました。費用もそれなりにかかりますが、都内からのアクセスがしやすく（駅に近いわけではないが、伊東よりも都内に近く、かつ箱根の山を登らなくて済む）、施設の設備も充実しており、充実した合宿となりました。\n\n合宿の旅程としては、以下の通りです。\n\n- 1日目\n  * 午前10時　小田原にて現地集合\n  * 午前13時まで作業＠小田原のコワーキングスペース旧三福\n  * 小田原駅周辺のカフェでランチ\n  * ヒルトン小田原に移動し、15時過ぎから宿泊先の和室で作業再開\n  * 夜ホテル内で食事を取りつつ、気の済むまで作業\n  * （育児の都合で帰宅するメンバーあり）\n- 2日目\n  * 午前中宿泊先でキリのよいところまで開発（レイトチェックアウト）\n  * 昼前に解散（平日開催だったためこの後東海道線で会社に出社）\n\n# 写真で振り返る実際の合宿の様子\n\n小田原駅から徒歩圏内のコワーキングスペースの旧三福さんで合宿を開始しました\n\n![93puku entrance](blogs/20160623-did-an-offsite-hackathon/93puku_entrance.jpg)\n\n午前中一部屋がほぼ貸し切り状態で集中して開発に取り組めました\n\n![93puku room](blogs/20160623-did-an-offsite-hackathon/93puku_room.jpg)\n\n施設の設備が充実している様子\n\n![hilton odawara entrance](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_entrance.jpg)\n\n宿泊先の和洋室のうち、和室部分で開発に取り組みます\n\n![hilton odawara room](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_room.jpg)\n\n部屋からの眺めが良く、お菓子が20%増しでおいしい\n\n![hilton odawara sea](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_sea.jpg)\n\n開発は夜まで続き、普段よりも密度の高いコミュニケーションや知識共有をしながら集中して開発に取り組むことができました\n\n![private hackathon at hilton odawara](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_hackathon.jpg)\n\n行くまでネットワークの回線速度が一番の懸念でしたが、無線LANの速度も速くはありませんでしたが、7名程度であれば大きな問題なく開発を進行可能なレベルでは整備されていました（帯域を食う作業をすることはお薦めできませんが）\n\n今回の合宿では日頃の業務の中で山積していた開発テーマを各個人が集中して取り組むというテーマで合宿を行いましたが、[DeployGateを使ったCI環境の改善](http://qiita.com/nb-nishizawa/items/d765e1c194cb30418d15)をしたり[社内Wikiのプロトタイプを開発してOSSとして公開したり](https://github.com/nijibox/textbox)するなど、通常の業務から離れることで生むことができた成果をいくつか出すことができました。\n\n# 開発合宿プランがない宿で小規模な開発合宿を計画する時には\n\n開発合宿の勝手が分かっている山喜旅館やおんやど恵さんのような宿泊先の場合に比べると、今回のように開発合宿プランのない宿で開発合宿を開催する場合にいくつか気をつける必要がありました。本稿のまとめとして、今回の宿選定で気をつけたポイントを箇条書きしておきたいと思います。\n\n- インターネットが利用可能である\n- 会議室が長時間安価で利用可能であるか、または宿泊先がアーリーチェックイン/レイトチェックアウト対応で無線LANが利用可能である\n- 宿泊先で会議室を確保できない場合→開発合宿を開始できるのがチェックイン時間＝午後14時前後以降になってしまうため、午前の時間を有効活用する案を考える必要もあります。（今回は小田原のコワーキングスペースをドロップイン利用することで辻褄を合わせました）\n\n他に自前で開発合宿を企画する際のノウハウなどの知見をお持ちの方がいましたら、ぜひコメント等お寄せいただけると大変うれしいです。（コメント欄については現在準備中のため、nijibox_tech あっとマーク nijibox.co.jp までご連絡ください！）\n"},{"key":3,"date":"2016.05.23","slug":"yochiyochi-nb","title":"[社内イベント] よちよち.nb 2016年5月23日分 レポート","text":"\nどうも、開発室所属の @mk2 です。\n\nニジボックス社内で毎週開催している技術イベント（懇親会？）があります。\n\nそれはなんと…\n\n**よちよち.nb**\n\nというイベントです！\n\nよちよち.rbのパクリです！！\n\nさて、よちよち.nbなのですが、下記のようなことをやっております。\n\n- 初心にかえってプログラミングを学ぶ\n    - Ruby Warrior\n    - Paiza\n    - CodingGame\n    - CodeIQ\n    - コードを書いて遊べるゲーム\n    - などをやる（お菓子を食べつつ）\n- ペアプロをやる\n    - 社内ツール開発のペアプロとか\n- 本職のプログラマ以外のひともプログラムを学ぶ\n    - ディレクターの方なども参加予定です！\n\n今回は2016年5月23日の開催の様子を写真とともにお送りします。\n\n# 開催中の様子\n合計5名のエンジニアが参加しました。お菓子は近くので買ったチョコボール（1080円/100g）をセレクトしました。ナッツ入りのチョコボールおいしー :laughing: \n\n![yochiyochi.nb](blogs/20160523-yochiyochi-nb/yochiyochi-nb.jpg)\n\n# やったこと\nCodeIQというプログラミング問題を解くウェブサービスを皆でやりました。取り組んだ問題は下記のような感じです。\n\n- [「はしれ！コード学園」   JSちゃん(JavaScript)さんからの問題](https://codeiq.jp/q/2378)\n- [言語不問：素数の数を数えてください](https://codeiq.jp/q/1621)\n- [言語不問：「7」の数を数えよう](https://codeiq.jp/q/1630)\n\nJSちゃんの問題はこんなことも知らなかったー！俺たちー！と自分で自分につっこみつつ、素数や７の問題はどうやるんだー！これー！と楽しんでコーディングしました。\n\n~~本当は書いたコードも見せたいのですが、ちょっとまだ公開できる状況が整っていないので、また次回のレポートにご期待ください！~~\nすいません、CodIQの回答コードは勝手に公開したらまずい感じでしたね。申し訳ございません。\n\n以上、よちよち.nbレポートでしたー！\n\n"},{"key":2,"date":"2016.03.26","slug":"the-second-tsukijikkathon","title":"第二回築地ッカソンを終えて得られたもの","text":"\nこんにちは皆さん\n\n本日弊社ニジボックスでハッカソンイベント「第二回築地ッカソン」を実施しました\n多くの方にご参加いただき、とても有意義な時間を過ごせたように思います\nhttp://peatix.com/event/153432\n\nそんなハッカソンで自分なりに得たものについてこの場を借りて書いてみようかなと思います\n\n# イベントの概要\n\n## 内容\n\n馬鹿なアプリを作ろうという趣旨の非常にカジュアルなハッカソンです。\nアイデアしか出ていなくて、完成品ができていなくても問題なし！\n技術力に自身がなくても気軽に参加できるイベントとなっています\n一応、テーマを決めたほうが作りやすいと考えて、「さくら」をテーマにしました\n\n## スケジュール\n\n11:00 ~ monacaハンズオン(どうやって作ったらいいかわからない方、monacaさわってみたい方向け)\n12:00 ~ 昼食\n13:00 ~ 製作開始\n18:00 ~ 成果発表\n\n# 成果\n\n## 多種多様な成果物\n\n本会は概要にもある通り非常にカジュアルなイベントであり、しかも5時間という短い時間内で完成を目指すということや、各個人個人が制作するということからも、成果物自体は規模の小さいものとなります。\nしかし、成果の中身は本当に千差万別と言ってよく、桜の花を愛でるもの、SNS、VRを含むアニメーション、アクションゲームにパズルゲーム、UIを変更するアドオンなど、こんなにもネタやアイデアがあるのかと驚くものばかりです。\nまあ、私のように「さくら」と聞いて偽客を真っ先に思い浮かべたひねくれ者や、CCさくらへの熱い思いをダダ漏れさせた豪の者もおりましたが。。。\nSNSのようなものについては、特にアイデアが素晴らしかったのもあり、もう少し作りこみが進めば、それだけでちょっとしたジョークアプリとしてサービスイン出来ちゃうんじゃないかってくらいレベルでした。\nまた、カメラ共有を使って花見を遠隔で見ようというアプリも有りましたが、なにげに複数PC間での画面共有や中継なども実装され、普通にアプリケーションとして出しても遜色のないものも有りました。\n何がスゴイって、このようなアプリが5時間で形としてできてしまうことです。\n\n## 題材の傾向\n\nさくらをテーマにしましたが、そこからどのような題材を連想したのかをまとめてみましょう\n\n- 桜の木、花びら\n- 花見\n- 桜の花の色\n- ワシントンと桜の木\n- サクラ(おとり、偽客)\n- CCさくら\n\n花びらを題材に、ひらひら落ちるアニメーションやゲームなどが割と多めだったように思います\nついで花見も題材としては多かった印象です。花見の場所取りを題材にしたものは、なかなかとんがってるなぁと思いました\n花の色を題材に既存UIに手を加えたり、特定文字色を変えたり、絵の色調を変えたりとバリエーションに富んだアプリケーションが出てきました。\nさくらを題材にしてワシントンの逸話が出てきたのにはびっくりしました(成果はかなり難しいスロットゲームでした)\nCCさくらに関しては。。。技術力の~~無駄遣い~~素晴らしい使いみちを示したのだと確信しています！\n\n# 感想\n\n## 高品質多アプリ時代の予感\n\n再度述べますが、今回のハッカソンはカジュアルなものでしたし、時間も短いので大きな成果を期待しにくいものでした。\nにも関わらず、VRやSNSやゲームなど、様々なアプリが高いレベルで出てきました。\nこれは、参加したエンジニアのレベルの高さも有りましたが、その成果を短時間で実現するだけの環境が整っていることを示唆しているように思います。\nエンジニアとしてこのような環境の充実は歓迎すべきものでは有りますが、同時にその流れについていかなければならないとも思います。\n本日のイベントで改めてそのことを思い知らされたと思います。\n精密な設計の元、品質の高いアプリをじっくり作るのも大事ですが、今回のようにカジュアルなアプリを短時間で沢山作ることも、技術を追いかける上では必要なことかなと思いました。\n\n## エンジニアにもアイデアはある\n\nまた、これも当然といえば当然ですが、アイデアを持つのは何もプランナーやディレクターだけではないのだなと思いました。\nむしろ、エンジニアの場合、アイデアをその場で形にできるというアドバンテージを持っているように見えます。\nまた、アイデアを形にするという練習をする意味でも、今回のようなカジュアルなハッカソンイベントは一定の意味を持っていると考えています。\n\n# まとめ\n\n今回のハッカソンで得られた知見や感想を徒然に書いてみました\n全部まとめると\n\n- たくさんの成果が出たよ！\n- 高レベルの成果が多数出てきたよ！\n- たくさんアプリを作るといいね！\n\n参加した皆様、お疲れ様でした。\n運営スタッフの方々、ありがとうございます\n\n# 関連\n\n[aviファイルとかを連番の画像に書き出す](http://qiita.com/mk2/items/595e211b947f63f6eafd) - CCさくらネタ関連\n"},{"key":1,"date":"2016.02.02","slug":"running-the-first-hackathon","title":"ハッカソンを初めて主催したレポート","text":"\n先日、NIJIBOX主催で初めてハッカソンイベント「築地ッカソン」を\n開催したときのレポートです。\n\n**※第二回築地ッカソンが開催されることになりました！下記のURLから飛べますのでぜひご参加ください！**\nhttp://peatix.com/event/153432\n\n# 築地ッカソンとは？\n\n築地を眺めながら、バカなアプリを開発するハッカソンです。\n作るものはバカであればアプリでもWebでも何でもＯＫで、\nテクニカルなテーマもありません。\n1/23に行われた第一回は「築地」をテーマにおいて\nみんなで、がやがやもくもくとバカアプリを作りました！\n\n# 開発中の皆さんの様子\n\n![](blogs/20160202-running-the-first-hackathon/01.jpg)\n\n開発中は皆さん真剣。\n分からないことを相談したり、\nアイデアソン的に何を作ろうか話していたりといい雰囲気。\n自分は裏方だったのですが、次は参加者として何か作りたいです。\n\n# アプリ発表会\n\n11時～18時の開発の後(うち2時間はMonacaやCloudVisionのチュートリアル)\nそれぞれの成果物を発表しました。\n発表した皆さんの作品に\n「いいね！」と「バカだね！」を各々で好きなだけつけて評価。\n作品は、画像認証と画像合成で割とガチなアプリがあったり、\nMonacaを使ってJSでバカアプリを作っちゃったりと多種多様。\n\n![](blogs/20160202-running-the-first-hackathon/02_1.jpg)\n\n発表を見ながら、お酒とピザと寿司！\n全員が何かしらの作品を発表することができました。\nこれって結構すごいことな気がする。\n\n![](blogs/20160202-running-the-first-hackathon/02_2.jpg)\n\n寿司うめぇ。築地だかんね！\n\n![](blogs/20160202-running-the-first-hackathon/02_3.jpg)\n\n優勝はどんぶりに回転する具材を乗せて海鮮丼を作るアプリ！\nいいねポイントもバカだねポイントも高く、面白くて完成度が高かったです。\n\n![](blogs/20160202-running-the-first-hackathon/03.jpg)\n\n賞品は築地で買った乾物詰め合わせです。\n兵庫県産…？知らんがな。\n\n![](blogs/20160202-running-the-first-hackathon/04.jpg)\n\n最後はみんなで記念撮影。\nこの写真だけで凄く楽しかったことが伝わるだろうという自慢。\n\n# 反省点\n\n発表時にスマホをプロジェクタで映す手段がなかったり、\n開発中の写真をあまり撮影してなかったり、\nもうちょっと技術側のサポートが出来る人を準備するべきだったと反省。\n次回はもっとちゃんと準備しよう。\n\n# 終わりに\n\nハッカソンと言うと、\n凄い技術者がくるんだろうなぁ…とか、\nちゃんとモノヅクリが出来るか不安だなぁ…とか、\nそんな人でも気軽に参加できるハッカソン！みたいな位置づけで、\nこれからも定期的に開催していきたいなと思います。\n"}
  ],
  location: window.location.hash
};

function setState(changes){
  var component;
  Object.assign(state, changes);
  ReactDOM.render(
    React.createElement(Application, state),
    document.getElementById('react-app')
  )
}

window.addEventListener('hashchange', navigated, false);
window.addEventListener('popstate', navigated, false);

navigated()
