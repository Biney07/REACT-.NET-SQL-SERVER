import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton,
    Avatar,
    Paper,
} from '@material-ui/core';


const useStyles = makeStyles((theme:any) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    formControl: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(2),
    },
}));

const ProductDetail = ({ product, brands, types, onUpdate, onDelete }) => {
    const classes = useStyles();
    const [isEditing, setIsEditing] = useState(false);
    const [productData, setProductData] = useState({
        name: product.Name,
        description: product.Description,
        price: product.Price,
        pictureUrl: product.PictureUrl,
        type: product.Type,
        brand: product.Brand,
        quantityInStock: product.QuantityInStock,
    });

    useEffect(() => {
        setProductData({
            name: product.Name,
            description: product.Description,
            price: product.Price,
            pictureUrl: product.PictureUrl,
            type: product.Type,
            brand: product.Brand,
            quantityInStock: product.QuantityInStock,
        });
    }, [product]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdate(productData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(product.Id);
    };

    const handleChange = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar
                    src={productData.pictureUrl}
                    className={classes.avatar}
                />
                <Typography component="h1" variant="h5">
                    {productData.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productData.description}
                </Typography>
                <Typography variant="h5" component="h2">
                    ${productData.price}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        type="number"
                        inputProps={{ min: "1", step: "1" }}
                        onChange={handleQuantityChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
