let pelajar = [];
let hashids = new Hashids('Mobile CRUD', 8);

$(function () {
    loaddata();
});

function loaddata() {
    let bil = 1;

    $.getJSON('http://localhost/temp02/mobilecrud/api/senarai.php', function (result) {
        let baris = '<tr>';
        $.each(result, function (i, field) {
            let r = 0;
            pelajar[i] = [];

            $.each(field, function (j, data) {
                if (j == 'idpelajar') {
                    baris += '<td>' + (bil++) + '</td>';
                } else {
                    baris += '<td>' + data + '</td>';
                }
                pelajar[i][r] = data;
                r++;
            });
            baris += '<td><button type="button" onclick="edit(' + i + ');">Edit</button><button type="button" onclick="padam(' + i + ');">Padam</button></td></tr>';
        });
        $('tbody').append(baris);
    });
}

function edit(id) {
    $('#id').val(id);
    $('#idpelajar').val(pelajar[id][0]);
    $('#nama').val(pelajar[id][1]);
    $('#nokp').val(pelajar[id][2]);
    $('#nomatrik').val(pelajar[id][3]);
}

function simpan() {
    let idpelajar = $('#idpelajar').val();
    let nama = $('#nama').val();
    let nokp = $('#nokp').val();
    let nomatrik = $('#nomatrik').val();

    if (nama === '' || nokp === '' || nomatrik === '') {
        alert('Sila isi semua butiran hingga lengkap sebelum klik butang Simpan.');
    } else {
        $.post('http://localhost/temp02/mobilecrud/api/simpan.php', {
            idpelajar: idpelajar,
            nama: nama,
            nokp: nokp,
            nomatrik: nomatrik
        }, function (data, status) {
            if (status == 'success') {
                if (data == 'ok') {
                    batal();
                    location.reload();
                }
            }
        });
    }
}

function batal() {
    $('#idpelajar').val(0);
    $('#nama').val('');
    $('#nokp').val('');
    $('#nomatrik').val('');
}

function padam(id) {
    let idpelajar = hashids.encode(pelajar[id][0]);

    if (confirm('Adakah anda pasti?')) {
        $.get('http://localhost/temp02/mobilecrud/api/padam.php?idpelajar=' + idpelajar, function (data, status) {
            if (status == 'success') {
                if (data == 'ok') {
                    location.reload();
                } else {
                    alert(data);
                }
            }
        });
    }
}
