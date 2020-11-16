# остановить публикацию при ошибках
set e 
# сборка проекта
npm run build
# перейдем в папку dist
cd dist
# инициализация git
git init
# добавим все файлы 
git add -A
# фиксируем изменения
git commit -m 'deploy'
#публикуем изменения на gitpages
git push -f https://github.com/brvalgm/online-store-vue.git master:gh-pages