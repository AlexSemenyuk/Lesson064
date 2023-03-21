'use strict';
// Задание - сделать toDoList (аналог Записки или Tasks, рассчитанные на небольшое кол-во текста)
// Хотелки (мои)
// 1. Выполнение задание через ООП (класс task и класс Tasks)
// 2. Всегда оперируем (добавляем элементы (task) / изменяем / удаляем / сортируем) коллекцией класса Tasks,
//    при этом DOM - только отображение коллекции класса Tasks.
// 3. Требования к task (класс Task)
// 3.1 Каждый task должен иметь поля:
//     - text
//     - дату создания
//     - topicality (actual / archive) - для помещения в соответствующее ячейку (через radio button)
//     - priority (high / normal / low) - для сортировки (через select)
//     - id - формируется автоматически (для опознания в будущем элемента)
// 4. Требования к tasks (коллекцией класса Tasks) - он используется только 1
// 4.1 Поля:
//     - counter - для исключения повторения id
//     - arrTasks - массив task
// 4.2 Методы:
//     - addTask - добавление task коллекцию tasks
//     - sortTasks - сортировка по приоритету (больше - выше), если они равны - то по времени (позже - выше)
//     - showTasks - очистка базовых контейнеров + создание контейнера item (task) с входящими элементами (поля tasks), причем
//         - в контейнер item дополнительно вложить кнопку удалить
//         - поле topicality выполнить в виде кнопки - для возможности изменения.
// 5. Приложение должно быть выполнено aside (справа), занимать 35% ширины
// 5.1 Эффекты
//     - Приложение - колонка справа должна скрываться без надобности, приложение можно вставить в любую страницу
//     - Элементы создания task должны быть скрыты и появляться при нажатии кнопки добавить
//     - Кнопка удалить - удаление task из коллекции tasks + последующее отображение tasks
//     - Кнопка topicality - изменение свойства на противоположное + последующее отображение tasks

// Можно продолжать - но время не безгранично.

// 1. Скрывающаяся панель
const body = document.body;
const classField = document.getElementsByClassName('field');
const buttonPassive = document.getElementById('button-pas');
const idActive = document.getElementById('active');
const idPassive = document.getElementById('passive');
buttonPassive.addEventListener('click', function (){
        body.style.gridTemplateColumns = "65% 35%";
        for (const field of classField) {
                field.style.display = "block";
        }
        idActive.style.display = "block";
        idPassive.style.display = "none";
});
const buttonActive = document.getElementById('button-act');
buttonActive.addEventListener('click', function (){
        body.style.gridTemplateColumns = "99% 1%";
        for (const field of classField) {
                field.style.display = "none";
        }
        idActive.style.display = "none";
        idPassive.style.display = "block";
});

// 2. Скрытое поле ввода
const idHidden = document.getElementById('hidden');
const buttonAdd = document.getElementById('add');

buttonAdd.addEventListener('click', function (){
        idHidden.style.display = "block";
});

const buttonOK = document.getElementById('ok');
console.log(buttonOK);
let formTopic = document.getElementById('topicality');
const inputText = document.getElementById('text').value;
console.log(inputText);

buttonOK.addEventListener('click', function (){
        // Скрыть меню
        idHidden.style.display = "none";
        // 1. текст task
        const inputText = document.getElementById('text').value;
        // console.log(inputText);
        // 2. текущая дата (data)
        let today = new Date();
        let now = today.toLocaleString();
        // console.log(now);
        // 3. topicality (актуальность)
        let inputTopic;
        const topic1 = document.getElementById('topic1');
        if (topic1.checked === true){
               inputTopic = topic1.value;
        }
        const topic2 = document.getElementById('topic2');
        if (topic2.checked === true){
                inputTopic = topic2.value;
        }
        // 4. priority (приоритет)
        let inputPriority;
        const priorityAdd = document.getElementById('priority-add');
        // console.dir(priorityAdd);
        inputPriority = priorityAdd.value;
        // console.log(inputPriority);

        // 5. Создание task (надо бы сделать без промежуточного task, а все перенести в метод add)
        const tmp = new Task(inputText, now, inputTopic, inputPriority, ++tasks.counter);
        tasks.addTask(tmp);
        console.log(tasks);
        if (tasks.arrTasks.length >= 2){
                tasks.sortTasks();
        }
        // console.log(tasks);
        tasks.showTasks();
}, false);


// 2. Создаем task
const actualItem = document.getElementById('actual-item');
const archiveItem = document.getElementById('archive-item');

class Task {
        constructor (text, data, topicality, priority, count) {
                this.id = `id${count}`;
                this.text = text;
                this.data = data;
                this.topicality = topicality;
                this.priority = priority;
        }
}


class CollectionTasks {
        constructor(arrTasks) {
                this.counter = 0;
                this.arrTasks = [];
        }

        addTask = function (task) {
                // this.arrTasks[this.arrTasks.length] = task;
                this.arrTasks.push(task);
        }

        sortTasks = function () {
                console.log(this.arrTasks);
                this.arrTasks.sort(comparator);
                console.log(this.arrTasks);
        }

        showTasks = function () {
                // 1. Очистка списков
                actualItem.innerHTML = '';
                archiveItem.innerHTML = '';

                for (let i = 0; i < this.arrTasks.length; i++) {
                        // Создание всех элементов
                        const pText = document.createElement('p');
                        pText.className = 'item-text';
                        const spanData = document.createElement('span');
                        spanData.className = 'item-data';
                        const buttonTopic = document.createElement('button');
                        buttonTopic.className = 'item-topic';
                        const spanPriority = document.createElement('span');
                        spanPriority.className = 'item-priority';
                        const buttonRemove = document.createElement('button');
                        buttonRemove.className = 'remove-change';
                        const imgChange = document.createElement('img');
                        imgChange.className = 'img-change';
                        imgChange.src = "/icons/remove.png";
                        imgChange.alt = 'change';
                        imgChange.style.width = '16px';

                        // Значения элементов
                        const nodeText = document.createTextNode(this.arrTasks[i].text);
                        const nodeData = document.createTextNode(this.arrTasks[i].data);
                        const nodeTopic = document.createTextNode(this.arrTasks[i].topicality);
                        const nodePriority = document.createTextNode(this.arrTasks[i].priority);

                        // Добавление значений в элементы
                        pText.append(nodeText);
                        spanData.append(nodeData);
                        buttonTopic.append(nodeTopic);
                        spanPriority.append(nodePriority);
                        buttonRemove.append(imgChange);
                        // console.log(nodeTopic);

                        // Деление по ячейкам (актуальные или нет)
                        if (nodeTopic.nodeValue === "Actual"){
                                const liActual = document.createElement('li');
                                liActual.className = 'item';
                                liActual.setAttribute('data-id', this.arrTasks[i].id);
                                // console.log("this.arrTasks[i].id = " + this.arrTasks[i].id);
                                liActual.append(pText);
                                liActual.append(spanData);
                                liActual.append(buttonTopic);
                                liActual.append(spanPriority);
                                liActual.append(buttonRemove);
                                actualItem.append(liActual);
                        } else {
                                const liArchive = document.createElement('li');
                                liArchive.className = 'item';
                                liArchive.setAttribute('data-id', this.arrTasks[i].id);
                                liArchive.append(pText);
                                liArchive.append(spanData);
                                liArchive.append(buttonTopic);
                                liArchive.append(spanPriority);
                                liArchive.append(buttonRemove);
                                archiveItem.append(liArchive);
                        }
                }
        }
}



let tasks = new CollectionTasks();

// Удаление по кнопке
actualItem.addEventListener('click', removeItem, false);
archiveItem.addEventListener('click', removeItem, false);

function removeItem (e) {
        console.log(e.target.nodeName);
        if (e.target.nodeName === 'IMG') {
                const el = e.target.parentElement.parentElement;
                console.log(el);
                const id = el.getAttribute('data-id');
                console.log(id);
                console.log(tasks.arrTasks.length);
                for (let i = 0; i < tasks.arrTasks.length; i++) {
                        if (tasks.arrTasks[i].id === id){
                                // console.log(tasks.arrTasks.length);
                                tasks.arrTasks.splice(i, 1);
                                console.log(tasks.arrTasks);
                                tasks.showTasks();
                        }
                }
        }
}

// изменение topicality по кнопке
actualItem.addEventListener('click', changeItemTopicality, false);
archiveItem.addEventListener('click', changeItemTopicality, false);

function changeItemTopicality (e) {
        console.log(e.target.nodeName);
        if (e.target.nodeName === 'BUTTON') {
                const el = e.target.parentElement;
                // console.log(el);
                const id = el.getAttribute('data-id');
                console.log(id);
                console.log(tasks.arrTasks.length);
                for (let i = 0; i < tasks.arrTasks.length; i++) {
                        if (tasks.arrTasks[i].id === id){
                                if (tasks.arrTasks[i].topicality === 'Actual'){
                                        tasks.arrTasks[i].topicality = 'Close';
                                } else  if (tasks.arrTasks[i].topicality === 'Close'){
                                        tasks.arrTasks[i].topicality = 'Actual';
                                }
                                console.log(tasks.arrTasks);
                                tasks.showTasks();
                        }
                }
        }
}


// Перевод строки с датой 20.03.2023, 13:20:49 (d.m.y, h:min:sec)в нужный формат
// 00.00.0000 00:00:00 (месяц.дата.год часы:мин:сек)
function changeStringData (data){
        data = data + '';
        let dd = data.substring(0, 2);
        let mm = data.substring(3, 5);
        let year = data.substring(6, 10);
        let hour = data.substring(12, 14);
        let min = data.substring(15, 17);
        let sec = data.substring(18, 20);
       let line = mm + '.' + dd + '.' + year + ' ' + hour + ':' + min + ":" + sec;
        // console.log(line);
        // console.log(Date.parse(line));
    return line;
}

function comparator (a, b) {
        let aPriority = getPriority(a);
        let bPriority = getPriority(b);
        // console.log(aPriority);
        // console.log(bPriority);
        let aData = Date.parse(changeStringData(a.data))/1000;
        let bData = Date.parse(changeStringData(b.data))/1000;
        // console.log(aData);
        // console.log(bData);
        if (aPriority > bPriority) {
                return bPriority - aPriority;
        } else if (aPriority === bPriority && aData > bData){
                return bData - aData;
        } else if (aPriority < bPriority){
                return bPriority - aPriority;
        } else if (aPriority === bPriority && aData < bData){
                return bData - aData;
        } else {
                return 0;
        }
}

function getPriority (task){
        if (task.priority === 'High'){
                return 3;
        } else if (task.priority === 'Normal'){
                return 2;
        }
        return 1;
}





