import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ana dizi- değiş ez
  mainJobs: [],
  // işlevler. filterlenler buraya
  jobs: [],
  // iş verileri yüklendi mi? gelmediyse false or true
  initialized: false,
  // hata oluştu mu
  isError: false,
};

const jobSlice = createSlice({
  // fonsiyonlar ve nasıl güncelleneceğine karar vermek.
  name: "jobs",
  initialState,
  reducers: {
    // store aktarma
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    setError: (state) => {
      state.initialized = true;
      state.isError = true;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    filterBySearch: (state, action) => {
      // arama terimini küçük harf yapma
      const query = action.payload.toLowerCase();

      // arama terimiyle eşleşen işleri filtreler
      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );

      // state güncelleme
      state.jobs = filter;
    },

    filterByStatus: (state, action) => {
      const filtred = state.mainJobs.filter(
        (job) => job.status === action.payload
      );

      state.jobs = filtred;
    },
    filterByType: (state, action) => {
      state.jobs = state.mainJobs.filter((job) => job.type === action.payload);
    },
    // her gelen payload değeri için sırlama yapısı kurmamız gerekiyor.
    // switch case 
    // diziyi herhangi bir stringe göre sırlama metodu : sor/localecomprare 
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
            state.jobs.sort((a,b)=> 
            // localecompare js methodu karşılaştırma metodu.
            a.company.localeCompare(b.company))
          break;
        case "z-a":
            state.jobs.sort((a,b)=> 
            // localecompare js methodu karşılaştırma metodu.
            b.company.localeCompare(a.company))
          break;
        case "En Yeni":
            state.jobs.sort(
                (a,b)=> new Date(b.date) - new Date(a.date))
          break;
        case "En Eski":
            state.jobs.sort(
                (a,b) => new Date(a.date) - new Date(b.date))
          break;
          default:
            return state;
      }
    },
    clearFilters:(state) => {
        state.jobs=state.mainJobs
    }
  },
});

export const {
  setJobs,
  setError,
  addJob,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters
} = jobSlice.actions;

// store de tanıtma reducer ve reducers aynı değil.
export default jobSlice.reducer;
