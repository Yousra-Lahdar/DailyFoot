import './btnImput.css'


type BtnLoginProps = {
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};

const BtnLogin = ({ label, type = "button", onClick, disabled, style, children }: BtnLoginProps) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className="btn"
            disabled={disabled}
            style={style}
        >
            {children ?? label}
        </button>
    );
};

export default BtnLogin;
