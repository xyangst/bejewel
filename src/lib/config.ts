import { writable } from "svelte/store"

export const rows = 8 //y
export const columns = 10 //x
export const minMatch = 3
export const startingMoves = 15
export const baseScore = 60
export const BOARD_PADDING = 10
export const TILE_SIZE = writable(60)
export const ghlink = "https://www.github.com/xyangst/bejewel"
export const title = "bejeweled svelte"
