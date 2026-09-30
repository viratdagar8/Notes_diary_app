import { createSlice } from '@reduxjs/toolkit'

const getPastesFromStorage = () => {
  try {
    const data = localStorage.getItem("pastes")
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Invalid pastes data:", error)
    localStorage.removeItem("pastes")
    return []
  }
}

const initialState = {
  pastes: getPastesFromStorage()
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,

  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload

      state.pastes.push(paste)

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      )
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(
        (paste) => paste.id === action.payload.id
      )

      if (index !== -1) {
        state.pastes[index] = action.payload
      }

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      )
    },

    resetAllPastes: (state) => {
      state.pastes = []

      localStorage.setItem(
        "pastes",
        JSON.stringify([])
      )
    },

    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter(
        (paste) => paste.id !== action.payload
      )

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      )
    },
  },
})

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes
} = pasteSlice.actions

export default pasteSlice.reducer