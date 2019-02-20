let mix = require('laravel-mix');
let tailwind = require('laravel-mix-tailwind');

mix.sass('resources/sass/main.sass', 'public/css/main.css')
    .tailwind()
    .browserSync({
        files: ['./views/*.ejs','./**/*.sass', '!./public/*.js', './**/*.js'],
        proxy: 'localhost:8000'
    });