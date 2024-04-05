(() => {

  // Список клиентов в массиве
  let clientsList = [];
  let table = document.getElementById('tbody');

  // Бокс тексат ошибки для модального окна добавления клиента
  let modalAddErrorBox = document.getElementById('error-box');
  let modalChangeErrorBox = document.createElement('div');

  document.addEventListener('DOMContentLoaded', function () {
    createTableApp(document.getElementById('tbody'));
  });

  // Функция создания элементов списка
  function createTableItem(apiResponse, { onDelete }) {
    let tableElement = document.createElement('tr');
    let firstTableCell = document.createElement('td');
    let secondTableCell = document.createElement('td');
    let thirdTableCell = document.createElement('td');
    let thirdTableCellDateSpan = document.createElement('span');
    let thirdTableCellTimeSpan = document.createElement('span');
    let fourthTableCell = document.createElement('td');
    let fourthTableCellDateSpan = document.createElement('span');
    let fourthTableCellTimeSpan = document.createElement('span');
    let fifthTableCell = document.createElement('td');
    let sixthTableCell = document.createElement('td');
    let sixthTableCellBtnWrapper = document.createElement('div');
    let sixthTableCellBtnEdit = document.createElement('button');
    let sixthTableCellBtnRemove = document.createElement('button');

    // Меняю вид даты
    let created = new Date(apiResponse.createdAt);
    let updated = new Date(apiResponse.updatedAt);

    let formattedCreated = `${addZero(created.getDate())}.${addZero(created.getMonth() + 1)}.${created.getFullYear()} ${addZero(created.getHours())}:${addZero(created.getMinutes())}`;
    let formattedUpdated = `${addZero(updated.getDate())}.${addZero(updated.getMonth() + 1)}.${updated.getFullYear()} ${addZero(updated.getHours())}:${addZero(updated.getMinutes())}`;

    let createdDate = formattedCreated.split(' ')[0];
    let createdTime = formattedCreated.split(' ')[1];

    let updatedDate = formattedUpdated.split(' ')[0];
    let updatedTime = formattedUpdated.split(' ')[1];

    firstTableCell.textContent = apiResponse.id;
    secondTableCell.textContent = apiResponse.surname + ' ' + apiResponse.name + ' ' + apiResponse.lastName;
    thirdTableCellDateSpan.textContent = `${createdDate} `;
    thirdTableCellTimeSpan.textContent = createdTime;
    fourthTableCellDateSpan.textContent = `${updatedDate} `;
    fourthTableCellTimeSpan.textContent = updatedTime;
    sixthTableCellBtnEdit.textContent = 'Изменить';
    sixthTableCellBtnRemove.textContent = 'Удалить';
    apiResponse.contacts.forEach(contact => {
      if (contact.type == 'tel') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links', 'sotial-media-links_phone');
        contactLink.setAttribute('href', `tel:${contact.value}`);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        // Создаем элемент <circle>
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("opacity", "0.7");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "8");
        circle.setAttribute("fill", "#9873FF");

        // Создаем элемент <path>
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z");
        path.setAttribute("fill", "white");

        // Добавляем элементы на страницу
        svg.appendChild(circle);
        svg.appendChild(path);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }

      if (contact.type == 'second-tel') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links');
        contactLink.setAttribute('href', `tel:${contact.value}`);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("opacity", "0.7");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("clip-rule", "evenodd");
        path.setAttribute("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z");
        path.setAttribute("fill", "#9873FF");

        // Добавляем элементы на страницу
        svg.appendChild(path);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }

      if (contact.type == 'email') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links');
        contactLink.setAttribute('href', contact.value);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("opacity", "0.7");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("clip-rule", "evenodd");
        path.setAttribute("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z");
        path.setAttribute("fill", "#9873FF");

        svg.appendChild(path);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }

      if (contact.type == 'vk') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links');
        contactLink.setAttribute('href', contact.value);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("opacity", "0.7");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z");
        path.setAttribute("fill", "#9873FF");

        group.appendChild(path);
        svg.appendChild(group);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }

      if (contact.type == 'facebook') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links');
        contactLink.setAttribute('href', contact.value);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("opacity", "0.7");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z");
        path.setAttribute("fill", "#9873FF");

        group.appendChild(path);
        svg.appendChild(group);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }

      if (contact.type !== 'tel' && contact.type !== 'email' && contact.type !== 'vk' && contact.type !== 'facebook' && contact.type !== 'second-tel') {
        let contactLink = document.createElement('a');
        contactLink.classList.add('sotial-media-links');
        contactLink.setAttribute('href', contact.value);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("opacity", "0.7");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("clip-rule", "evenodd");
        path.setAttribute("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z");
        path.setAttribute("fill", "#9873FF");

        svg.appendChild(path);
        contactLink.append(svg);
        fifthTableCell.append(contactLink);
      }
    });

    tableElement.classList.add('table-row');
    firstTableCell.classList.add('table-data', 'table-data_id', 'first-colomn');
    secondTableCell.classList.add('table-data', 'second-colomn');
    thirdTableCell.classList.add('table-data', 'third-colomn');
    thirdTableCellDateSpan.classList.add('table-data-gap');
    thirdTableCellTimeSpan.classList.add('table-data-time');
    fourthTableCell.classList.add('table-data', 'fourth-colomn');
    fourthTableCellDateSpan.classList.add('table-data-gap', 'table-data-gap-fourth-cell');
    fourthTableCellTimeSpan.classList.add('table-data-time', 'table-data-time-fourth-cell');
    fifthTableCell.classList.add('table-data', 'fifth-colomn', 'table-data-fifth-gap');
    sixthTableCell.classList.add('table-data', 'sixth-colomn');
    sixthTableCellBtnWrapper.classList.add('table__btn-wrapper');
    sixthTableCellBtnEdit.classList.add('btn-reset', 'btn-edit');
    sixthTableCellBtnRemove.classList.add('btn-reset', 'btn-remove');

    thirdTableCell.append(thirdTableCellDateSpan, thirdTableCellTimeSpan);
    fourthTableCell.append(fourthTableCellDateSpan, fourthTableCellTimeSpan);
    sixthTableCellBtnWrapper.append(sixthTableCellBtnEdit, sixthTableCellBtnRemove);
    sixthTableCell.append(sixthTableCellBtnWrapper);
    tableElement.append(firstTableCell, secondTableCell, thirdTableCell, fourthTableCell, fifthTableCell, sixthTableCell);


    // Создаю модалку удаления элемента
    let confirmModal = createConfirmModal(apiResponse, tableElement, { onDelete });
    tableElement.append(confirmModal);

    // Открываю модалку удаления элемента
    sixthTableCellBtnRemove.addEventListener('click', function () {
      confirmModal.classList.add('open-remove');
    });

    // Создаю тут модалку (не заполненную)
    let commonModalEdit = createCommonModal(apiResponse);
    tableElement.append(commonModalEdit);

    // Открываю/заполняю модалку (для изменения клиента)
    sixthTableCellBtnEdit.addEventListener('click', function () {
      fillModal(event, commonModalEdit, tableElement);
    });

    table.append(tableElement);

    // tableElement.append(createEditModal(tableElement, apiResponse));

    // Кнопка изменить
    // sixthTableCellBtnEdit.addEventListener('click', function () {
    //   openEditModal(tableElement, apiResponse);
    // });

    // let btnAddClient = document.getElementById('btn-add-client');
    // btnAddClient.addEventListener('click', function () {
    // });

    // tooltip
    let links = document.querySelectorAll('.sotial-media-links');
    links.forEach(link => {
      link.addEventListener('mouseover', function () {
        let href = link.getAttribute('href');
        let tooltip = document.createElement('div');
        if (href.includes('tel:')) {
          href = href.replace('tel:', '');
          tooltip.style.fontWeight = '700';
          tooltip.textContent = href;
        }
        if (href.includes('vk.com')) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'VK:' + ' ';
          tooltip.append(tooltipSpan);
        }

        if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(href)) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'Mail:' + ' ';
          tooltip.append(tooltipSpan);
        }
        if (href.includes('facebook.com')) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'Facebook:' + ' ';
          tooltip.append(tooltipSpan);
        }
        if (href.includes('youtube.com')) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'YouTube:' + ' ';
          tooltip.append(tooltipSpan);
        }
        if (href.includes('rutube.ru')) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'RUTUBE:' + ' ';
          tooltip.append(tooltipSpan);
        }
        if (href.includes('instagram.com')) {
          let tooltipSpan = document.createElement('span');
          tooltipSpan.classList.add('tooltip__span');
          tooltipSpan.textContent = href;
          tooltip.textContent = 'Instagram:' + ' ';
          tooltip.append(tooltipSpan);
        }

        if (!href.includes('rutube.ru') && !href.includes('youtube.com') && !href.includes('tel:') && !href.includes('vk.com') && !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(href) && !href.includes('facebook.com') && !href.includes('instagram.com')) {
          tooltip.textContent = href;
        }
        tooltip.classList.add('tooltip');
        link.appendChild(tooltip);
      });

      link.addEventListener('mouseout', function () {
        let tooltip = document.querySelector('.tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });

    return tableElement
  }

  // Создаю модалку (общие элементы для обеих)
  function createCommonModal(apiList) {
    let modal = document.createElement('div');
    let modalInner = document.createElement('div');
    let modalBtnCloseTop = document.createElement('button');
    let modalBtnCloseLineFirst = document.createElement('span');
    let modalBtnCloseLineSecond = document.createElement('span');
    let modalHeader = document.createElement('h2');
    let modalForm = document.createElement('form');
    let modalFormInnerTop = document.createElement('div');
    let modalInputBoxLastName = document.createElement('div');
    let modalLabelLastName = document.createElement('label');
    let modalInputLastName = document.createElement('input');
    let modalInputBoxName = document.createElement('div');
    let modalLabelName = document.createElement('label');
    let modalInputName = document.createElement('input');
    let modalInputBoxMiddleName = document.createElement('div');
    let modalLabelMiddleName = document.createElement('label');
    let modalInputMiddleName = document.createElement('input');
    let modalFormInnerCenter = document.createElement('div');
    let modalContactSectionInner = document.createElement('div');
    let modalBtnAddContact = document.createElement('button');
    let modalFormInnerBottom = document.createElement('div');
    let modalBtnSave = document.createElement('button');
    let modalErorBox = document.createElement('ul');
    let modalClientId = document.createElement('span');
    let modalBtnRemove = document.createElement('button');
    let modalBtnCloseBottom = document.createElement('buttom');
    let modalLastNamePlaceholder = document.createElement('span');
    let modalNamePlaceholder = document.createElement('span');
    let modalMiddleNamePlaceholder = document.createElement('span');
    let modalLastNamePlaceholderAsterisk = document.createElement('span');
    let modalNamePlaceholderAsterisk = document.createElement('span');

    modalInputLastName.required = true;
    modalInputName.required = true;
    modalBtnRemove.type = 'button';
    modalBtnAddContact.type = 'button';

    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });

    modalBtnCloseTop.addEventListener('click', function () {
      modal.classList.remove('open');
    });

    modalBtnCloseBottom.addEventListener('click', function () {
      modal.classList.remove('open');
    });

    modal.classList.add('modal');
    modalInner.classList.add('modal__inner');
    modalBtnCloseTop.classList.add('btn-reset', 'modal__close-btn'); // сюда мб доп класс для quiry
    modalBtnCloseLineFirst.classList.add('btn-line');
    modalBtnCloseLineSecond.classList.add('btn-line');
    modalHeader.classList.add('modal__header');
    modalForm.classList.add('modal__form');
    modalFormInnerTop.classList.add('modal-inputs-wrapper');
    // инпут обертка
    modalInputBoxLastName.classList.add('modal-input-wrapper');
    modalLabelLastName.classList.add('modal__label', 'asterisk');
    modalInputLastName.classList.add('modal__input');
    // инпут обертка
    modalInputBoxName.classList.add('modal-input-wrapper');
    modalLabelName.classList.add('modal__label', 'asterisk');
    modalInputName.classList.add('modal__input');
    // инпут обертка
    modalInputBoxMiddleName.classList.add('modal-input-wrapper');
    modalLabelMiddleName.classList.add('modal__label');
    modalInputMiddleName.classList.add('modal__input');
    modalFormInnerCenter.classList.add('modal__add-contact-section');
    modalContactSectionInner.classList.add('contact-section-container');
    modalBtnAddContact.classList.add('btn-reset', 'btn-add-contact');
    modalFormInnerBottom.classList.add('modal-inputs-wrapper', 'modal-inputs-wrapper-bottom'); // сюда доп класс для quiry
    modalBtnSave.classList.add('btn-reset', 'btn-submit');
    modalErorBox.classList.add('list-reset', 'error-box');
    modalClientId.classList.add('modal__current-student');
    // только у изменить
    modalBtnRemove.classList.add('btn-reset', 'btn-second', 'btn-second-remove'); // сюда доп класс для quiry
    // только для добавить клиента
    modalBtnCloseBottom.classList.add('btn-reset', 'btn-second', 'btn-second-close'); // сюда доп класс для quiry
    modalLastNamePlaceholder.classList.add('placeholder');
    modalNamePlaceholder.classList.add('placeholder');
    modalMiddleNamePlaceholder.classList.add('placeholder');
    modalLastNamePlaceholderAsterisk.classList.add('asterisk');
    modalNamePlaceholderAsterisk.classList.add('asterisk');

    modalLabelLastName.textContent = 'Фамилия';
    modalLabelName.textContent = 'Имя';
    modalLabelMiddleName.textContent = 'Отчество';
    modalBtnAddContact.textContent = 'Добавить контакт';
    modalBtnSave.textContent = 'Сохранить';
    modalLastNamePlaceholder.textContent = 'Фамилия';
    modalNamePlaceholder.textContent = 'Имя';
    modalMiddleNamePlaceholder.textContent = 'Отчество';

    modalClientId.textContent = apiList.id;
    modalBtnRemove.textContent = 'Удалить клиента';
    modalBtnCloseBottom.textContent = 'Отмена';

    modalInputBoxLastName.append(modalLabelLastName);
    modalInputBoxLastName.append(modalInputLastName);
    modalInputBoxName.append(modalLabelName);
    modalInputBoxName.append(modalInputName);
    modalInputBoxMiddleName.append(modalLabelMiddleName);
    modalInputBoxMiddleName.append(modalInputMiddleName);
    modalLastNamePlaceholder.append(modalLastNamePlaceholderAsterisk);
    modalNamePlaceholder.append(modalNamePlaceholderAsterisk);
    modalInputBoxLastName.append(modalLastNamePlaceholder);
    modalInputBoxName.append(modalNamePlaceholder);
    modalInputBoxMiddleName.append(modalMiddleNamePlaceholder);
    modalFormInnerTop.append(modalInputBoxLastName);
    modalFormInnerTop.append(modalInputBoxName);
    modalFormInnerTop.append(modalInputBoxMiddleName);
    modalBtnCloseTop.append(modalBtnCloseLineFirst);
    modalBtnCloseTop.append(modalBtnCloseLineSecond);
    modalContactSectionInner.append(modalBtnAddContact);
    modalFormInnerCenter.append(modalContactSectionInner);
    modalFormInnerBottom.append(modalBtnSave);
    modalFormInnerBottom.append(modalBtnRemove);
    modalFormInnerBottom.append(modalBtnCloseBottom);

    modalForm.append(modalFormInnerTop);
    modalForm.append(modalFormInnerCenter);
    modalForm.append(modalErorBox);
    modalForm.append(modalFormInnerBottom);

    modalInner.append(modalHeader);
    modalInner.append(modalClientId);
    modalInner.append(modalBtnCloseTop);
    modalInner.append(modalForm);
    modal.append(modalInner);

    return modal
  }

  // Заполняю/показываю/скрываю модалкИ
  function fillModal(event, someCommonModal, tableElement) {
    let modalHeader = someCommonModal.querySelector('.modal__header');
    let modalBtnRemove = someCommonModal.querySelector('.btn-second-remove');
    let modalBtnCloseBottom = someCommonModal.querySelector('.btn-second-close');
    let modalLabels = someCommonModal.querySelectorAll('.modal__label');
    let modalInputs = someCommonModal.querySelectorAll('.modal__input');
    let modalPlaceholders = someCommonModal.querySelectorAll('.placeholder');
    let modalBtnSave = someCommonModal.querySelector('.btn-submit');

    someCommonModal.classList.add('open');

    if (event.target.classList.contains('btn-edit')) {
      modalHeader.textContent = 'Изменить данные';
      modalBtnCloseBottom.classList.add('btn-second-hide');
      modalPlaceholders.forEach(element => {
        element.classList.add('placeholder-hidden');
      });
      let modalConfirm = tableElement.querySelector('.modal-remove-client');
      modalBtnRemove.addEventListener('click', function () {
        modalConfirm.classList.add('open-remove');
      });

    } else if (event.target.classList.contains('btn-add-client')) {
      modalBtnSave.classList.add('btn-submit-for-add-client');
      modalHeader.textContent = 'Новый клиент';
      modalBtnRemove.classList.add('btn-second-hide');
      modalLabels.forEach(element => {
        element.classList.add('modal__label-visability');
      });
      modalInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
          if (input.value !== '') {
            modalPlaceholders[index].classList.add('placeholder-hidden');
          } else {
            modalPlaceholders[index].classList.remove('placeholder-hidden');
          }
        });
      });
    }
  }







  // const contactDescrInputs = document.querySelectorAll('.option-input'); // input
  // const contactTypeSelects = document.querySelectorAll('.js-choice'); // select
  // let isValid = true;

  // contactDescrInputs.forEach((input, index) => {
  //   if (contactTypeSelects[index].value === 'tel') {



  // // Функция создания модального окна изменения
  // function createEditModal(tableElement, apiResponse) {

  //   let modalChange = document.createElement('div');
  //   let modalChangeInner = document.createElement('div');
  //   let modalChangeBtnClose = document.createElement('button');
  //   let modalChangeBtnLineFirst = document.createElement('span');
  //   let modalChangeBtnLineSecond = document.createElement('span');
  //   let modalChangeHeader = document.createElement('h2');
  //   let modalChangeClientId = document.createElement('span');
  //   let modalChangeForm = document.createElement('form');
  //   let modalChangeFormInnerFirst = document.createElement('div');
  //   let modalChangeInputBoxLastName = document.createElement('div');
  //   let modalChangeLabelLastName = document.createElement('label');
  //   let modalChangeInputLastName = document.createElement('input');
  //   let modalChangeInputBoxName = document.createElement('div');
  //   let modalChangeLabelName = document.createElement('label');
  //   let modalChangeInputName = document.createElement('input');
  //   let modalChangeInputBoxMiddleName = document.createElement('div');
  //   let modalChangeLabelMiddleName = document.createElement('label');
  //   let modalChangeInputMiddleName = document.createElement('input');
  //   let modalChangeContactSection = document.createElement('div');
  //   let modalChangeErorBox = document.createElement('div');
  //   let modalChangeContactSectionInner = document.createElement('div');
  //   let modalChangeBtnAddContact = document.createElement('button');
  //   let modalChangeFormInnerSecond = document.createElement('div');
  //   let modalChangeBtnSave = document.createElement('button');
  //   let modalChangeBtnRemove = document.createElement('button');

  //   modalChangeHeader.textContent = 'Изменить данные';
  //   modalChangeClientId.textContent = apiResponse.id;
  //   modalChangeLabelLastName.textContent = 'Фамилия';
  //   modalChangeLabelName.textContent = 'Имя';
  //   modalChangeLabelMiddleName.textContent = 'Отчество';
  //   modalChangeBtnAddContact.textContent = 'Добавить контакт';
  //   modalChangeBtnSave.textContent = 'Сохранить';
  //   modalChangeBtnRemove.textContent = 'Удалить клиента';

  //   modalChange.classList.add('modal', 'modal-change-client');
  //   modalChangeInner.classList.add('modal__change');
  //   modalChangeBtnClose.classList.add('btn-reset', 'modal__close-btn');
  //   modalChangeBtnClose.type = 'button';
  //   modalChangeBtnLineFirst.classList.add('btn-line');
  //   modalChangeBtnLineSecond.classList.add('btn-line');
  //   modalChangeHeader.classList.add('modal__header');
  //   modalChangeClientId.classList.add('modal__current-student');
  //   modalChangeForm.classList.add('modal__form');
  //   modalChangeFormInnerFirst.classList.add('modal-inputs-wrapper');
  //   modalChangeInputBoxLastName.classList.add('modal-input-wrapper');
  //   modalChangeLabelLastName.classList.add('modal__label', 'asterisk');
  //   modalChangeInputLastName.classList.add('modal__input', 'modal__input-last-name');
  //   modalChangeInputLastName.required = true;
  //   modalChangeInputBoxName.classList.add('modal-input-wrapper');
  //   modalChangeLabelName.classList.add('modal__label', 'asterisk');
  //   modalChangeInputName.classList.add('modal__input', 'modal__input-name');
  //   modalChangeInputName.required = true;
  //   modalChangeInputBoxMiddleName.classList.add('modal-input-wrapper');
  //   modalChangeLabelMiddleName.classList.add('modal__label');
  //   modalChangeInputMiddleName.classList.add('modal__input', 'modal__input-middle-name');
  //   modalChangeContactSection.classList.add('modal__add-contact-section');
  //   modalChangeContactSectionInner.classList.add('change-contact-section-container');
  //   modalChangeBtnAddContact.classList.add('btn-reset', 'btn-add-contact');
  //   modalChangeErorBox.classList.add('error-box');
  //   modalChangeBtnAddContact.type = 'button';
  //   modalChangeFormInnerSecond.classList.add('modal-inputs-wrapper');
  //   modalChangeBtnSave.classList.add('btn-reset', 'btn-submit');
  //   modalChangeBtnRemove.classList.add('btn-reset', 'btn-second', 'btn-second-change');
  //   modalChangeBtnRemove.type = 'button';
  //   modalChangeErrorBox.classList.add('error-box');

  //   modalChangeBtnAddContact.addEventListener('click', function () {
  //     addContact(modalChangeContactSectionInner, modalChangeBtnAddContact);
  //   });

  //   // Сабмит
  //   modalChangeForm.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //   });

  //   modalChangeBtnSave.addEventListener('click', async function (e) {
  //     if (!/^[a-zA-Zа-яА-Я\s]+$/.test(modalChangeInputLastName.value)) {
  //       modalChangeErrorBox.textContent = 'Поле заполнения фамилии является обязательным для заполнения и может содержать только буквы';
  //       modalChangeInputLastName.classList.add('modal__input-error');
  //       return;
  //     } else {
  //       modalChangeInputLastName.classList.remove('modal__input-error');
  //     }

  //     if (!/^[a-zA-Zа-яА-Я\s]+$/.test(modalChangeInputName.value)) {
  //       modalChangeErrorBox.textContent = 'Поле заполнения имени является обязательным для заполнения и может содержать только буквы';
  //       modalChangeInputName.classList.add('modal__input-error');
  //       return;
  //     } else {
  //       modalChangeInputName.classList.remove('modal__input-error');
  //     }

  //     if (!/^[a-zA-Zа-яА-Я\s]*$/.test(modalChangeInputMiddleName.value)) {
  //       modalChangeErrorBox.textContent = 'Поле заполнения отчества может содержать только буквы или оставаться пустым';
  //       modalChangeInputMiddleName.classList.add('modal__input-error');
  //       return;
  //     } else {
  //       modalChangeInputMiddleName.classList.remove('modal__input-error');
  //     }

  //     modalChangeErrorBox.textContent = '';

  //     let modalChangeInputLastNameModified = modalChangeInputLastName.value.trim();
  //     let modalChangeInputNameModified = modalChangeInputName.value.trim();
  //     let modalChangeInputMiddleNameModified = modalChangeInputMiddleName.value.trim();

  //     let modalChangeInputLastNameValue = modalChangeInputLastNameModified.substring(0, 1).toUpperCase() + modalChangeInputLastNameModified.substring(1).toLowerCase();
  //     let modalChangeInputNameValue = modalChangeInputNameModified.substring(0, 1).toUpperCase() + modalChangeInputNameModified.substring(1).toLowerCase();
  //     let modalChangeInputMiddleNameValue = modalChangeInputMiddleNameModified.substring(0, 1).toUpperCase() + modalChangeInputMiddleNameModified.substring(1).toLowerCase();

  //     const contactDescrInputs = tableElement.querySelectorAll('.option-input'); // input
  //     const contactTypeSelects = tableElement.querySelectorAll('.js-choice'); // select
  //     let isValid = true;

  //     contactDescrInputs.forEach((input, index) => {
  //       if (contactTypeSelects[index].value === 'tel' || contactTypeSelects[index].value === 'second-tel') {
  //         if (input.value.length !== 18) {
  //           modalChangeErrorBox.textContent = 'Номер телефона должен содержать 11 цифр';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'email') {
  //         if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value)) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'facebook') {
  //         if (!input.value.includes('facebook.com')) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'vk') {
  //         if (!input.value.includes('vk.com')) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'instagram') {
  //         if (!input.value.includes('instagram.com')) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'rutube') {
  //         if (!input.value.includes('rutube.ru')) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }

  //       if (contactTypeSelects[index].value === 'youtube') {
  //         if (!input.value.includes('youtube.com')) {
  //           modalChangeErrorBox.textContent = 'Указан неверный адрес';
  //           isValid = false;
  //           input.classList.add('option-input-error');
  //           return;
  //         }
  //         input.classList.remove('option-input-error');
  //       }
  //     });

  //     if (!isValid) {
  //       return;
  //     }

  //     let contactsArray = [];

  //     contactDescrInputs.forEach((input, index) => {
  //       let contactType = contactTypeSelects[index].value;
  //       let contactValue = input.value;

  //       if (contactType.trim() !== '') {
  //         contactsArray.push({ type: contactType, value: contactValue });
  //       }
  //     });

  //     // Вношу изменения в studentList
  //     let updatedCreatedAt = apiResponse.createdAt;
  //     let updatedItemId = apiResponse.id;

  //     const updatedItem = {
  //       contacts: contactsArray,
  //       createdAt: updatedCreatedAt,
  //       fio: modalChangeInputLastNameValue + ' ' + modalChangeInputNameValue + ' ' + modalChangeInputMiddleNameValue,
  //       id: updatedItemId,
  //       surname: modalChangeInputLastNameValue,
  //       name: modalChangeInputNameValue,
  //       lastName: modalChangeInputMiddleNameValue,
  //       updatedAt: toIsoDate(new Date()),
  //     }

  //     clientsList = clientsList.map(item => (item.id === updatedItem.id ? updatedItem : item));

  //     // Вношу изменения в clientsList
  //     // clientsList.push({
  //     //   ...updatedItem
  //     // });

  //     await changeClient(apiResponse, updatedItem);

  //     // Рисую
  //     // let updated = new Date(updatedItem.updatedAt);
  //     // let formattedUpdated = `${addZero(updated.getDate())}.${addZero(updated.getMonth() + 1)}.${updated.getFullYear()} ${addZero(updated.getHours()) - 3}:${addZero(updated.getMinutes())}`;
  //     // let updatedDate = formattedUpdated.split(' ')[0];
  //     // let updatedTime = formattedUpdated.split(' ')[1];

  //     // let secondTableCell = tableElement.querySelector('.second-colomn');
  //     // let fourthTableCellDateSpan = tableElement.querySelector('.table-data-gap-fourth-cell');
  //     // let fourthTableCellTimeSpan = tableElement.querySelector('.table-data-time-fourth-cell');

  //     // secondTableCell.textContent = updatedItem.surname + ' ' + updatedItem.name + ' ' + updatedItem.lastName;
  //     // fourthTableCellDateSpan.textContent = `${updatedDate} `;
  //     // fourthTableCellTimeSpan.textContent = updatedTime;

  //     // let fifthTableCell = tableElement.querySelector('.fifth-colomn');
  //     // fifthTableCell.innerHTML = '';

  //     // updatedItem.contacts.forEach(contact => {
  //     //   if (contact.type == 'tel') {
  //     //     let contactLink = document.createElement('a');
  //     //     contactLink.classList.add('sotial-media-links', 'sotial-media-links_phone');
  //     //     contactLink.setAttribute('href', `tel:${contact.value}`);
  //     //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     //     svg.setAttribute("width", "16");
  //     //     svg.setAttribute("height", "16");
  //     //     svg.setAttribute("viewBox", "0 0 16 16");

  //     //     // Создаем элемент <circle>
  //     //     const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  //     //     circle.setAttribute("opacity", "0.7");
  //     //     circle.setAttribute("cx", "8");
  //     //     circle.setAttribute("cy", "8");
  //     //     circle.setAttribute("r", "8");
  //     //     circle.setAttribute("fill", "#9873FF");

  //     //     // Создаем элемент <path>
  //     //     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     //     path.setAttribute("d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z");
  //     //     path.setAttribute("fill", "white");

  //     //     // Добавляем элементы на страницу
  //     //     svg.appendChild(circle);
  //     //     svg.appendChild(path);
  //     //     contactLink.append(svg);
  //     //     fifthTableCell.append(contactLink);
  //     //   }

  //     //   if (contact.type == 'email') {
  //     //     let contactLink = document.createElement('a');
  //     //     contactLink.classList.add('sotial-media-links');
  //     //     contactLink.setAttribute('href', contact.value);
  //     //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     //     svg.setAttribute("width", "16");
  //     //     svg.setAttribute("height", "16");
  //     //     svg.setAttribute("viewBox", "0 0 16 16");

  //     //     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     //     path.setAttribute("opacity", "0.7");
  //     //     path.setAttribute("fill-rule", "evenodd");
  //     //     path.setAttribute("clip-rule", "evenodd");
  //     //     path.setAttribute("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z");
  //     //     path.setAttribute("fill", "#9873FF");

  //     //     svg.appendChild(path);
  //     //     contactLink.append(svg);
  //     //     fifthTableCell.append(contactLink);
  //     //   }

  //     //   if (contact.type == 'vk') {
  //     //     let contactLink = document.createElement('a');
  //     //     contactLink.classList.add('sotial-media-links');
  //     //     contactLink.setAttribute('href', contact.value);
  //     //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     //     svg.setAttribute("width", "16");
  //     //     svg.setAttribute("height", "16");
  //     //     svg.setAttribute("viewBox", "0 0 16 16");

  //     //     const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  //     //     group.setAttribute("opacity", "0.7");

  //     //     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     //     path.setAttribute("d", "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z");
  //     //     path.setAttribute("fill", "#9873FF");

  //     //     group.appendChild(path);
  //     //     svg.appendChild(group);
  //     //     contactLink.append(svg);
  //     //     fifthTableCell.append(contactLink);
  //     //   }

  //     //   if (contact.type == 'facebook') {
  //     //     let contactLink = document.createElement('a');
  //     //     contactLink.classList.add('sotial-media-links');
  //     //     contactLink.setAttribute('href', contact.value);
  //     //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     //     svg.setAttribute("width", "16");
  //     //     svg.setAttribute("height", "16");
  //     //     svg.setAttribute("viewBox", "0 0 16 16");

  //     //     const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  //     //     group.setAttribute("opacity", "0.7");

  //     //     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     //     path.setAttribute("d", "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z");
  //     //     path.setAttribute("fill", "#9873FF");

  //     //     group.appendChild(path);
  //     //     svg.appendChild(group);
  //     //     contactLink.append(svg);
  //     //     fifthTableCell.append(contactLink);
  //     //   }

  //     //   if (contact.type !== 'tel' && contact.type !== 'email' && contact.type !== 'vk' && contact.type !== 'facebook') {
  //     //     let contactLink = document.createElement('a');
  //     //     contactLink.classList.add('sotial-media-links');
  //     //     contactLink.setAttribute('href', contact.value);
  //     //     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     //     svg.setAttribute("width", "16");
  //     //     svg.setAttribute("height", "16");
  //     //     svg.setAttribute("viewBox", "0 0 16 16");

  //     //     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     //     path.setAttribute("opacity", "0.7");
  //     //     path.setAttribute("fill-rule", "evenodd");
  //     //     path.setAttribute("clip-rule", "evenodd");
  //     //     path.setAttribute("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z");
  //     //     path.setAttribute("fill", "#9873FF");

  //     //     svg.appendChild(path);
  //     //     contactLink.append(svg);
  //     //     fifthTableCell.append(contactLink);
  //     //   }
  //     // });

  //     render(clientsList);
  //     location.reload(true);
  //   });

  //   // Копка закрыть модальное окно
  //   modalChangeBtnClose.addEventListener('click', function () {
  //     modalChange.classList.remove('open-change');
  //     let elementsToRemove = modalChangeContactSectionInner.querySelectorAll('.modal__contact-options-wrapper');
  //     elementsToRemove.forEach(element => {
  //       element.remove();
  //     });
  //     modalChangeContactSectionInner.classList.remove('contact-section-container-plus');
  //   });

  //   modalChangeInputBoxLastName.append(modalChangeLabelLastName);
  //   modalChangeInputBoxName.append(modalChangeLabelName);
  //   modalChangeInputBoxMiddleName.append(modalChangeLabelMiddleName);
  //   modalChangeInputBoxLastName.append(modalChangeInputLastName);
  //   modalChangeInputBoxName.append(modalChangeInputName);
  //   modalChangeInputBoxMiddleName.append(modalChangeInputMiddleName);
  //   modalChangeContactSectionInner.append(modalChangeBtnAddContact);
  //   modalChangeContactSection.append(modalChangeContactSectionInner);
  //   modalChangeFormInnerSecond.append(modalChangeBtnSave);
  //   modalChangeFormInnerSecond.append(modalChangeBtnRemove);
  //   modalChangeFormInnerFirst.append(modalChangeInputBoxLastName);
  //   modalChangeFormInnerFirst.append(modalChangeInputBoxName);
  //   modalChangeFormInnerFirst.append(modalChangeInputBoxMiddleName);
  //   modalChangeForm.append(modalChangeFormInnerFirst);
  //   modalChangeForm.append(modalChangeContactSection);
  //   modalChangeForm.append(modalChangeErrorBox);
  //   modalChangeForm.append(modalChangeFormInnerSecond);
  //   modalChangeBtnClose.append(modalChangeBtnLineSecond);
  //   modalChangeBtnClose.append(modalChangeBtnLineFirst);
  //   modalChangeInner.append(modalChangeBtnClose);
  //   modalChangeInner.append(modalChangeHeader);
  //   modalChangeInner.append(modalChangeClientId);
  //   modalChangeInner.append(modalChangeForm);
  //   modalChange.append(modalChangeInner);

  //   return modalChange
  // }
  // // Добавление контактов
  // function addContact(contact, modalChangeBtnAddContact) {
  //   let selectInnerWrapper = document.createElement('div');
  //   let select = document.createElement('select');
  //   let selectInput = document.createElement('input');
  //   let selectBtnClose = document.createElement('button');
  //   let telOption = document.createElement('option');
  //   let secondTelOption = document.createElement('option');
  //   let vkOption = document.createElement('option');
  //   let youTubeOption = document.createElement('option');
  //   let ruTubeOption = document.createElement('option');
  //   let instagramOption = document.createElement('option');
  //   let otherOption = document.createElement('option');
  //   let emailOption = document.createElement('option');
  //   let facebookOption = document.createElement('option');

  //   selectInnerWrapper.classList.add('modal__contact-options-wrapper');
  //   select.classList.add('js-choice');
  //   selectInput.classList.add('option-input');
  //   selectBtnClose.classList.add('btn-reset', 'btn-select-remove');
  //   selectBtnClose.type = 'button';

  //   telOption.value = 'tel';
  //   emailOption.value = 'email';
  //   vkOption.value = 'vk';
  //   facebookOption.value = 'facebook';
  //   youTubeOption.value = 'youtube';
  //   ruTubeOption.value = 'rutube';
  //   instagramOption.value = 'instagram';
  //   secondTelOption.value = 'second-tel';
  //   otherOption.value = 'other';

  //   emailOption.textContent = 'Email';
  //   telOption.textContent = 'Телефон';
  //   facebookOption.textContent = 'Facebook';
  //   secondTelOption.textContent = 'Доп.телефон';
  //   vkOption.textContent = 'Vk';
  //   youTubeOption.textContent = 'YouTube';
  //   ruTubeOption.textContent = 'RUTUBE';
  //   instagramOption.textContent = 'Instagram';
  //   otherOption.textContent = 'Другое';

  //   // Меняю формат ввода для инпута телефона/доп.телефона
  //   selectInput.addEventListener('input', function (event) {
  //     // Проверяем, что выбрана опция "Телефон"
  //     if (select.value == 'tel' || select.value == 'second-tel') {
  //       // Заменяем все, кроме цифр, на пустую строку
  //       let formattedValue = event.target.value.replace(/\D/g, '');

  //       // Не печатается больше 11 символов
  //       if (formattedValue.length > 11) {
  //         formattedValue = formattedValue.slice(0, 11);
  //       }

  //       // Форматируем номер телефона
  //       if (formattedValue.length >= 1) {
  //         formattedValue = formattedValue.replace(/^(\d{1})/, '+$1');
  //       }
  //       if (formattedValue.length >= 2) {
  //         formattedValue = formattedValue.replace(/^(\+\d{1})(\d{3})/, '$1 ($2)');
  //       }
  //       if (formattedValue.length >= 5) {
  //         formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\))(\d{3})/, '$1 $2');
  //       }
  //       if (formattedValue.length >= 8) {
  //         formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3})(\d{2})/, '$1-$2');
  //       }
  //       if (formattedValue.length >= 10) {
  //         formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3}-\d{2})(\d{2})/, '$1-$2');
  //       }

  //       // Устанавливаем очищенное значение обратно в инпут
  //       event.target.value = formattedValue;
  //     }
  //   });

  //   select.append(telOption);
  //   select.append(emailOption);
  //   select.append(vkOption);
  //   select.append(facebookOption);
  //   select.append(youTubeOption);
  //   select.append(ruTubeOption);
  //   select.append(instagramOption);
  //   select.append(secondTelOption);
  //   select.append(otherOption);
  //   selectInnerWrapper.append(select);
  //   selectInnerWrapper.append(selectInput);
  //   selectInnerWrapper.append(selectBtnClose);
  //   contact.insertBefore(selectInnerWrapper, modalChangeBtnAddContact);

  //   // Очищение инпутов при смене селекта
  //   optionsInputClearOnRefresh();

  //   const choices = new Choices(select, { allowHTML: false });

  //   let elementCountAdd = contact.children.length;


  //   if (elementCountAdd > 1) {
  //     contact.classList.add('contact-section-container-plus');
  //   }

  //   if (elementCountAdd === 11) {
  //     modalChangeBtnAddContact.classList.add('btn-add-contact-disabled');
  //     modalChangeBtnAddContact.disabled = true;
  //   }

  //   selectBtnClose.addEventListener('click', function () {
  //     contact.removeChild(selectInnerWrapper);
  //     modalChangeBtnAddContact.classList.remove('btn-add-contact-disabled');
  //     modalChangeBtnAddContact.disabled = false;

  //     let elementCountRemove = contact.children.length;

  //     if (elementCountRemove === 1) {
  //       contact.classList.remove('contact-section-container-plus');
  //     }
  //   });
  // }
  // // Функция заполнения модального окна изменения (а еще тут закрыть окно, кнопка удалить)
  // function openEditModal(tableElement, apiResponse) {

  //   let modalChangeInputLastName = tableElement.querySelector('.modal__input-last-name');
  //   let modalChangeInputName = tableElement.querySelector('.modal__input-name');
  //   let modalChangeInputMiddleName = tableElement.querySelector('.modal__input-middle-name');

  //   let secondTableCell = tableElement.querySelector('.second-colomn');

  //   modalChangeInputLastName.value = secondTableCell.textContent.split(' ')[0];
  //   modalChangeInputName.value = secondTableCell.textContent.split(' ')[1].split(' ')[0];
  //   modalChangeInputMiddleName.value = secondTableCell.textContent.split(' ')[2];

  //   // Получение контактов
  //   if (apiResponse.contacts.length > 0) {
  //     apiResponse.contacts.forEach(contact => {
  //       let selectInnerWrapper = document.createElement('div');
  //       let select = document.createElement('select');
  //       let telOption = document.createElement('option');
  //       let secondTelOption = document.createElement('option');
  //       let vkOption = document.createElement('option');
  //       let youTubeOption = document.createElement('option');
  //       let ruTubeOption = document.createElement('option');
  //       let instagramOption = document.createElement('option');
  //       let otherOption = document.createElement('option');
  //       let emailOption = document.createElement('option');
  //       let facebookOption = document.createElement('option');
  //       let selectInput = document.createElement('input');
  //       let selectBtnClose = document.createElement('button');

  //       selectInnerWrapper.classList.add('modal__contact-options-wrapper');
  //       select.classList.add('js-choice');
  //       selectInput.classList.add('option-input');
  //       selectBtnClose.classList.add('btn-reset', 'btn-select-remove');
  //       selectBtnClose.type = 'button';

  //       telOption.value = 'tel';
  //       emailOption.value = 'email';
  //       vkOption.value = 'vk';
  //       facebookOption.value = 'facebook';
  //       youTubeOption.value = 'youtube';
  //       ruTubeOption.value = 'rutube';
  //       instagramOption.value = 'instagram';
  //       secondTelOption.value = 'second-tel';
  //       otherOption.value = 'other';

  //       emailOption.textContent = 'Email';
  //       telOption.textContent = 'Телефон';
  //       facebookOption.textContent = 'Facebook';
  //       secondTelOption.textContent = 'Доп. телефон';
  //       vkOption.textContent = 'Vk';
  //       youTubeOption.textContent = 'YouTube';
  //       ruTubeOption.textContent = 'RUTUBE';
  //       instagramOption.textContent = 'Instagram';
  //       otherOption.textContent = 'Другое';

  //       selectInput.value = contact.value;

  //       // Меняю формат ввода для инпута телефона/доп.телефона
  //       selectInput.addEventListener('input', function (event) {
  //         // Проверяем, что выбрана опция "Телефон"
  //         if (select.value == 'tel' || select.value == 'second-tel') {
  //           // Заменяем все, кроме цифр, на пустую строку
  //           let formattedValue = event.target.value.replace(/\D/g, '');

  //           // Не печатается больше 11 символов
  //           if (formattedValue.length > 11) {
  //             formattedValue = formattedValue.slice(0, 11);
  //           }

  //           // Форматируем номер телефона
  //           if (formattedValue.length >= 1) {
  //             formattedValue = formattedValue.replace(/^(\d{1})/, '+$1');
  //           }
  //           if (formattedValue.length >= 2) {
  //             formattedValue = formattedValue.replace(/^(\+\d{1})(\d{3})/, '$1 ($2)');
  //           }
  //           if (formattedValue.length >= 5) {
  //             formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\))(\d{3})/, '$1 $2');
  //           }
  //           if (formattedValue.length >= 8) {
  //             formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3})(\d{2})/, '$1-$2');
  //           }
  //           if (formattedValue.length >= 10) {
  //             formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3}-\d{2})(\d{2})/, '$1-$2');
  //           }

  //           // Устанавливаем очищенное значение обратно в инпут
  //           event.target.value = formattedValue;
  //         }
  //       });

  //       if (contact.type == 'tel') {
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(vkOption);
  //         select.append(facebookOption);
  //         select.append(youTubeOption);
  //         select.append(ruTubeOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'email') {
  //         select.append(emailOption);
  //         select.append(telOption);
  //         select.append(vkOption);
  //         select.append(facebookOption);
  //         select.append(youTubeOption);
  //         select.append(ruTubeOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'vk') {
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(youTubeOption);
  //         select.append(ruTubeOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'facebook') {
  //         select.append(facebookOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(youTubeOption);
  //         select.append(ruTubeOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'youtube') {
  //         select.append(youTubeOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(ruTubeOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'rutube') {
  //         select.append(ruTubeOption);
  //         select.append(youTubeOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(instagramOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'instagram') {
  //         select.append(instagramOption);
  //         select.append(ruTubeOption);
  //         select.append(youTubeOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(secondTelOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'second-tel') {
  //         select.append(secondTelOption);
  //         select.append(instagramOption);
  //         select.append(ruTubeOption);
  //         select.append(youTubeOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(otherOption);
  //       }

  //       if (contact.type == 'other') {
  //         select.append(otherOption);
  //         select.append(secondTelOption);
  //         select.append(instagramOption);
  //         select.append(ruTubeOption);
  //         select.append(youTubeOption);
  //         select.append(vkOption);
  //         select.append(telOption);
  //         select.append(emailOption);
  //         select.append(facebookOption);
  //         select.append(otherOption);
  //       }

  //       selectInnerWrapper.append(select);
  //       selectInnerWrapper.append(selectInput);
  //       selectInnerWrapper.append(selectBtnClose);

  //       let modalChangeContactSectionInner = tableElement.querySelector('.change-contact-section-container');
  //       let modalChangeBtnAddContact = tableElement.querySelector('.btn-add-contact');

  //       modalChangeContactSectionInner.append(selectInnerWrapper, modalChangeBtnAddContact);

  //       const choices = new Choices(select, { allowHTML: false });

  //       // Очищение инпутов при смене селекта
  //       optionsInputClearOnRefresh();

  //       selectBtnClose.addEventListener('click', function () {
  //         modalChangeContactSectionInner.removeChild(selectInnerWrapper);
  //         modalChangeBtnAddContact.classList.remove('btn-add-contact-disabled');
  //         modalChangeBtnAddContact.disabled = false;

  //         let elementCountRemove = modalChangeContactSectionInner.children.length;

  //         if (elementCountRemove === 1) {
  //           modalChangeContactSectionInner.classList.remove('contact-section-container-plus');
  //         }

  //       });

  //       let elementsAdd = modalChangeContactSectionInner.querySelectorAll('.modal__contact-options-wrapper');

  //       if (elementsAdd.length > 0) {
  //         modalChangeContactSectionInner.classList.add('contact-section-container-plus');
  //       }
  //     });
  //   }

  //   // Кнопка показать модальное окно подтверждения удаления
  //   let modalChangeBtnRemove = tableElement.querySelector('.btn-second-change');
  //   let modalConfirm = tableElement.querySelector('.modal-remove-client');

  //   modalChangeBtnRemove.addEventListener('click', function () {
  //     modalConfirm.classList.add('open-remove');
  //   });

  //   // Показываю модальное окно
  //   let modalChange = tableElement.querySelector('.modal-change-client');
  //   modalChange.classList.add('open-change');
  //

  // // Открытие и закрытие модального окна добавления клиента
  // function createModalAddClient() {
  //   const btnAdd = document.getElementById('btn-add-client');
  //   const popUpAdd = document.getElementById('modal-add-client');
  //   const removeAddPopUp = document.getElementById('modal-close-btn-add');
  //   const btnAddCancel = document.getElementById('modal-add-btn-cancel');

  //   btnAdd.addEventListener('click', function () {
  //     popUpAdd.classList.add('open-add');
  //   });

  //   removeAddPopUp.addEventListener('click', function () {
  //     popUpAdd.classList.remove('open-add');

  //     modalAddErrorBox.textContent = '';
  //   });

  //   btnAddCancel.addEventListener('click', function () {
  //     popUpAdd.classList.remove('open-add');

  //     modalAddErrorBox.textContent = '';
  //   });
  // }
  // createModalAddClient();

  // Подключаю choice
  const elements = document.querySelectorAll(".js-choice");

  elements.forEach((element) => {
    new Choices(element, {
      searchEnabled: false,
      itemSelectText: ''
    });
  });

  // Функция добавления нуля для отрисовки даты на сайте
  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  // функция создания модального окна подтверждения удаления
  function createConfirmModal(apiResponse, tableElement, { onDelete }) {
    let modalConfirm = document.createElement('div');
    let modalConfirmInner = document.createElement('div');
    let modalConfirmBtnClose = document.createElement('button');
    let modalConfirmBtnLineFirst = document.createElement('span');
    let modalConfirmBtnLineSecond = document.createElement('span');
    let modalConfirmHeader = document.createElement('h2');
    let modalConfirmDescr = document.createElement('p');
    let modalConfirmRemoveElement = document.createElement('button');
    let modalConfirmCancel = document.createElement('button');

    modalConfirmHeader.textContent = 'Удалить клиента';
    modalConfirmDescr.textContent = 'Вы действительно хотите удалить данного клиента?';
    modalConfirmRemoveElement.textContent = 'Удалить';
    modalConfirmCancel.textContent = 'Отменить';

    modalConfirm.classList.add('modal', 'modal-remove-client');
    modalConfirmInner.classList.add('modal__remove');
    modalConfirmBtnClose.classList.add('btn-reset', 'modal__close-btn');
    modalConfirmBtnLineFirst.classList.add('btn-line');
    modalConfirmBtnLineSecond.classList.add('btn-line');
    modalConfirmHeader.classList.add('modal__header', 'modal__remove-header');
    modalConfirmDescr.classList.add('modal__remove-descr');
    modalConfirmRemoveElement.classList.add('btn-reset', 'btn-submit', 'btn-confirm-remove');
    modalConfirmCancel.classList.add('btn-reset', 'btn-second');

    modalConfirmBtnClose.addEventListener('click', function () {
      modalConfirm.classList.remove('open-remove');
    });

    modalConfirmCancel.addEventListener('click', function () {
      modalConfirm.classList.remove('open-remove');
    });

    modalConfirmRemoveElement.addEventListener('click', function () {
      onDelete({ apiResponse, element: tableElement });
    });

    modalConfirmBtnClose.append(modalConfirmBtnLineFirst);
    modalConfirmBtnClose.append(modalConfirmBtnLineSecond);
    modalConfirmInner.append(modalConfirmBtnClose);
    modalConfirmInner.append(modalConfirmHeader);
    modalConfirmInner.append(modalConfirmDescr);
    modalConfirmInner.append(modalConfirmRemoveElement);
    modalConfirmInner.append(modalConfirmCancel);
    modalConfirm.append(modalConfirmInner);

    return modalConfirm
  }

  // Функция очищения инпутов при смене селекта
  function optionsInputClearOnRefresh() {
    const selects = document.querySelectorAll('.js-choice');
    const inputs = document.querySelectorAll('.option-input');

    selects.forEach((select, index) => {
      select.addEventListener('change', () => {
        inputs[index].value = '';
      });
    });
  }

  // Переделываю стандартный формат отображения new Date(), при создании элемента таблицы, в формат вида,
  // в котором дата оторажается в ключах объектов в массиве с сервака. Для визуального удобства.
  // При получении данных с сервака при запуске страницы даты и так выглядят одинакого (не понял почему).
  function toIsoDate(currentDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return isoDateString
  }

  // Функция сортировки
  function sortClients(arr, prop, dir = false) {
    let copy = [...arr];
    copy.sort((a, b) => {
      // by default do not change the order
      let result = 0;

      if (a[prop] < b[prop]) {
        result = -1; // a goes before b
      } else if (a[prop] > b[prop]) {
        result = 1; // b goes before a
      }

      if (dir) {
        return -result
      } else {
        return result
      }
    });

    return copy
  }

  // Кнопки сортировки
  function addSortListeners() {
    let idBtn = document.getElementById('id');
    let fullNameBtn = document.getElementById('full-name');
    let newDateBtn = document.getElementById('new-date');
    let editDateBtn = document.getElementById('edit-date');

    let idBtnSpan = document.getElementById('arrow-id');
    let fullNameBtnSpan = document.getElementById('arrow-fio');
    let newDateBtnSpan = document.getElementById('arrow-date-add');
    let editDateBtnSpan = document.getElementById('arrow-date-edit');

    let order = false;

    idBtn.addEventListener('click', function () {
      const sortedClients = sortClients(clientsList, 'id', order);
      order = !order;
      idBtnSpan.classList.toggle('up-side-down');
      render(sortedClients);
    });

    fullNameBtn.addEventListener('click', function () {
      const sortedClients = sortClients(clientsList, 'fio', order);
      order = !order;
      fullNameBtnSpan.classList.toggle('up-side-down');
      render(sortedClients);
    });

    newDateBtn.addEventListener('click', function () {
      const sortedClients = sortClients(clientsList, 'createdAt', order);
      order = !order;
      newDateBtnSpan.classList.toggle('up-side-down');
      render(sortedClients);
    });

    editDateBtn.addEventListener('click', function () {
      const sortedClients = sortClients(clientsList, 'updatedAt', order);
      order = !order;
      editDateBtnSpan.classList.toggle('up-side-down');
      render(sortedClients);
    });
  }
  addSortListeners();

  // Функция фильтрации
  function filterItemsByFio(arr) {
    let filterFio = document.getElementById('form-filter__input');
    let filterFioValue = filterFio.value;

    if (filterFioValue.trim() !== '') {
      arr = arr.filter(function (oneClient) {
        return oneClient.fio.toLowerCase().includes(filterFioValue.trim().toLowerCase());
      })
    }
    return arr
  }

  // Кнопка фильтрации
  const filterForm = document.getElementById('form-filter');
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
  });

  let timeoutId;
  const filterInput = document.getElementById('form-filter__input');
  filterInput.addEventListener('input', function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      const filteredArr = filterItemsByFio(clientsList);
      render(filteredArr);
    }, 300);
  });

  // В createTableApp происходит управление моделью. Создаю функции, которые передам в качестве параметра внутрь функции createAppItem
  const handlers = {
    async onDelete({ apiResponse, element }) {

      element.remove();

      for (let i = 0; i < clientsList.length; i++) {
        if (clientsList[i].id == apiResponse.id) {
          clientsList.splice(i, 1);
        }
      }

      await removeClient(apiResponse);
    }
  }

  // Рендер фильтрации/сортировки
  function render(arr) {
    table.innerHTML = '';

    arr.forEach(item => {
      createTableItem(item, handlers);
    });
  }






  // Функция создания приложения
  async function createTableApp(container) {
    // modalAddBtnSubmit = document.getElementById('btn-submit');

    let apiGet = await getClient();

    render(apiGet);

    // Создаю модалку в документе (не заполненную)
    let commonModalNewClient = createCommonModal(apiGet);
    let documentContainer = document.getElementById('main-container');
    documentContainer.append(commonModalNewClient);

    // Открываю/заполняю модалку (для создания клиента)
    let btnOpenModalNewClient = document.getElementById('btn-add-client');
    btnOpenModalNewClient.addEventListener('click', function () {
      fillModal(event, commonModalNewClient);
    });

    // modalAddBtnSubmit = document.getElementById('btn-submit');
    modalAddBtnSubmit = document.querySelector('.btn-submit-for-add-client');

    // Кнопка создания контактов
    let selectWrapper = document.getElementById('add-client-select-wrapper');
    const addContactBtn = document.getElementById('btn-add-contact-add-client');
    let selectCountAdd = 0;
    function addContactAddModal() {
      let selectInnerWrapper = document.createElement('div');
      let select = document.createElement('select');
      let telOption = document.createElement('option');
      let secondTelOption = document.createElement('option');
      let emailOption = document.createElement('option');
      let vkOption = document.createElement('option');
      let facebookOption = document.createElement('option');
      let youTubeOption = document.createElement('option');
      let ruTubeOption = document.createElement('option');
      let instagramOption = document.createElement('option');
      let otherOption = document.createElement('option');
      let selectInput = document.createElement('input');
      let selectBtnClose = document.createElement('button');

      telOption.value = 'tel';
      secondTelOption.value = 'second-tel';
      emailOption.value = 'email';
      vkOption.value = 'vk';
      facebookOption.value = 'facebook';
      youTubeOption.value = 'youtube';
      ruTubeOption.value = 'rutube';
      instagramOption.value = 'instagram';
      otherOption.value = 'other';

      telOption.textContent = 'Телефон';
      secondTelOption.textContent = 'Доп. телефон';
      emailOption.textContent = 'Email';
      vkOption.textContent = 'VK';
      facebookOption.textContent = 'Facebook';
      youTubeOption.textContent = 'YouTube';
      ruTubeOption.textContent = 'RUTUBE';
      instagramOption.textContent = 'Instagram';
      otherOption.textContent = 'Другое';

      selectInnerWrapper.classList.add('modal__contact-options-wrapper');
      select.classList.add('js-choice');
      selectInput.classList.add('option-input');
      selectBtnClose.classList.add('btn-reset', 'btn-select-remove');
      selectBtnClose.type = 'button';

      selectBtnClose.addEventListener('click', function () {
        selectInnerWrapper.remove();
        selectCountAdd--;
        if (selectCountAdd < 10) {
          addContactBtn.disabled = false;
          addContactBtn.classList.remove('btn-add-contact-disabled');
        }

        let elementsRemove = selectWrapper.querySelectorAll('.modal__contact-options-wrapper');
        if (elementsRemove.length === 0) {
          selectWrapper.classList.remove('contact-section-container-plus');
        }
      });

      // Меняю формат ввода для инпута телефона/доп.телефона
      selectInput.addEventListener('input', function (event) {
        // Проверяем, что выбрана опция "Телефон"
        if (select.value === 'tel' || select.value === 'second-tel') {
          // Заменяем все, кроме цифр, на пустую строку
          let formattedValue = event.target.value.replace(/\D/g, '');

          // Не печатается больше 11 символов
          if (formatt
            
            edValue.length > 11) {
            formattedValue = formattedValue.slice(0, 11);
          }

          // Форматируем номер телефона
          if (formattedValue.length >= 1) {
            formattedValue = formattedValue.replace(/^(\d{1})/, '+$1');
          }
          if (formattedValue.length >= 2) {
            formattedValue = formattedValue.replace(/^(\+\d{1})(\d{3})/, '$1 ($2)');
          }
          if (formattedValue.length >= 5) {
            formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\))(\d{3})/, '$1 $2');
          }
          if (formattedValue.length >= 8) {
            formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3})(\d{2})/, '$1-$2');
          }
          if (formattedValue.length >= 10) {
            formattedValue = formattedValue.replace(/^(\+\d{1} \(\d{3}\) \d{3}-\d{2})(\d{2})/, '$1-$2');
          }

          // Устанавливаем очищенное значение обратно в инпут
          event.target.value = formattedValue;
        }
      });

      select.prepend(telOption);
      select.prepend(secondTelOption);
      select.prepend(emailOption);
      select.prepend(vkOption);
      select.prepend(instagramOption);
      select.prepend(youTubeOption);
      select.prepend(ruTubeOption);
      select.prepend(facebookOption);
      select.prepend(otherOption);
      selectInnerWrapper.append(select);
      selectInnerWrapper.append(selectInput);
      selectInnerWrapper.append(selectBtnClose);
      selectWrapper.insertBefore(selectInnerWrapper, addContactBtn);

      const choices = new Choices(select, { allowHTML: false });
    }

    addContactBtn.addEventListener('click', function () {
      addContactAddModal();

      optionsInputClearOnRefresh(); // Функция очищения инпутов при смене селекта

      selectCountAdd++;


      let elementsAdd = selectWrapper.querySelectorAll('.modal__contact-options-wrapper');

      if (elementsAdd.length > 0) {
        selectWrapper.classList.add('contact-section-container-plus');
      }

      if (selectCountAdd === 10) {
        addContactBtn.disabled = true;
        addContactBtn.classList.add('btn-add-contact-disabled');
      }
    });

    // Сабмит
    modalAddBtnSubmit.addEventListener('click', async function (e) {
      e.preventDefault(); // ?

      let inputAddLastName = document.getElementById('input-add-last-name');
      let inputAddName = document.getElementById('input-add-name');
      let inputAddMiddleName = document.getElementById('input-add-middle-name');

      // let contactsArray = [];

      // contactDescrInputs.forEach((input, index) => {
      //   let contactType = contactTypeSelects[index].value;
      //   let contactValue = input.value;

      //   if (contactType.trim() !== '') {
      //     contactsArray.push({ type: contactType, value: contactValue });
      //   }
      // });

      // modalAddErrorBox.textContent = '';

      let inputAddLastNameModified = inputAddLastName.value.trim();
      let inputAddNameModified = inputAddName.value.trim();
      let inputAddMiddleNameModified = inputAddMiddleName.value.trim();

      let inputAddLastNameValue = inputAddLastNameModified.substring(0, 1).toUpperCase() + inputAddLastNameModified.substring(1).toLowerCase();
      let inputAddNameValue = inputAddNameModified.substring(0, 1).toUpperCase() + inputAddNameModified.substring(1).toLowerCase();
      let inputAddMiddleNameValue = inputAddMiddleNameModified.substring(0, 1).toUpperCase() + inputAddMiddleNameModified.substring(1).toLowerCase();

      let apiResponse = await createNewClient(contactsArray, inputAddLastNameValue, inputAddNameValue, inputAddMiddleNameValue);
      console.log(apiResponse);

      appItem = createTableItem(apiResponse, handlers);

      container.append(appItem);

      // Очищаю модальное окно
      inputAddLastName.value = '';
      inputAddName.value = '';
      inputAddMiddleName.value = '';

      let contacts = document.querySelectorAll('.modal__contact-options-wrapper');
      contacts.forEach(contact => {
        contact.remove();
      });

      selectWrapper.classList.remove('contact-section-container-plus');
    });
  }






  // Убрал пока провереки для инпутов форрмы и инпутов контактов
  // if (!/^[a-zA-Zа-яА-Я\s\s]+$/.test(inputAddLastName.value)) {
  //   modalAddErrorBox.textContent = 'Поле заполнения фамилии является обязательным для заполнения и может содержать только буквы';
  //   inputAddLastName.classList.add('modal__input-error');
  //   return;
  // } else {
  //   modalAddErrorBox.textContent = '';
  //   inputAddLastName.classList.remove('modal__input-error');
  // }

  // if (!/^[a-zA-Zа-яА-Я\s\s]+$/.test(inputAddName.value)) {
  //   modalAddErrorBox.textContent = 'Поле заполнения имени является обязательным для заполнения и может содержать только буквы';
  //   inputAddName.classList.add('modal__input-error');
  //   return;
  // } else {
  //   inputAddName.textContent = '';
  //   inputAddName.classList.remove('modal__input-error');
  // }

  // if (!/^[a-zA-Zа-яА-Я\s\s]*$/.test(inputAddMiddleName.value)) {
  //   modalAddErrorBox.textContent = 'Поле заполнения отчества может содержать только буквы или оставаться пустым';
  //   inputAddMiddleName.classList.add('modal__input-error');
  //   return;
  // } else {
  //   inputAddMiddleName.classList.remove('modal__input-error');
  // }

  // const contactDescrInputs = document.querySelectorAll('.option-input'); // input
  // const contactTypeSelects = document.querySelectorAll('.js-choice'); // select
  // let isValid = true;

  // contactDescrInputs.forEach((input, index) => {
  //   if (contactTypeSelects[index].value === 'tel') {
  //     if (input.value.length !== 18) {
  //       modalAddErrorBox.textContent = 'Номер телефона должен содержать 11 цифр';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'second-tel') {
  //     if (input.value.length !== 18) {
  //       modalAddErrorBox.textContent = 'Номер телефона должен содержать 11 цифр';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'email') {
  //     if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value)) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'vk') {
  //     if (!input.value.includes('vk.com')) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'facebook') {
  //     if (!input.value.includes('facebook.com')) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'youtube') {
  //     if (!input.value.includes('youtube.com')) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'rutube') {
  //     if (!input.value.includes('rutube.ru')) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }

  //   if (contactTypeSelects[index].value === 'instagram') {
  //     if (!input.value.includes('instagram.com')) {
  //       modalAddErrorBox.textContent = 'Указан неверный адрес';
  //       isValid = false;
  //       input.classList.add('option-input-error');
  //       return;
  //     }
  //     input.classList.remove('option-input-error');
  //   }
  // });

  // if (!isValid) {
  //   return;
  // }

  // api Получаю нового клиента c сервера


  async function getClient() {
    // Отправляю запрос на список всех дел
    const response = await fetch(`http://localhost:3000/api/clients`);
    let serverListItem = await response.json();

    // Копирую содержимое полученного списка в
    for (let i = 0; i < serverListItem.length; i++) {
      clientsList.push({
        ...serverListItem[i], fio: serverListItem[i].surname + ' ' + serverListItem[i].name + ' ' + serverListItem[i].lastName,
      });
    }

    return serverListItem
  }

  // api Создаю нового клиента на сервере
  async function createNewClient(contactsArray, inputAddLastNameValue, inputAddNameValue, inputAddMiddleNameValue) {
    // Запрос на сервер
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        contacts: contactsArray,
        name: inputAddNameValue,
        surname: inputAddLastNameValue,
        lastName: inputAddMiddleNameValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Получаю тело ответа
    // Тут хранится информация о созданном деле, ее возвращает ответ на запрос выше
    const tableItem = await response.json();

    let serverId = tableItem.id;

    let newItem = {
      contacts: contactsArray,
      name: inputAddNameValue,
      surname: inputAddLastNameValue,
      lastName: inputAddMiddleNameValue,
      id: serverId,
      fio: inputAddLastNameValue + ' ' + inputAddNameValue + ' ' + inputAddMiddleNameValue,
      createdAt: toIsoDate(new Date()),
      updatedAt: toIsoDate(new Date())
    }

    clientsList.push(newItem);

    return tableItem
  }

  // api Удаляю клиента с сервера
  async function removeClient(apiResponse) {
    fetch(`http://localhost:3000/api/clients/${apiResponse.id}`, {
      method: 'DELETE',
    });
  }

  // api Вношу изменения в массив на серваке
  async function changeClient(apiResponse, updatedItem) {
    fetch(`http://localhost:3000/api/clients/${apiResponse.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedItem),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  window.createTableApp = createTableApp;
})();
