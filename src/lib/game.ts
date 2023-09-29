import { baseScore, columns, minMatch, rows } from "$lib/config"

type match = number[]

export class Tile {
	id = Math.random()
	type: null | number = Math.floor(Math.random() * 5)
}
export function generateRandomBoard() {
	const size = rows * columns
	let board = []

	for (let i = 0; i < size; i += 1) {
		board[i] = new Tile()
	}

	while (getMatches(board).length > 0) {
		board = getResolvedBoard(board)
	}

	return board
}

/**
 * Returns x and y coordiates for tile at index.
 */
export const getCoordinates = (index: number) => {
	return {
		y: index % columns,
		x: Math.floor(index / columns)
	}
}

/**
 * Returns true if the tiles at indexes p and q are adjacent.
 */
export function areTilesAdjacent(tile1: number, tile2: number) {
	const cord1 = getCoordinates(tile1)
	const cord2 = getCoordinates(tile2)

	return (
		(cord1.x === cord2.x && Math.abs(cord1.y - cord2.y) === 1) ||
		(cord1.y === cord2.y && Math.abs(cord1.x - cord2.x) === 1)
	)
}

export function getBoardScore(board: Tile[], chainMultiplier: number) {
	const matches = getMatches(board)
	const tileMultiplier = matches.length - 2

	return baseScore * tileMultiplier * chainMultiplier
}

export function getClearedBoard(board: Tile[]) {
	const matches = getMatches(board)
	const clearedBoard = [...board]

	if (matches.length === 0) {
		return board
	}

	matches.forEach((index) => {
		clearedBoard[index].type = null
	})

	return clearedBoard
}
export const swapTiles = (p: number, q: number, b: Tile[]) => {
	const tmp = b[p]
	b[p] = b[q]
	b[q] = tmp
	return b
}
export function getResolvedBoard(board: Tile[]) {
	getClearedBoard(board)
	const resolvedBoard = [...board]
	let emptyTiles: number[] = []

	// Drop tiles to fill empty spaces
	for (let i = 0; i < columns; i += 1) {
		const colEmptyTiles = []
		for (let j = rows - 1; j > -1; j -= 1) {
			const index = j * columns + i
			if (resolvedBoard[index].type === null) {
				colEmptyTiles.push(index)
			} else if (colEmptyTiles.length > 0) {
				const firstEmptyTile = colEmptyTiles.shift()!
				const aux = resolvedBoard[firstEmptyTile]
				resolvedBoard[firstEmptyTile] = resolvedBoard[index]
				resolvedBoard[index] = aux
				colEmptyTiles.push(index)
			}
		}

		emptyTiles = [...emptyTiles, ...colEmptyTiles]
	}

	emptyTiles.forEach((index) => {
		resolvedBoard[index] = new Tile()
	})

	return resolvedBoard
}
export function getMatches(board: Tile[]): match {
	const matches: match = []
	for (let i = 0; i < columns; i += 1) {
		let match: match = []
		for (let j = 0; j < rows; j += 1) {
			const index = j * columns + i
			if (j === rows - 1 || board[index].type !== board[index + columns].type) {
				if (match.length >= minMatch) matches.push(...match)
				match = []
			} else {
				match.push(index + columns, index)
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		let match = []
		for (let j = 0; j < columns; j++) {
			const index = i * columns + j

			if (j === columns - 1 || board[index].type !== board[index + 1].type) {
				if (match.length >= minMatch) {
					matches.push(...match)
				}
				match = []
			} else {
				match.push(index, index + 1)
			}
		}
	}
	return matches
}
