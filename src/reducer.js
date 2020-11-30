export const initialState = {
    callinfo: []
    
  };

  
  // Selector
//   export const getBasketTotal = (basket) => 
//     basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "call":
          return {
              ...state,
              callinfo:[...state.callinfo,action.id],
          };
    //   case 'EMPTY_BASKET':
    //     return {
    //       ...state,
    //       basket:[]
    //     }
    //   case "REMOVE_FROM_BASKET":
    //     const index=state.basket.findIndex(
    //       (basketItem)=>basketItem.id===action.id
    //       );
    //       let newBasket=[...state.basket];
    //       if (index>=0){
    //         newBasket.splice(index,1);
    //       }else{
    //         console.warn('cant remove as its not in basket')
    //       }
    //     return {
    //         ...state,
    //         basket:newBasket,
    //     };
    //   case "SET_USER":
    //     return {
    //     ...state,
    //     user: action.user
    //   }
          default:
              return state;
    }
  };
  
  export default reducer;
  //how to dispatch action to data layer
  //push item to data layer basket
  //redux/react context api create a global store
  //by dispatch action
  //redcer always keep listening to actions
