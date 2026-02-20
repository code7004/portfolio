import { TxSpinner } from "./TxSpinner";

interface ITxLoading {
  visible?: boolean;
  message?: string;
}
export const TxLoading = ({ visible = true, message }: ITxLoading) => {
  if (visible) return <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.6)", color: "black", fontSize: "14px", zIndex: 9999 }}>{message ? message : <TxSpinner />}</div>;

  return <></>;
};
