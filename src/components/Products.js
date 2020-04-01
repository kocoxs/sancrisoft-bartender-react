import React from 'react'
import { connect } from 'react-redux'
import { getProducts, deleteProduct } from '../actions/products'
import { Link } from "react-router-dom";
import  * as SC  from './StyledComponents'

class Products extends React.Component {

    componentDidMount = () => {
        this.props.dispatch(getProducts())
    }

    removeProduct = (product) => {
        try {
            this.props.dispatch(deleteProduct(product))
        } catch (error) {
            this.props.history.push('/')
        }
    }

    render(){
        return (
            <SC.DivContainer fllexDirection="column" fullWidth>
                <SC.DivBlock>    
                    <h1>Products</h1>
                    <SC.ListContainer>
                    {
                        this.props.products && this.props.products.length > 0 ? this.props.products.map((product)=> 
                            <SC.List key={product.id}>
                                <SC.ListSection flexGrow="1">
                                    <img src={`http://localhost:3001/products/${product.icon}`} alt={product.name}/>
                                    <SC.Text><b>{product.name}</b></SC.Text>
                                    <SC.Text>${product.price}</SC.Text>
                                    <SC.ButtonBtn>
                                        <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
                                    </SC.ButtonBtn>
                                    <SC.ButtonBtn onClick={() => this.removeProduct(product)}>
                                        Remove
                                    </SC.ButtonBtn>
                                </SC.ListSection>
                            </SC.List>
                        ) : undefined
                    }
                    </SC.ListContainer>
                    <SC.DivRowHorizontal>
                        <Link to="/admin">Menu</Link>
                    </SC.DivRowHorizontal>
                    <SC.DivRowHorizontal>
                        <SC.ButtonBtn>
                            <Link to="/admin/products/create">Create</Link>
                        </SC.ButtonBtn>
                    </SC.DivRowHorizontal>
                </SC.DivBlock>
            </SC.DivContainer>
        )
    }
}

function mapStateToProps ({products, order}){
    return {
        products,
        order
    }
}

export default connect(mapStateToProps)(Products)