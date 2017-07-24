# SQUARE WAR

С последним обновлением удалось покрыть все пункты.

- Добавлен новый механизм коллизий, позволяющий вращать фигуры;
- Оптимизация рендера и переход на transform;
- Добавлена новая физика;
- Подчищен проект;

- -------

- Оптимизирован просчёт траекторий и поворотов объектов;
- Оптимизирована коллизия, добавлена сущность поле, деля игровое поле на участки, мы возвращаем объекты только
с тех полей, в которых находятся вертексы(вершины) нашего полигона.

Когда кликом мыши создаём новый объект, есть проверка на доступность свободного места для него. Ежели оного нет, объект не будет создан.

Есть нюанс с генерацией объектов, объекты заполняют поле пока будет хватать места, ежели количество указано более оного места на поле, то эти объекты игнорируются.

Так как границы игрового поля задаются полигонами от которых происходит отскок, то как следствие этого, событие ресайз не будет сдвигать и изменять размер данных полигонов и как следствие клик на сцену которая изменила свой размер, всё же будет создавать новый объект. Думаю вы простите меня что я не добавил изменения размеров и положения
оных полигонов при ресайзе, надеюсь вы будете смотреть без ресайза...


## Установка

```js
    npm install
```

## Запуск

```js
    npm run start
```

## Обновление 1:
- SAT Collision
- Physics
- DOM Render Optimisation

## Последнее обновление:
- Оптимизирован просчёт траекторий и поворотов объектов;
- Оптимизирована коллизия, добавлена сущность поле, деля игровое поле на участки, мы возвращаем объекты только
с тех полей, в которых находятся вертексы(вершины) нашего полигона.

## Следующее обновления:
- Изменить систему координат.



## Скриншоты:

Меню:
![Меню](https://4.downloader.disk.yandex.ru/disk/91ecaf97f66b9c16a5a4328565ed11f600a971b3cac27bcfdd06f4cf6d21e6a5/5975b473/Lkd81OBiTzwC7owqop4HlxJ21mooxa5CseyK-7jsuf0xW18l0asFaVU7rHhHK51_3pNNtsOqQbLW1NbeU0Z3dg%3D%3D?uid=0&filename=2017-07-24_07-47-20.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&fsize=33943&hid=d247e585e5fd42b1d025ee7e40a9f134&media_type=image&tknv=v2&etag=c3be0c20f0d630b0dd1bf6cec84cdc30)

Приложение:
![Приложение](https://1.downloader.disk.yandex.ru/disk/f5377b0f84b50bac3c199ac77aa3faa54d5b5202cc821d3cf344bd95c6cb1b85/5975b5ea/Lkd81OBiTzwC7owqop4Hl2l0s2i0Veq4Q0he8WclSQmXeBNt4nmCpU13o9suQdBTKwr6H7R7hsIlYDhae6YxnQ%3D%3D?uid=0&filename=2017-07-24_07-54-15.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&fsize=41172&hid=66e833b891d57edbf86d6beda1e72050&media_type=image&tknv=v2&etag=0483deda2754b5538bf9f4e4af8bfa58)