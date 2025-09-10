import { useParams } from "react-router";

const Agenda = () => {
    const { id } = useParams<{ id: string }>();
    return <h1>Agenda du joueur {id}</h1>;
};

export default Agenda;
