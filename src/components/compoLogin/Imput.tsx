import '../compoDashboard/imput.css'

type ImputProps = {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Imput = ({label,name,type="text", value, onChange}:ImputProps) => {

    return (
        <div className="container">
            <input required type={type} name={name} className="input" value={value} onChange={onChange} />
            <label className="label">{label}</label>
        </div>
    );
};

export default Imput;
