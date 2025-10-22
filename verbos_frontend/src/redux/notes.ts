

// Terms - 
// Action {event/object}(It's a [event] or [event+additional info], additional info like ex.- payload, object or data)
// Store {hold states} (It contains state,the data you want to manupulate, it also contains reducers)
// Reducer {functions}(This contains the entire logic for updating or changing a data)
// Slice {features}(The logics of maintaining states for every features is in 'Slice', this contains initial state and reducer function)
// State {data}

// Whole path - 
// UI trigger -> Action dispatch -> store -> reducer -> state update in store -> UI update 
// ex- button click -> handlefunc() -> store -> increment() -> num+1 in store -> num+1 in UI

// Steps - 
// 1. create store (in 'redux' folder)
// 2. wrap the App.js with Provider
// 3. create slice (in 'features' folder)
// 4. create Reducers in slice 
// 5. register the created reducers in the store

// useSelector, dispatch