import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";


export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div className="counter-card">
            <h1 className="counter-title">Counter: {count}</h1>
            <div className="counter-actions">
                <button className="counter-btn" onClick={() => dispatch(increment())}>Increment</button>
                <button className="counter-btn counter-btn-danger" onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
}

export default Counter;

