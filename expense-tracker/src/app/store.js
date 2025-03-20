import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from '../features/expensesSlice';

const store = configureStore({
    reducer: {
        expenses: expensesSlice.reducer,
    }
})

export default store;