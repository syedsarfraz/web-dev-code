const table = document.createElement('table');
const tbody = document.createElement('tbody');

{
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Name'
    const td = document.createElement('td');
    tr.append(tr, td);
    tbody.append(tr)
}

{
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Gender'
    const td = document.createElement('td');
    tr.append(tr, td);
    tbody.append(tr)
}

{
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Age'
    const td = document.createElement('td');
    tr.append(tr, td);
    tbody.append(tr)
}

{
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Address'
    const td = document.createElement('td');
    tr.append(tr, td);
    tbody.append(tr)
}

{
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Province'
    const td = document.createElement('td');
    tr.append(tr, td);
    tbody.append(tr)
}

tbody.append(table)