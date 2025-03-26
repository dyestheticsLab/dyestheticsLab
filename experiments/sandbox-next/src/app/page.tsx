import { ClientComponent } from "@/components/ClientComponent";
import styles from "./page.module.css";

export default function Home() {


  return (
    <div className={styles.page}>
      <ClientComponent />
    </div>
  );
}
