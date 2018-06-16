const InitialState = ['AX', 'BX', 'CV'];
// const InitialState = {

//   // user: {
//   //     logged_in: false
//   // },
//   ['Second question title','Second question title']
  
//       // { question_title: 'First question title', another_attribute: '...' },
//       // { question_title: 'First question title','Second question title','Second question title'},
//       // {  'Second question title', '...' }
//   // ]
// }

// const InitialState = { 'Second question title','Second question title'}

export default (state = InitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
