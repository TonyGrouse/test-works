'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.form__input input'),
          btn = document.querySelector('.form__btn button'),
          table = document.querySelector('.table'),
          tableBody = document.querySelector('.table__body'),
          load = document.querySelector('.load');
    
    // create message of error
    const wrong = document.createElement('div');
    wrong.classList.add('wrong');

    // create new row
    function createTableRow(nameFirst, nameLast, picSmall, picBig, locState, locCity, email, phone, regDate) {
        const tableRow = document.createElement('tr');
        tableBody.append(tableRow);
        
        const cellName = document.createElement('td'),
              cellPicture = document.createElement('td'),
              cellLocation = document.createElement('td'),
              cellEmail = document.createElement('td'),
              cellPhone = document.createElement('td'),
              cellRegisteredDate  = document.createElement('td');

        // formatting registered date
        const date = regDate.replace(/^(\d{4})-(\d{2})-(\d{2})(.*)/, '$3.$2.$1');

        // append pictures
        cellPicture.classList.add('table__img');
        cellPicture.innerHTML = `
            <img class='img-s' src='${picSmall}' alt='Photo of ${nameFirst}'>
            <img class='img-b' src='${picBig}' alt='Photo of ${nameFirst}'>
        `;

        cellName.textContent = `${nameFirst} ${nameLast}`;
        cellLocation.textContent = `${locState} ${locCity}`;
        cellEmail.textContent = email;
        cellPhone.textContent = phone;
        cellRegisteredDate.textContent = date;

        tableRow.append(cellName, cellPicture, cellLocation, cellEmail, cellPhone, cellRegisteredDate);
    }

    // cleaning table
    function removeTableRows(){
        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    // send request and return data object
    const getData = async url => {
        const result = await fetch(url);
        return result.json();
    };

    // displaying data on a page
    function addDataOnPage() {
        getData('https://randomuser.me/api/?results=15')
            .then(json => {
                wrong.classList.add('hide');
                wrong.classList.remove('show');
                json.results.forEach(item => {
                    createTableRow(item.name.first, item.name.last, item.picture.thumbnail,
                        item.picture.large, item.location.state, item.location.city,
                        item.email, item.phone, item.registered.date);
                });
            })
            .catch(() => {
                wrong.innerHTML = `
                    <h2>Something goes wrong...</h2>
                `;
                table.insertAdjacentElement("afterend", wrong);
                throw new Error('Something goes wrong...');
            })
            .finally(() => {
                load.classList.add('hide');
                load.classList.remove('show');
            });
    }
    addDataOnPage();

    // creating cells using filtering
    function filteringRows() {
        getData('https://randomuser.me/api/?results=15')
            .then(json => {
                const names = [];
                json.results.forEach(item => {
                    names.push({first: item.name.first, last: item.name.last});
                });
                removeTableRows();
                
                const value = input.value;

                // filtering by name and creating rows
                names.filter((name, i) => {
                    if (
                        name.first === value ||
                        name.last === value ||
                        `${name.first} ${name.last}` === value
                    ){
                        wrong.classList.add('hide');
                        wrong.classList.remove('show');
                        createTableRow(json.results[i].name.first, json.results[i].name.last,
                                json.results[i].picture.thumbnail, json.results[i].picture.large,
                                json.results[i].location.state, json.results[i].location.city,
                                json.results[i].email, json.results[i].phone, json.results[i].registered.date);
                    }
                });
                // if input is empty then displaying all data
                if(value === '') {
                    removeTableRows();
                    wrong.classList.add('hide');
                    wrong.classList.remove('show');
                    json.results.forEach(item => {
                        createTableRow(item.name.first, item.name.last, item.picture.thumbnail,
                            item.picture.large, item.location.state, item.location.city,
                            item.email, item.phone, item.registered.date);
                    });
                }
            })
            // if a response from the server did not come,
            // then an error is displayed
            .catch(() => {
                wrong.classList.add('show');
                wrong.classList.remove('hide');
                wrong.innerHTML = `
                    <h2>Something goes wrong...</h2>
                `;
                table.insertAdjacentElement("afterend", wrong);
                throw new Error('Something goes wrong...');
            })
            // in the end remove loading ico
            .finally(() => {
                load.classList.add('hide');
                load.classList.remove('show');
            });
        // message of error if search unresultable
    }

    // if table is empty add an error
    function emptyTable() {
        setTimeout(() => {
            if (tableBody.children.length === 0) {
                wrong.classList.add('show');
                wrong.classList.remove('hide');
                wrong.innerHTML = `
                    <h2>Nothing found:(</h2>
                `;
                table.insertAdjacentElement("afterend", wrong);
            }
        }, 500);
    }

    // delay for function execution on input
    function debounce(callback, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(callback, delay);
        }
    }

    // reset filter
    btn.addEventListener('click', () => {
        if (input.value !== '') {
            removeTableRows();
            input.value = '';
            load.classList.add('show');
            load.classList.remove('hide');
            addDataOnPage();
        }
    });

    // filtering by input
    input.addEventListener('input', () => {
        removeTableRows();
        load.classList.add('show');
        load.classList.remove('hide');
    });
    input.addEventListener('input', debounce(filteringRows, 3000));
    input.addEventListener('input', debounce(emptyTable, 3000));

//! ===================================================================================

//* Так как в данных получаемых с сервера постоянно меняются имена, то через поиск их найти не получается.
//* Для проверки на правильное выполнение я использовал json-server и файл json с данными из ссылки.
//* Чтобы проверить - надо загрузить папку с проектом, закомментировать функции addDataOnPage() и filteringRows(),
//* раскоментировать их ниже и запустить json-server.


    // displaying data on a page
    // function addDataOnPage() {
    //     getData('http://localhost:3000/results')
    //         .then(json => {
    //             wrong.classList.add('hide');
    //             wrong.classList.remove('show');
    //             json.forEach(item => {
    //                 createTableRow(item.name.first, item.name.last, item.picture.thumbnail,
    //                     item.picture.large, item.location.state, item.location.city,
    //                     item.email, item.phone, item.registered.date);
    //             });
    //         })
    //         .catch(() => {
    //             wrong.innerHTML = `
    //                 <h2>Something goes wrong...</h2>
    //             `;
    //             table.insertAdjacentElement("afterend", wrong);
    //             throw new Error('Something goes wrong...');
    //         })
    //         .finally(() => {
    //             load.classList.add('hide');
    //             load.classList.remove('show');
    //         });
    // }
    // addDataOnPage();

    // function filteringRows() {
    //     getData('http://localhost:3000/results')
    //         .then(json => {
    //             const names = [];
    //             json.forEach(item => {
    //                 names.push({first: item.name.first, last: item.name.last});
    //             });
    //             removeTableRows();
                
    //             const value = input.value;

    //             // filtering by name and creating rows
    //             names.filter((name, i) => {
    //                 if (
    //                     name.first === value ||
    //                     name.last === value ||
    //                     `${name.first} ${name.last}` === value
    //                 ){
    //                     wrong.classList.add('hide');
    //                     wrong.classList.remove('show');
    //                     createTableRow(json[i].name.first, json[i].name.last, json[i].picture.thumbnail,
    //                         json[i].picture.large, json[i].location.state, json[i].location.city,
    //                         json[i].email, json[i].phone, json[i].registered.date);
    //                 }
    //             });
    //             // if input is empty then displaying all data
    //             if(value === '') {
    //                 removeTableRows();
    //                 wrong.classList.add('hide');
    //                 wrong.classList.remove('show');
    //                 json.forEach(item => {
    //                     createTableRow(item.name.first, item.name.last, item.picture.thumbnail,
    //                         item.picture.large, item.location.state, item.location.city,
    //                         item.email, item.phone, item.registered.date);
    //                 });
    //             }
    //         })
    //         // if a response from the server did not come,
    //         // then an error is displayed
    //         .catch(() => {
    //             wrong.classList.add('show');
    //             wrong.classList.remove('hide');
    //             wrong.innerHTML = `
    //                 <h2>Something goes wrong...</h2>
    //             `;
    //             table.insertAdjacentElement("afterend", wrong);
    //             throw new Error('Something goes wrong...');
    //         })
    //         // in the end remove loading ico
    //         .finally(() => {
    //             load.classList.add('hide');
    //             load.classList.remove('show');
    //         });
    //     // message of error if search unresultable
    // }

});