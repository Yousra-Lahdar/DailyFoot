import '../compoDashboard/imput.css'

type ImputProps = {
    label: string;
    name: string;
    type?: string;
}

const Imput = ({label,name,type="text"}:ImputProps) => {

    return (
        <div className="container">
            <input required type={type} name={name} className="input"/>
            <label className="label">{label}</label>
        </div>
    );
};

export default Imput;
