import { ClientComponent } from "@/components/ClientComponent";

import data from  "./data.tailwindConfig.json";

export default function Home() {

  const small = ":bg-red-500";
  return (
    <div className={"sm"+small}>
      <ClientComponent />
    </div>
  );
}
