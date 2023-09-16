
const Card = ({ job }) => {

  // class ismi döndürme
  const getClassName= () => {
 switch (job.status) {

    case 'Devam ediyor':
      return 'pending';

    case 'Reddedildi':
      return 'rejected';

    case 'Mülakat':
      return 'interview';

      default:
        return 'default'
  }
};

  return (
    <div className='card'>
      {/* üst kısım */}
      <div className='head'>
        <div className='letter'>
          {/* şirketin ilk harifini yazmak için. */}
          <p>{job.company[0]}</p>
        </div>
        <div className='info'>
          <p>{job.position}</p>
          <p>{job.company}</p>
        </div>
      </div>

      {/* alt kısım */}
      <div className='body'>
        <div className='field'>
          <img src='/images/map.png' />
          <p>{job.location}</p>
        </div>
        <div className='field'>
          <img src='/images/bag.png' />
          <p>{job.type}</p>
        </div>
        <div className='field'>
          <img src='/images/calendar.png' />
          <p>{job.date}</p>
        </div>
        <div className='status'>
          <span className={getClassName()}>{job.status}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
