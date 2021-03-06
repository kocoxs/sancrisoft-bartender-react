import React from 'react'
import { connect } from 'react-redux'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { loadTips } from '../actions/tips'
import { setTip, savingOrder } from '../actions/order'
import { deleteSeSion } from '../actions/users'
import  * as SC  from './StyledComponents'

class Tip extends React.Component {

    state = {
        tip: {}
    }

    componentDidMount = () => {
        this.props.dispatch(loadTips())
        // .catch((error) => { 
        //     if(error.message.includes("401") !== -1){
        //         ToastsStore.error("Sesion Expired") 
        //         setTimeout(() => this.props.dispatch(deleteSeSion()), 2000 )
        //     } else{
        //         ToastsStore.error(error) 
        //     }   
            
        // })
    }

    selectTip = (tip) => {
        this.props.dispatch(setTip(tip))
        this.setState({ tip })
    }
 
    purchase = async () => {
        try {
            const result = await this.props.dispatch(savingOrder(this.props.order))
            this.props.history.push('/detail')
        } catch (error) {
            console.log(error)
            alert("error")
        }
    }

    render(){
        const { tips, order } = this.props
        const total = order.products.reduce ((pre, curr) => curr.price * curr.qty + pre , 0)
        return (
            <SC.DivContainer>
                <SC.CenterBlock>
                    <SC.DivRowHorizontal>
                        <h1>Total: ${total}</h1>
                    </SC.DivRowHorizontal>
                    {
                        tips && tips.map((tip)=>
                            <SC.ButtonBtn active={ this.state.tip.id === tip.id ? 'active':''} fullWidth margin="5px 0px" key={tip.id} onClick={ ()=> this.selectTip(tip) }>{tip.name}</SC.ButtonBtn>
                        )
                    }
                    {
                        this.state.tip && 
                        <SC.DivRowHorizontal>
                            <SC.ButtonBtn onClick={this.purchase}>
                                Purchase
                            </SC.ButtonBtn>
                        </SC.DivRowHorizontal>
                    }
                     
                </SC.CenterBlock>
                <ToastsContainer store={ToastsStore}/>
            </SC.DivContainer>
        )
    }
}

function mapStateToProps ({tips, order}){
    return {
      tips, order
    }
}

export default connect(mapStateToProps)(Tip)