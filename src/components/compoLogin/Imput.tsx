import '../compoDashboard/imput.css'

type ImputProps = {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Imput = ({label,name,type="text", value, onChange, error}:ImputProps) => {

    return (
        <div className="container">
            <input required type={type} name={name} className={`input ${error ? "input-error" : ""}`} value={value} onChange={onChange} />
            <label className="label">{label}</label>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Imput;
