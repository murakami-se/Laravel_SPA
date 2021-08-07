# Laravel_SPA

LaravelによるSPA開発環境構築

## versions

- PHP: 7.4.1
- Node: 12.19.0
- npm: 6.14.8

- Laravel: 8.52.0
- React: 17.0.2
- Bootstrap: 4.6.0

## branchs

- main: Laravel_SPA基本ブランチ（laravel/ui,browserSync導入、route設定）
    - react-main: React基本ブランチ
        - **react-router: ルーティングありReactブランチ　★現在**
            - react-auth: Sanctumによるログイン、ログアウト機能ありReactブランチ
                - react-auht-register: 新規ユーザー登録機能ありReactブランチ
                    - react-auth-socialite: Socialiteによるソーシャルログイン機能ありReactブランチ
    - vue-main: Vue基本ブランチ（未）

## 使用方法

1. `git clone https://github.com/murakami-se/Laravel_SPA.git` 
    or
    `git clone -b <ブランチ名> https://github.com/murakami-se/Laravel_SPA.git`

1. `composer self-update`

1. `composer install`

1. `.env.example` をコピーして `.evn` を作成

1. `.env` を環境に合わせて修正

1. `php artisan key:generate`

1. `php artisan migrate`

1. `npm install`

1. `npm run dev`

## browserSync使用方法

1. `php artisan serve` で内部サーバー起動
1. `npm run watch` でファイル監視
1. http://localhost:3000 にアクセス

## テストユーザー作成方法

1. `php artisan db:seed --class=UsersTableSeeder`

- username: test
- email: test@example
- password: password
