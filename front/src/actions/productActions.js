import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../constants/productConstants"

export const listProducts = () => async (dispacth) => {
    dispacth({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const{data} = await Axios.get('/api/products');
        dispacth({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispacth({type: PRODUCT_LIST_FAIL, payload: error.message});
        
    }
};