import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box } from "@mui/material";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Props { }
interface Customer {
    id: number;
    name: string;
}
interface Order {
    customerId: number;
    number: string;
    date: string;
    amount: number;
}

const CreateOrder: React.FC<Props> = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [order, setOrder] = useState<Order>({
        customerId: 0,
        number: '',
        date: '',
        amount: 0
    });
    const history = useHistory();
    useEffect(() => {
        // Make a GET request to the server to get the customers
        axios.get('https://localhost:7226/api/Customer')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleCustomerChange = (event: any) => {
        setSelectedCustomer(event.target.value);
        setOrder({ ...order, customerId: event.target.value });
    }

    const handleInputChange = (event: any) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Make a POST request to the server to create the order
        axios.post('https://localhost:7226/api/Order', order)
            .then(response => {
                console.log(response.data);
                setOrder({
                    customerId: 0,
                    number: '',
                    date: '',
                    amount: 0
                });
                setSelectedCustomer(null);
                history.push('./Order');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormControl sx={{ width: '30%', mt: '55px' }} >
                    <InputLabel id="customer-select-label">Customer</InputLabel>
                    <Select
                        labelId="customer-select-label"
                        id="customer-select"
                        value={selectedCustomer || ''}
                        onChange={handleCustomerChange}
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl >

                <TextField
                    label="Number"
                    name="number"
                    value={order.number}
                    onChange={handleInputChange}
                    sx={{ width: '30%', mt: '15px' }}

                />
                <TextField
                    label="Date"
                    name="date"
                    value={order.date}
                    onChange={handleInputChange}
                    sx={{ width: '30%', mt: '15px' }}
                />
                <TextField
                    label="Amount"
                    name="amount"
                    value={order.amount}
                    onChange={handleInputChange}
                    sx={{ width: '30%', mt: '15px' }}
                />

                <Button 
                      color="success"
                      size="large"
                      variant="contained"
                      type="submit"
                      sx={{ width: '10%', mt: '15px' }}
                    > Create
                </Button>



            </Box>
        </form>
    );
}
export default CreateOrder;