import { ActionTypes } from "../Constants/action-types";

const initialState = {
  jokes: [],
  fJokes: [],
  selectedJoke: {},
  searchList: [],
};
export const jokesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_JOKES:
      return {
        ...state,
        jokes: [
          ...payload.result.map((el) => ({
            ...el,
            likes: Math.floor(Math.random() * 500),
            dislikes: Math.floor(Math.random() * 500),
          })),
        ],
        fJokes: [
          ...payload.result.map((el) => ({
            ...el,
            likes: Math.floor(Math.random() * 500),
            dislikes: Math.floor(Math.random() * 500),
          })),
        ],
      };
    case ActionTypes.SET_CATEGORY:
      return {
        ...state,
        jokes: [...state.jokes],
        fJokes: [...state.jokes.filter((el) => el.categories[0] === payload)],
      };
    case ActionTypes.SET_SELECTED:
      return {
        ...state,
        selectedJoke: {
          ...payload,
          likes: Math.floor(Math.random() * 500),
          dislikes: Math.floor(Math.random() * 500),
        },
      };
    case ActionTypes.SET_LIKE:
      return {
        ...state,
        selectedJoke: {
          ...state.selectedJoke,
          likes: state.selectedJoke.likes + 1,
        },
      };
    case ActionTypes.SET_DISLIKE:
      return {
        ...state,
        selectedJoke: {
          ...state.selectedJoke,
          dislikes: state.selectedJoke.dislikes - 1,
        },
      };
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        searchList: [
          ...state.fJokes.filter((el) => el.value.indexOf(payload) !== -1),
        ],
      };
    //   case ActionTypes.SET_MODEL_PARTS:
    //     return {
    //       ...state,
    //       parts: [...state.parts],
    //       filtredParts: [
    //         ...state.parts.filter(
    //           (el) =>
    //             el.attributes.models.data[0].attributes.name
    //               .toLowerCase()
    //               .indexOf(payload.toLowerCase()) !== -1
    //         ),
    //       ],
    //     };

    default:
      return state;
  }
};
