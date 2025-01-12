import styles from "./styles.module.scss"
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineEllipsis } from "react-icons/ai";
import image from "../../../shared/assets/images/animeCard.jpg"
import { Button, ButtonGroup, Grow, MenuItem, MenuList, Paper, Popper, Rating } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { CollabsibleDescription, Like, Viewed } from "features/index";
import { FaStar } from "react-icons/fa";

// const item = {link: "one-piece", text: "One piece qweqeqewqeq",
//     author: "Эйитиро Ода", rating: 4.8,
//     views: 3000, description: "One Piece повествует о приключениях пиратской команды под названием «Пираты Соломенной Шляпы» во главе с капитаном Манки Д. Луффи (яп. モンキー・Ⅾ・ルフィ), в детстве съевшем Дьявольский плод Резина-Резина (яп. ゴムゴムの実 гому гому но ми), давший ему способность растягиваться и сжиматься, как резина.",
//     linkVideo: "",
// }

const descp = "Главный герой этой истории - парень в соломенной шляпе по имени Монки Д. Луффи. Все о чем мечтает наш герой - это приключения и путешествия. Будучи маленьким ребенком, он съедает дьявольский фрукт и становится резиновым человеком. Теперь у него есть необычная способность - он может растягивать свое тело и конечности до любых размеров. Сейчас перед Луффи стоит цель - стать главным среди пиратов. Но для этого, судя по легендам, необходимо добраться до древнего сокровища Ван Пис. Когда-то сам Гол Д. Роджер спрятал его где-то на Гранд Лайн, течении, которое объединяет множество островов по всему миру. Наш весельчак решает отправиться на их поиски.Однако, наш персонаж далеко не единственный, кто охотится за золотом Роджера. Казалось бы, у нашего смышленого парня есть всё, для того чтобы стать королем - необычайная сила и острый ум. Не хватает только одного - верной и преданной команды, которые последуют за своим капитаном навстречу любой опасности. Вот только Луффи стоит поторопиться, ведь за Ван Пис идет целая ватага злобных пиратов, которая не остановится ни перед чем, чтобы добраться до заветного сокровища. Монки придется предпринять немало усилий, чтобы опередить всех своих соперников."
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const link = "https://api.anilibria.tv/v3/";

export const WatchPage = () => {
    const [anime, setAnime] = useState();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);


    useEffect(() => {
        axios.get(link+`getTitle?id=8693`)
        .then(data => {
            console.log(data.data)
            setAnime(data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
        ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return <section>
        <div className={styles.header}>
            <IoChevronBackOutline cursor="pointer" size={24}/>
            <div className={styles.icons}>
                <AiOutlineEllipsis cursor="pointer" size={24}/>
                <Like />
            </div>
        </div>
        <img className={styles.blurImg} src={image}/>
        <div className={styles.mainTop}>
            <img className={styles.img} src={image}/>
            <h2>One piece</h2>
            <h3>Эйитиро Ода</h3>
        </div>
        <div className={styles.main}>
            <div>
            <span className={styles.reviews}><span className={styles.reviewsRait}><FaStar /> 4.5</span> 80</span>

            </div>
            <h2 className={styles.title}>Название серии</h2>
            <h3 className={styles.nameSeria}>One piece что-то там</h3>
            <div className={styles.videoContainer}>
                <div className={styles.video}>
                {anime && <ReactPlayer
                    style={{ maxWidth: '100%', height: 'auto' }}
                    width="100%"
                    height="100%"
                    controls
                    playing={false}
                    url={`https://cache.libria.fun${anime.player.list[(selectedIndex + 1).toString()].hls.hd}`}
                />}
                </div>
                <div className={styles.controller}>
                <>
                    <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="Button group with a nested menu"
                    >
                        <Button sx={{backgroundColor: "white", color: "black"}}>{"Серия " + options[selectedIndex]}</Button>
                        <Button
                        size="small"
                        sx={{backgroundColor: "white", color: "black"}}
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                        >
                        <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        sx={{ zIndex: 1 }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        placement="top"
                    >
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                id="split-button-menu"
                                className={styles.menuSerias}
                                autoFocusItem>
                                {Object.keys(anime.player.list).map((option, index) => (
                                    <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                    {"Серия " + option}
                                    </MenuItem>
                                ))}
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>
                    </>
                    <Viewed/>
                </div>
            </div>
            <div className={styles.description}>
                <h2 className={styles.descriptionTitle}>О аниме</h2>
                <CollabsibleDescription description={descp}/>
            </div>
            <div className={styles.rating}>
                <p className={styles.rait}>4,5</p>
                <p className={styles.ratingCount}>80 оценки</p>
                <p className={styles.ratingQuest}>Как вам аниме ?</p>
                <Rating name="half-rating"
                defaultValue={0}
                precision={0.5}
                sx={{
                    "& .MuiRating-iconEmpty": {
                        color: "white", // Пустые звёзды белого цвета
                    },
                    width: "15rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
                size="large"
                />
            </div>
        </div>
    </section>
}
