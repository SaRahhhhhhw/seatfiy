function Seat({ status = 'available', onClick }) {
  const className = `seat ${status === 'selected' ? 'selected' : ''} ${status === 'taken' ? 'taken' : ''}`;

  return <button className={className} onClick={status === 'taken' ? undefined : onClick} disabled={status === 'taken'} />;
}

export default Seat;
