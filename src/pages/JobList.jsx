import { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setError } from "../redux/JobSlice";
import Filter from "../components/Filter";


const JobList = () => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  // verileri ekrana yazdırma

  useEffect(() => {
    axios
      .get('http://localhost:3040/jobs')
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);



  return (
    <div>
      <Filter/>
      <h3 className="job-count">
        Bulunan ({state.mainJobs.length}) arasından ({state.jobs.length}) tanesini görüntülüyorsunuz.
      </h3>

      <section className="list-section">
           {/* eğer ki apiden cevap bekleniyorsa devreye girer */}
           {!state.initialized && <p>Yükleniyor...</p>}
           {/*apiden cevap geldi veri yüklendiyse ve bir hata yoksa */}
           {state.initialized && !state.isError ? (
          <>
            {state.jobs.map((job) => (
              <Card key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>Üzgünüz Bir hata oluştu....</p>
        )}
      </section>
    </div>
  );
};

export default JobList;
