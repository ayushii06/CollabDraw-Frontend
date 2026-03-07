import { Elements } from "../../hooks/useHistory";

export type SetHistoryState = (
  action: Elements | ((prev: Elements) => Elements),
  overwrite?: boolean,
) => void;
