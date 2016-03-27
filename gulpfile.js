/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp'),
        nodemon = require('nodemon');

gulp.task('default', function () {
    // place code for your default task here
    nodemon({
        script: 'main.js',
        ext: 'js',
        env: {
            PORT: 9000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function () {
        console.log('Restarting');
    });
});
