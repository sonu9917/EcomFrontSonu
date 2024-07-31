import { createSlice } from "@reduxjs/toolkit";


const wishListSlice = createSlice(
    {
        name: "wishList",
        initialState: {
            data: [],
        },
        reducers: {
            addToWishList(currentState, { payload }) {

                const d = currentState.data.find(wishList => wishList.pId == payload.pId)
                if (!d) {
                    currentState.data.push({ pId: payload.pId });
                    localStorage.setItem('wishList', JSON.stringify(currentState.data))
                }
            },
            removeFromWishList(currentState, { payload }) {
                const newState = currentState.data.filter((d, i) => {
                    return d.pId != payload.pId
                })

                currentState.data = newState
                localStorage.setItem('wishList', JSON.stringify(currentState.data))
            }

        }
    }
)

export const { addToWishList, removeFromWishList } = wishListSlice.actions

export default wishListSlice.reducer