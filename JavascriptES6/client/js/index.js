


var formBotaoIncluir = document.querySelector('.form');



formBotaoIncluir.addEventListener('submit', function(e){

    var campos = [
        document.querySelector("#data").value,
        document.querySelector('#quantidade').value,
        document.querySelector('#valor').value,
    ];

    e.preventDefault();   

    var tr = document.createElement('tr');

console.log(campos);

    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo;
        tr.appendChild(td);
    });

    var tdVol = document.createElement('td');

    tdVol.textContent = parseInt( campos[1]) * parseInt( campos[2]);
    tr.appendChild(tdVol);

    document.querySelector('table tbody').appendChild(tr);

    document.querySelector("#data").value = "";
    document.querySelector("#quantidade").value = "1";
    document.querySelector('#valor').value = "0";
    document.querySelector("#data").focus();
});