import React, { useEffect } from "react";

interface ITxUseEffectTest extends React.HTMLAttributes<HTMLElement> {
  c?: React.ReactNode | React.ReactNode[];
}

export const TxUseEffectTest = ({ c, children }: ITxUseEffectTest) => {
  useEffect(() => console.log("call use effect"), []);
  return <>{c || children}</>;
};
