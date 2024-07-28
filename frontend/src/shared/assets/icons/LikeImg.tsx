
export interface ILikeImg{
    like: boolean
}


export const LikeImg = ({like}: ILikeImg) => {
    return <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M83.9411 142.294C122.891 63.1439 255.67 91.5061 255.67 142.294H256.33C256.33 91.5061 389.109 63.1439 428.059 142.294C484.667 257.326 342.294 357.51 257.204 417.385L256.33 418H255.67L254.795 417.385C169.706 357.51 27.3328 257.326 83.9411 142.294Z"
        fill={like ? "#DA2B4A" : "white"} stroke="#DA2B4A" strokeWidth="24"/>
        <path d="M223 236L243 256L288 211" stroke="white" strokeWidth="24" strokeLinecap="round"/>
    </svg>
}
