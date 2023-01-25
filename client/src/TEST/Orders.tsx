import { useEffect, useState } from "react";
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;

}
interface Order {
    id: number;
    customerId: number;
    number: string;
    date: string;
    amount: number;
    customer: string;
}
interface Props { }

const Order: React.FC<Props> = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    //fetch customers data
    useEffect(() => {
        // Make a GET request to the server to get the customers
        axios.get('https://localhost:7226/api/Customer')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // Make a GET request to the server to get the orders
    }, []);
    const fetchOrders = (customerId: number) => {
        // Make a GET request to the server to get the orders for the selected customer
        axios.get(`https://localhost:7226/api/Order/${customerId}`)
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (<>
        <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Customers</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCustomer || ""}
                label="Customers"
                onChange={(e) => setSelectedCustomer(e.target.value === "" ? null : parseInt(e.target.value.toString()))}

            >
                {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <div>{orders.map((order) => (
            <div key={order.id}>
                <p>Order Number: {order.number}</p>
                <p>Order Date: {order.date}</p>
                <p>Order Amount: {order.amount}</p>
            </div>
        ))}</div>

    </>
    );
}
export default Order;

