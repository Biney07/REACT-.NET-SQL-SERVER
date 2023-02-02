import { useEffect, useState } from "react";
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
        console.log(customerId);
        axios.get(`https://localhost:7226/api/Order/getbyid?customerId=${customerId}`)
            .then(response => {
                setOrders(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function handleChange(event: any) {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedCustomer(event.target.value)
        fetchOrders(event.target.value);

    }
    function DeleteOrder(orderId: number){
        axios.delete(`https://localhost:7226/api/Order/${orderId}`).then(response => {
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            console.log("success");
        })
        .catch(error => {
            console.log(error);
        });

    }



    return (<>
        <div className="bodymargin">

            <FormControl sx={{ marginBottom: 5, width: 300, alignItems: "center", display: 'flex', flexDirection: 'row' }}>
                <InputLabel id="demo-simple-select-label">Customers</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCustomer || ''}
                    label="Customers"
                    onChange={handleChange}
                    sx={{ minWidth: 200, height: 50 }}
                >
                    {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                            {customer.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" size="medium" sx={{ fontColor: 'white', marginLeft: "20px" }}><Link style={{ color: "white" }} to={"./create-order"}> CREATE</Link></Button>

            </FormControl>


            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell>Order Id</TableCell>
                            <TableCell align="right">Client ID </TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (

                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{order.customerId}</TableCell>
                                <TableCell align="right">{order.date}</TableCell>
                                <TableCell align="right">{order.amount}</TableCell>
                                <TableCell align="right"><Button onClick={() => DeleteOrder(order.id)}>Delete</Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    </>
    );
}
export default Order;

