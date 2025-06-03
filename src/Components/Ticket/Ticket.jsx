import styles from "./Ticket.module.scss";

export default function Ticket({ data }) {
  const priceTicket = `${data.price.toLocaleString("ru-RU")} Р`;
  const segments = data.segments;
  const departureTime = (i) => segments[i].date.slice(11, 16);

  const arrivalTime = (i) => {
    const totalMinutes =
      Number(departureTime(i).slice(0, 2)) * 60 +
      Number(departureTime(i).slice(3, 5)) +
      segments[i].duration;
    const hour = Math.floor(totalMinutes / 60) % 24;
    const minute = totalMinutes % 60;
    const formattedHours = String(hour).padStart(2, "0");
    const formattedMinutes = String(minute).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const getDuration = (i) => {
    const hour = Math.floor(segments[i].duration / 60);
    const minute = segments[i].duration % 60;
    const formattedHours = String(hour).padStart(2, "0");
    const formattedMinutes = String(minute).padStart(2, "0");
    return `${formattedHours}ч ${formattedMinutes}м`;
  };

  const getStops = (i) => segments[i].stops.join(", ");

  const getStopsCoint = (i) => {
    if (segments[i].stops.length === 0) return "прямой рейс";
    else if (segments[i].stops.length === 1) return "1 пересадка";
    return `${segments[i].stops.length} пересадки`;
  };

  return (
    <li className={`${styles.ticket}`}>
      <div className={`${styles.priceBox}`}>
        <div className={`${styles.price}`}> {priceTicket} </div>
        <img
          src={`https://pics.avs.io/110/36/${data.carrier}.png`}
          alt="Логотип авиакомпании"
        />
      </div>
      {segments?.map((segment, index) => (
        <div key={index} className={`${styles.flight}`}>
          <div>
            <p className={`${styles.greyText}`}>
              {segment.origin}-{segment.destination}
            </p>
            <p className={`${styles.blackText}`}>
              {departureTime(index)} - {arrivalTime(index)}
            </p>
          </div>
          <div>
            <p className={`${styles.greyText}`}>в пути</p>
            <p className={`${styles.blackText}`}>{getDuration(index)}</p>
          </div>
          <div>
            <p className={`${styles.greyText}`}>{getStopsCoint(index)}</p>
            <p className={`${styles.blackText}`}>{getStops(index)}</p>
          </div>
        </div>
      ))}
    </li>
  );
}
