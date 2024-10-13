import { useAppDispatch } from "app/store/store"
import { IUserForm } from "shared/types";
import { authUser, logoutUser, refreshUser, regUser } from "../model/auth-actions";

type TActions = "login" | "logout" | "resresh" | "register"

export const useActionsAuthorization = () => {
    const dispatch = useAppDispatch();

    const handleActions = (key: TActions, data?: IUserForm) => {
        switch (key) {
            case "login":

                data && dispatch(authUser(data))
                break;

            case "logout":

                dispatch(logoutUser())
                break;

            case "register":

                data && dispatch(regUser(data))
                break;

            case "resresh":

                dispatch(refreshUser())
                break;

            default:
                break;
        }
    }

    return handleActions
}
