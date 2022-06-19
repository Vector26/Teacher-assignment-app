var data = {
    subjects:[],
    exams:[],
};
  
  export const User = (state=data, action) => {
      switch(action.type){
          case "SET_SUBJECTS":
            return({...state,subjects:action.data})
          case "SET_EXAMS":
            return({...state,exams:action.data})
          default: return state;
      }
  };
  