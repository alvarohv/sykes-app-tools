import { 
    GET_GROWTH_OPPORTUNITIES,
    SET_GROWTH_OPPORTUNITY,
} from "../actions/GrowthOpportunityActions";

const INIT_STATE = {
    growth_opportunities: [],
    growth_opportunity: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROWTH_OPPORTUNITIES:
            return { ...state, growth_opportunities: action.payload };
        case SET_GROWTH_OPPORTUNITY:
            return { ...state, growth_opportunity: action.payload };
        default:
            return { ...state };
     }
};