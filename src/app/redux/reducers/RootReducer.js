import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import LSSReducer from "./LSSReducer";
import GrowthReducer from "./GrowthOpportunityReducer";
import MetricsReducer from "./MetricsReducer";
import ApplyReducer from "./ApplyReducer";
//import ReembolsosEducativosReducer from "./ReembolsoEducativoReducer";
import RaftReducer from "./RaftReducer";
import RefoundsReducer from "./RefoundReducer";
import CommonReducer from "./CommonReducer";
import { persistStore } from 'redux-persist'
import CampaignReducer from "./CampaignReducer";
import OrderReducer from "./OrderReducer";
import LocationReducer from "./LocationReducer";

const appReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  lss: LSSReducer,
  raft: RaftReducer,
  refound: RefoundsReducer,
  common: CommonReducer,
  campaign: CampaignReducer,
  order: OrderReducer,
  locations: LocationReducer,
  growth: GrowthReducer,
  metrics: MetricsReducer,
  apply: ApplyReducer,
});

const RootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    // for all keys defined in your persistConfig(s)
    // persistStore.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')
    // state = undefined;
  }
  return appReducer(state, action)
}

export default RootReducer;
