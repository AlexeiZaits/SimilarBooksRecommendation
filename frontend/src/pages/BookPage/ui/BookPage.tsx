import { useParams } from "react-router-dom"

export const BookPage = () => {
    const bookUrl = useParams()

    console.log(bookUrl)

    return <div>
    </div>
}
