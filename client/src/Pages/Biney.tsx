
import { decrement, increment } from './CounterSlice'
import { useAppDispatch, useAppSelector } from '../Store/hook'

export default function Biney(){

    const counter  = useAppSelector((state)=>state.counter.value)
    return(
        <>
        <h2>State ka vleren <span className="badge badge-primary">{counter}</span></h2>
        </>
    );
}