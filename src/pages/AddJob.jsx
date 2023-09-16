import React from "react";
import { statusOpt, typeOpt } from "../helpers/contants";
import { v4 } from "uuid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/JobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    // form data oluşturma
    const form = new FormData(e.target);
    // diziden obje oluşturma
    const newJob = Object.fromEntries(form.entries());

    // selectler seçildi mi diy kontrol eder.
    if (!newJob.type || !newJob.status) {
      toast.info("tüm alanları doldurun");
      return;
    }
    // objeye id ekleme
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();
    
    // veriyi apiye ekleme
    axios.post('http://localhost:3040/jobs', newJob)
    .then(()=>{
      //! 1 store günceeledik
      dispatch(addJob(newJob));

      //! 2 anasayfaya yönlendirme
        navigate('/');
        
      // bildirim verme
      toast.success("iş başarıyla eklendi.")
    })
    .catch(()=> toast.error('Beklenmedik bir hata oluştu.'));
  };

  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pozisyon</label>
          <input required type="text" name="position" />
        </div>
        <div>
          <label>Şirket</label>
          <input required type="text" name="company" />
        </div>
        <div>
          <label>Lokasyon</label>
          <input required type="text" name="location" />
        </div>

        <div>
          <label>Durum</label>
          <select name="status">
            <option selected disabled>
              Seçiniz
            </option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select name="type">
            <option selected disabled>
              Seçiniz
            </option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <button> Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
