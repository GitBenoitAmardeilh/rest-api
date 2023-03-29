import { IContent } from "./content.interface"
import { IKey } from "./key.interface"
import { ITable } from "./table.interface"

/**
 * STATE
 */

export interface MyState{

    /**
     * Tables
     */
    tables: TableState,

    /**
     * Keys
     */
    keys: KeyState,

    /**
     * Tables
     */
    contents: ContentState,

    /**
     * Modals
     */
    modals: ModalState
}

/**
 * SUB-STATE
 */

export interface TableState{
    data: ITable[],
    isLoad: boolean
}

export interface ContentState{
    data: IContent[]
}

export interface KeyState{
    data: IKey[]
}

export interface ModalState{
    tableModal: {
        isLoad: boolean,
    }
}