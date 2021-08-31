さくらインターネットのPaaSの[Hacobune](https://www.sakura.ad.jp/information/announcements/2021/08/12/1968207782/)でDenoとRedisとMySQLを動かすサンプル

クリックするとカウントアップする

<img src="https://raw.githubusercontent.com/ninja03/denohaco/main/ss.jpg">

Hacobuneで動作させる方法

1. counterという名前でDB作成
2. テーブルを作成
```sql
CREATE TABLE click (
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);
```

環境変数を設定
* REDIS_HOST: Redisのアドオン名
* MYSQL_HOST: MySQLのアドオン名
* MYSQL_PASS: MySQLのパスワード
* Redisのパスワードは不要

ローカルで動かすときは環境変数を設定するか
* Redisをlocalhost:6379で起動
* MySQLをlocalhost:3306で起動、ユーザをroot、パスワードをpassにする
