import styles from "./TicketList.module.scss";
import Ticket from "../Ticket/Ticket";

import { useEffect, useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchId,
  fetchTickets,
  selectSearchId,
  selectLoading,
  selectTickets,
  selectError,
  selectStop,
  selectSearchIdLoaded,
  selectCheckedList,
  selectSort,
  selectTicketsCount,
  setTicketsCount,
} from "../../store/ticketSlice";

export default function TicketList() {
  const dispatch = useDispatch();
  const searchId = useSelector(selectSearchId);
  const loading = useSelector(selectLoading);
  const ticketsData = useSelector(selectTickets);
  const error = useSelector(selectError);
  const stop = useSelector(selectStop);
  const searchIdLoaded = useSelector(selectSearchIdLoaded);
  const checkedList = useSelector(selectCheckedList);
  const sort = useSelector(selectSort);
  const ticketsCount = useSelector(selectTicketsCount);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && searchIdLoaded && !stop) {
      dispatch(fetchTickets());
    }
  }, [dispatch, searchId, searchIdLoaded, stop, ticketsData.tickets]);

  const handleClick = () => {
    dispatch(setTicketsCount());
  };

  const transformedCheckedList = useMemo(() => {
    return checkedList.map((number) => {
      switch (number) {
        case "Без пересадок":
          return 0;
        case "1 пересадка":
          return 1;
        case "2 пересадки":
          return 2;
        case "3 пересадки":
          return 3;
      }
    });
  }, [checkedList]);

  const filteredTickets = useMemo(() => {
    return ticketsData.tickets.filter((ticket) => {
      const numberOfStops1 = ticket.segments[0].stops.length;
      const numberOfStops2 = ticket.segments[1].stops.length;
      return transformedCheckedList.includes(numberOfStops1 || numberOfStops2);
    });
  }, [ticketsData.tickets, transformedCheckedList]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      if (sort === "cheapest") {
        return a.price - b.price;
      } else if (sort === "fastest") {
        return a.segments[0].duration - b.segments[0].duration;
      } else {
        return 0;
      }
    });
  }, [filteredTickets, sort]);

  const visibleTickets = useMemo(() => {
    return sortedTickets.slice(0, ticketsCount);
  }, [sortedTickets, ticketsCount]);

  const elements = visibleTickets.map((item) => {
    return <Ticket key={nanoid()} data={item} />;
  });

  if (checkedList.length === 0) {
    return (
      <div className={`${styles.message}`}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    );
  }

  return (
    <>
      {error && <div className={`${styles.message}`}>Ошибка: {error}</div>}
      {loading === "pending" && (
        <div className={`${styles.message}`}>Загрузка...</div>
      )}
      <div className={`${styles.listBox}`}>
        <ul className={`${styles.list}`}>{elements}</ul>
        <button className={`${styles.showButton}`} onClick={handleClick}>
          Показать ещё 5 билетов
        </button>
      </div>
    </>
  );
}
