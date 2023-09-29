import { startingMoves } from "$lib/config"
import { generateRandomBoard } from "$lib/game"
import { writable } from "svelte/store"
export const score = writable(0)
export const moves = writable(startingMoves)
export const board = writable(generateRandomBoard())
