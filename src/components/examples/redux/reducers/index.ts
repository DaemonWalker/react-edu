import { ModifyAction } from "../store/actions"

export default (state = 0, action: ModifyAction): number => {
    switch (action.type) {
        case "INC":
            return state + 1
        case "DEC":
            return state - 1
        default:
            return state
    }
}