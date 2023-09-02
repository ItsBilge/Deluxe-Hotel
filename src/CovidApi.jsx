import axios from "axios";
import React, { useEffect, useState } from "react";

function CovidApi() {
  const URL =
    "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"; //API

  //   console.log(typeof URL); //veri tipi string
  const [veriler, setveriler] = useState(""); //alınan veri
  const [tarih, setTarih] = useState(""); // veriler tarihe göre sıralanıyor

  useEffect(() => {
    axios.get(URL).then((res) => setveriler(res.data[tarih])); //axios kullanarak json formatında veri tutuldu
  }, [tarih]); //tarih değiştikçe api'ye tekrar get isteği gönderiliyor

  return (
    <div>
      <div className="container mt-5 p-5">
        <h1 className="text-center mb-3">TÜRKİYE GÜNCEL COVİD VERİLERİ</h1>
        <input
          className="input-group input-group-text mb-3 fs-4"
          type="text"
          placeholder="Bir tarih giriniz (GG/AA/YYYY)"
          onChange={(e) => setTarih(e.target.value)} // input'a yazılan tarih bilgisi setTarih fonksiyonunda tutuldu
        />
        <table className="table table-success table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">Günlük Test Sayısı</th>
              <th scope="col">Günlük Hasta Sayısı</th>
              <th scope="col">Toplam Hasta Sayısı</th>
              <th scope="col">Günlük Vefat Sayısı</th>
              <th scope="col">Toplam Vefat Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {veriler == null && veriler == undefined ? ( //eğer input'a girilen tarih yanlış ya da boş ise veri bulunamadı bilgisi yazdırıldı
              <td className="text-center" colSpan={5}>
                Veri bulunamadı
              </td>
            ) : (
              // eğer girilen tarihe ait veri varsa bilgiseri ekrana yazıldı
              <tr className="text-center">
                <td>{veriler.tests}</td>
                <td>{veriler.patients}</td>
                <td>{veriler.totalPatients}</td>
                <td>{veriler.deaths}</td>
                <td>{veriler.totalDeaths}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CovidApi;
