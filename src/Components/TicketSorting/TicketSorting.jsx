import styles from "./TicketSorting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSort, selectSort } from "../../store/ticketSlice";

import { Radio } from "antd";

export default function TicketSorting() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const handleChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div className={`${styles.sortingBox}`}>
      <Radio.Group value={sort} onChange={handleChange}>
        <Radio.Button value="cheapest">Самый дешевый</Radio.Button>
        <Radio.Button value="fastest">Самый быстрый</Radio.Button>
        <Radio.Button value="optimal">Оптимальный</Radio.Button>
      </Radio.Group>
    </div>
  );
}
