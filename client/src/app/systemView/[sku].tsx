"use client";

import SystemScene from "@/components/SystemScene";
import { useRouter } from "next/router";

const SystemView: React.FC = () => {
  const router = useRouter();
  const { sku } = router.query;
  return (
    <div className="w-[100%] h-[100%]">
      <h1>¡Galaxy view test!</h1>
      <SystemScene sku={sku} />
    </div>
  );
};

export default SystemView;
