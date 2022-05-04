const ad = document.querySelector('#ad');
const soyad = document.querySelector('#soyad');
const mail = document.querySelector('#mail');
const form = document.querySelector('#rehber');

const basarili = document.querySelector('.bilgi-basarili');
const hatali = document.querySelector('.bilgi-hata');

const tbody = document.querySelector('#body');

form.addEventListener('submit', gonder);
tbody.addEventListener('click', islemleriYap);

let guncelle = undefined;

function islemleriYap(e) {
  if (e.target.classList.contains('btn-edit')) {
    document.querySelector('.gonder').value = 'Update';
    const choosen = e.target.parentElement.parentElement;
    ad.value = choosen.cells[0].textContent;
    soyad.value = choosen.cells[1].textContent;
    mail.value = choosen.cells[2].textContent;

    guncelle = choosen;
  } else if (e.target.classList.contains('btn-trash')) {
    kisiSil(e.target.parentElement.parentElement);
  }
}

function kisiSil(satir) {
  satir.remove();
  bilgiOlustur(true, 'Contact successfully deleted!');
}
function kisiDuzelt() {}

function gonder(e) {
  e.preventDefault();

  const kisi = {
    isim: ad.value,
    soyisim: soyad.value,
    email: mail.value,
  };
  const sonuc = kontrol(kisi);

  if (sonuc.durum) {
    if (guncelle) {
      kisiGuncelle(kisi);
    } else {
      bilgiOlustur(sonuc.durum, sonuc.mesaj);
      temizle();
      kisiEkle(kisi);
    }
  } else {
    bilgiOlustur(sonuc.durum, sonuc.mesaj);
  }
}

function kisiGuncelle(kisi) {
  guncelle.cells[0].textContent = kisi.isim;
  guncelle.cells[1].textContent = kisi.soyisim;
  guncelle.cells[2].textContent = kisi.email;
  document.querySelector('.gonder').value = 'Save';
  bilgiOlustur(true, 'Information updated successfully');
  guncelle = undefined;
  temizle();
}

function kontrol(kisi) {
  for (const key in kisi) {
    if (!kisi[key]) {
      return {
        durum: false,
        mesaj: 'Please fill in all boxes!',
      };
    }
  }
  return {
    durum: true,
    mesaj: 'Contact successfully registered!',
  };
}

function bilgiOlustur(durum, mesaj) {
  const bilgi = document.createElement('div');
  bilgi.textContent = mesaj;
  bilgi.classList.add('bilgi');
  // if (!durum) {
  //   bilgi.classList.add('bilgi-hata');
  // } else {
  //   bilgi.classList.add('bilgi-basarili');
  // }
  bilgi.classList.add(durum ? 'bilgi-basarili' : 'bilgi-hata');
  document.querySelector('.container').insertBefore(bilgi, form);

  sil = document.querySelector('.bilgi');

  if (sil) {
    setTimeout(() => {
      sil.remove();
    }, 2500);
  }
}

function temizle() {
  ad.value = '';
  soyad.value = '';
  mail.value = '';
}

function kisiEkle(kisi) {
  const tr = document.createElement('tr');

  tr.innerHTML = ` 
  <td>${kisi.isim}</td>
  <td>${kisi.soyisim}</td>
  <td>${kisi.email}</td>
  <td>
    <button class="btn btn-edit">
      <i class="fa-solid fa-user-pen"></i>
    </button>
    <button class="btn btn-trash">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>`;
  tbody.appendChild(tr);
}
