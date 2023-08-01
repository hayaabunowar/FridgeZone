import classes from './StockView.module.css'

const StockDetails = ({stock}) => {
    return (
        <div className={classes.stockViewIndividual}>
            <div>
                <p>{stock.name}</p>
            </div>
            <div>
            <p>{stock.quantity}</p>
            </div>
            <div>
                <p>{stock.expiryDate}</p>
            </div>
            <div>
                <p>{stock.supplier}</p>
            </div>
            <div>
                <p>{stock._id}</p>
            </div>
        </div>
    )
}


export default StockDetails;