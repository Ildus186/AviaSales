import styles from "./TicketFilter.module.scss";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedList, selectCheckedList } from "../../store/ticketSlice";

const plainOptions = [
  "Без пересадок",
  "1 пересадка",
  "2 пересадки",
  "3 пересадки",
];

export default function TicketFilter() {
  const checkedList = useSelector(selectCheckedList);
  const dispatch = useDispatch();
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const handleChange = (option) => (e) => {
    if (e.target.checked) {
      dispatch(setCheckedList([...checkedList, option]));
    } else {
      dispatch(setCheckedList(checkedList.filter((item) => item !== option)));
    }
  };

  const onCheckAllChange = (e) => {
    dispatch(setCheckedList(e.target.checked ? plainOptions : []));
  };

  return (
    <aside className={`${styles.filterBox}`}>
      <h2 className={`${styles.filterTittle}`}>количество пересадок</h2>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Все
      </Checkbox>
      {plainOptions.map((option) => (
        <Checkbox
          key={option}
          value={option}
          checked={checkedList.includes(option)}
          onChange={handleChange(option)}
        >
          {option}
        </Checkbox>
      ))}
    </aside>
  );
}
