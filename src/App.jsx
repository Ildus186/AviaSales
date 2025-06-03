import styles from "./App.module.scss";
import TicketFilter from "./Components/TicketFilter/TicketFilter";
import TicketSorting from "./Components/TicketSorting/TicketSorting";
import TicketList from "./Components/TicketList/TicketList";
import Logo from "./Logo.png";

export default function App() {
  return (
    <>
      <img src={Logo} className={`${styles.logo}`} />
      <TicketFilter />
      <TicketSorting />
      <TicketList />
    </>
  );
}
