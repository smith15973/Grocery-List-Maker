import './Landing.css';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function Landing() {
    return (
        <div>
            <h1>Landing</h1>
            <div className="landing-container">
                <div className="landing-item">
                    <ReceiptLongIcon />
                    <h3>Lists</h3>
                </div>
                <div className="landing-item">
                    <MenuBookIcon />
                    <h3>Recipes</h3>
                </div>
                <div className="landing-item">
                    <CalendarMonthIcon />
                    <h3>Menus</h3>
                </div>
            </div>
        </div>
    );
}
