import { GET_POSTS, GET_POST, SET_EDIT_POST, EDIT_POST, ADD_POST, DELETE_POST, POST_ERROR, FILTER_BY_DATA } from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    filteredPosts: [],
    filtering: false,
    editing: false,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                post: null,
                filtering: false,
                editing: false,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
            };
        case SET_EDIT_POST:
            return {
                ...state,
                editing: payload,
            };
        case EDIT_POST:
            const newPosts = state.posts.map((post) => {
                if (post._id === payload._id) {
                    return payload;
                } else {
                    return post;
                }
            });
            return {
                ...state,
                posts: newPosts,
                post: payload,
                loading: false,
                editing: false,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                filtering: false,
                editing: false,
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                loading: false,
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                post: null,
                filtering: false,
                editing: false,
                loading: false,
            };
        case FILTER_BY_DATA:
            return {
                ...state,
                filteredPosts: state.posts.filter((post) => {
                    if (
                        post.instrument.toLowerCase().includes(payload.instrument.toLowerCase()) &&
                        post.place.toLowerCase().includes(payload.place.toLowerCase())
                    ) {
                        if (payload.person) {
                            if (post.pers_or_band === "person") {
                                return post;
                            }
                        }
                        if (payload.band) {
                            if (post.pers_or_band === "band") {
                                return post;
                            }
                        }
                    }
                    return false;
                }),
                filtering: true,
                loading: false,
            };
        default:
            return state;
    }
}
