import './btnImput.css'

type BtnLoginProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
};

const BtnLogin = ({ label, type = "button", onClick }: BtnLoginProps) => {
    return (
        <button type={type} onClick={onClick} className="btn" >
            {label}
        </button>
    );
};

export default BtnLogin;
