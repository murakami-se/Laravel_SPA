const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    // .browserSync({                // 変更を監視して自動でブラウザ更新
    //     proxy: '127.0.0.1:8000', // ローカルサーバーアドレス
    //     open: false              // ブラウザを自動で開かない
    // })
    .webpackConfig({
        devServer: {
            proxy: {
                '*': 'http://localhost:8000'
            }
        }
    })
    .js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ])
    .version()
    .disableNotifications();     // ビルド時のOS通知無効
