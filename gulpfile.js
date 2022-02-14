import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import{ plugins } from "./gulp/config/plugins.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
};

//импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js"; 
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprive } from "./gulp/tasks/svgSprite.js";



//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.svgicons, svgSprive);
} 


const mainTasks = gulp.parallel(copy, html, scss, js, images, fonts, svgSprive);

//построение сценариев выполнения задaч
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

//сценарий по умолчанию
gulp.task('default', dev);  

