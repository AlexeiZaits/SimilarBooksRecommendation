import { useNavigate } from "react-router-dom";
import { Button, Wrapper } from "../../../shared/ui"
import styles from "./styles.module.scss";


export const ErrorPage = () => {
    const navigate = useNavigate()
    
    return <Wrapper> 
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <h1 className={styles.title}>Произошла ошибка</h1>
    </Wrapper>
}